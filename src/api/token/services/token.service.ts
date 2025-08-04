import jwt from 'jsonwebtoken'
import config from '../../../config/environments'
import createError from 'http-errors'
import {
  // findUserByEmail,
  findUserByEmailWithoutState,
} from '../../user/services/find'
import { amountIntUser, validateStatusUser } from '../../user/services/user.service'
import { UserAttributes } from '../../user/models/user.model'
import {
  desbloqueoTiempo,
  desbloqueoUsuario,
  updateUser,
  updateUserById,
} from '../../user/services/update/index'
import CryptoJS from 'crypto-js'
import { closeAllSession } from './update'
import { createToken } from './create'
import { findAdminByEmail, findOneAdmin } from '../../admin/services/find/admin'
import { validateStatusAdmin, amountIntAdmin } from '../../admin/services/admin.service'
import { desbloqueoAdmin, desbloqueoTiempoAdmin } from '../../admin/services/update/admin'

// export interface JwtPayload {
//   usuario: string
//   contrasena: string
// }
export const signInService = async ({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<any> => {
  try {
    // const decoded = jwt.verify(valorJWT, config.SECRET_HIDDEN_KEY!) as JwtPayload

    // const user2: UserAttributes = await findUserByEmail({
    //   email,
    // })

    const user: UserAttributes = await findUserByEmailWithoutState({
      email,
    })

    if (!user) throw createError(401, 'El correo electrónico que ingresaste no está conectado a una cuenta')
    // if (!user) throw createError(401, 'CORREO NO LOCALIZADO')

    // if (!user) throw createError(401, 'No tiene permiso, porfavor ingrese nuevamente')

    const _validateStatusUser = validateStatusUser({
      estado: user.status,
      cantidadMinBloqueo: user.cantidad_min_bloqueado,
      horaBloqueo: user.hora_bloqueo,
    })
    if (_validateStatusUser) {
      if (user.numIntentos == 3 && user.status == 'BIT') await desbloqueoTiempo({ userId: user.id })
      const _validatePassPriv = validatePassPriv({
        password,
        salt: user.salt,
        hashedPass: user.password,
      })
      if (_validatePassPriv) {
        /*
          VALIDAR SI EL CORREO A SIDO CONFIRMADO  O ES UN CORREO VALIDO
        */
        // const validEmail = await findUserByEmail({ email })
        if (user.state == false)
          throw createError(
            401,
            'Falta activar tu correo , ve a la zona en donde ingresarás el código de verificación'
          )

        if (user.numIntentos! > 0) await desbloqueoUsuario({ userId: user.id })
        const [, _token] = await Promise.all([
          closeAllSession({ userId: user.id!, rol: 'user' }),
          createToken({
            userId: user.id,
            rol: 'user',
          }),
          updateUserById({
            id: user.id,
            number_of_sessions: user.number_of_sessions! + 1,
          }),
        ])
        const jwtTok = jwt.sign({ _id: _token.uuid }, config.SECRET_HIDDEN_KEY!)
        return { JWT: jwtTok }
      } else {
        await amountIntUser({
          userId: user.id,
          cantidadMinBloq: user.cantidad_min_bloqueado,
          numIntentos: user.numIntentos,
        })
        throw createError(401, 'No tiene permiso, por favor ingrese nuevamente')
      }
    } else {
      if (user.status == 'BI') {
        throw createError(
          401,
          'El usuario esta bloqueado, ve a la sección de restablecer cuenta o cambio de contraseña'
        )
      }
      if (user.status == 'BIT') {
        var fechaActual: Date = new Date(user.hora_bloqueo!)
        new Date(fechaActual.setTime(Number(fechaActual.getTime() + 60000 * user.cantidad_min_bloqueado!)))
        var diff = Math.abs(Number(fechaActual) - Number(new Date()))

        var minRestantes = Number(diff / 60000)
        var segRestantes =
          Number((diff - minRestantes * 60000) / 1000) > 0
            ? Number((diff - minRestantes * 60000) / 1000).toFixed(0)
            : Number((diff - minRestantes * 60000) / 1000) * -1

        var segRestantesv2 = Math.round(Number('0.' + minRestantes.toString().split('.')[1]) * 60)

        throw createError(
          401,
          // `Intentelo nuevamente en ${minRestantes} : ${segRestantes} minutos`
          // `Intentelo nuevamente en ${Math.floor(minRestantes)} minuto${Math.floor(minRestantes) != 1 ? 's':''} y ${minRestantes} ${segRestantesv2} segundo${Math.floor(Number(segRestantesv2)) != 1 ? 's':''}`
          `Intentelo nuevamente en ${
            Math.floor(minRestantes) == 0
              ? ''
              : `${Math.floor(minRestantes)} minuto${Math.floor(minRestantes) != 1 ? 's' : ''} y `
          }${segRestantesv2} segundo${Math.floor(segRestantesv2) != 1 ? 's' : ''}`
        )
      }
    }
  } catch (err) {
    throw err
  }
}
const validatePassPriv = ({
  password,
  salt,
  hashedPass,
}: {
  password?: string
  salt?: string
  hashedPass?: string
}): boolean => {
  const testHash = CryptoJS.PBKDF2(password!, salt!, {
    iterations: 10000,
    keySize: 10,
  })
  return testHash.toString() == hashedPass ? true : false
}
//* Signin Admin
export const signInAdminService = async ({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<any> => {
  try {
    // const decoded = jwt.verify(valorJWT, config.SECRET_HIDDEN_KEY!) as JwtPayload

    const admin: UserAttributes | null = await findOneAdmin({
      where: {
        email,
        state: true,
      },
    })
    if (!admin) throw createError(401, 'No tiene permiso, por favor ingrese nuevamente')

    const _validateStatusAdmin = validateStatusAdmin({
      estado: admin!.status,
      cantidadMinBloqueo: admin!.cantidad_min_bloqueado,
      horaBloqueo: admin!.hora_bloqueo,
    })
    if (_validateStatusAdmin) {
      if (admin!.numIntentos == 3 && admin!.status == 'BIT')
        await desbloqueoTiempoAdmin({ userId: admin!.id })
      const _validatePassPriv = validatePassPriv({
        password,
        salt: admin!.salt,
        hashedPass: admin!.password,
      })
      if (_validatePassPriv) {
        if (admin!.numIntentos! > 0) await desbloqueoAdmin({ userId: admin!.id })
        await closeAllSession({ userId: admin!.id!, rol: 'admin' })

        const _token = await createToken({
          userId: admin!.id,
          rol: 'admin',
        })

        const jwtTok = jwt.sign({ _id: _token.uuid }, config.SECRET_HIDDEN_KEY!)
        return { JWT: jwtTok }
      } else {
        await amountIntAdmin({
          userId: admin!.id,
          cantidadMinBloq: admin!.cantidad_min_bloqueado,
          numIntentos: admin!.numIntentos,
        })
        throw createError(401, 'No tiene permiso, por favor ingrese nuevamente')
      }
    } else {
      if (admin!.status == 'BI') {
        throw createError(401, 'El usuario esta bloqueado')
      }
      if (admin!.status == 'BIT') {
        var fechaActual: Date = new Date(admin!.hora_bloqueo!)
        new Date(fechaActual.setTime(Number(fechaActual.getTime() + 60000 * admin!.cantidad_min_bloqueado!)))
        var diff = Math.abs(Number(fechaActual) - Number(new Date()))

        var minRestantes = Number(diff / 60000)
        var segRestantes =
          Number((diff - minRestantes * 60000) / 1000) > 0
            ? Number((diff - minRestantes * 60000) / 1000).toFixed(0)
            : Number((diff - minRestantes * 60000) / 1000) * -1

        var segRestantesv2 = Math.round(Number('0.' + minRestantes.toString().split('.')[1]) * 60)

        throw createError(
          401,
          // `Intentelo nuevamente en ${minRestantes} : ${segRestantes} minutos`
          // `Intentelo nuevamente en ${Math.floor(minRestantes)} minuto${Math.floor(minRestantes) != 1 ? 's':''} y ${segRestantes} segundo${Math.floor(Number(segRestantes)) != 1 ? 's':''}`
          `Intentelo nuevamente en ${
            Math.floor(minRestantes) == 0
              ? ''
              : `${Math.floor(minRestantes)} minuto${Math.floor(minRestantes) != 1 ? 's' : ''} y `
          }${segRestantesv2} segundo${Math.floor(segRestantesv2) != 1 ? 's' : ''}`
        )
      }
    }
  } catch (err) {
    throw err
  }
}

export const signInSocialNetworkService = async ({
  userId,
  email,
  password,
  number_of_sessions,
}: {
  userId: number
  email: string
  password: string
  number_of_sessions: number
}): Promise<any> => {
  try {
    const [, _token] = await Promise.all([
      closeAllSession({ userId: userId!, rol: 'user' }),
      createToken({
        userId: userId,
        rol: 'user',
      }),
      updateUserById({
        id: userId,
        number_of_sessions: number_of_sessions! + 1,
      }),
    ])
    const jwtTok = jwt.sign({ _id: _token.uuid }, config.SECRET_HIDDEN_KEY!)
    return { JWT: jwtTok }
  } catch (err) {
    throw err
  }
}
