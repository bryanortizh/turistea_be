// import { actualizarNumIntentos, bloqueoUsuario, bloqueoUsuarioTemporal } from './update'
import { AdminAttributes } from '../models/admin.model'
import { sendEmail, sendMailAxios } from '../../../utils/generate.mail'
import { createAdmin, createAdminIntranet } from './create/admin'
import {
  actualizarNumIntentosAdmin,
  bloqueoAdmin,
  bloqueoUsuarioTemporalAdmin,
  updatePasswordAdmin,
} from './update/admin'
import { template_create_admin } from '../../../templates/templates'
import { updateAdmin } from './update/admin'
import { closeAllSession } from '../../token/services/update/index'
import CryptoJS from 'crypto-js'
import config from '../../../config/environments/index'

export const validateStatusAdmin = ({
  estado,
  horaBloqueo,
  cantidadMinBloqueo,
}: {
  estado: string | undefined
  horaBloqueo: Date | undefined
  cantidadMinBloqueo: number | undefined
}): boolean => {
  if (estado == 'H') {
    return true
  } else if (estado == 'BIT') {
    var horaBloqueoDato = new Date(horaBloqueo!)
    new Date(
      horaBloqueoDato.setTime(
        Number(horaBloqueoDato.getTime() + 60000 * cantidadMinBloqueo!)
      )
    )
    if (horaBloqueoDato >= new Date()) {
      return false
    } else {
      return true
    }
  } else {
    return false
  }
}
export const amountIntAdmin = async ({
  userId,
  cantidadMinBloq,
  numIntentos,
}: {
  userId?: number
  cantidadMinBloq?: number
  numIntentos?: number
}) => {
  try {
    let minPrimerBloqueo: number = 5 //*MINUTOS
    let minsegundoBloqueo: number = 10 //*MINUTOS
    let bloquearUser: boolean = false
    let cantminBloqueo: number
    // const user = await this.oneUserByIdError(userId)
    if (numIntentos! < 3) {
      await actualizarNumIntentosAdmin({
        numIntentos: numIntentos! + 1,
        userId,
      })
    }
    if (numIntentos == 2) {
      switch (cantidadMinBloq) {
        case null:
          cantminBloqueo = minPrimerBloqueo
          break
        case minPrimerBloqueo:
          cantminBloqueo = minsegundoBloqueo
          break
        case minsegundoBloqueo:
          bloquearUser = true
          break
      }
      if (bloquearUser) {
        await bloqueoAdmin({ userId })
      } else {
        await bloqueoUsuarioTemporalAdmin({
          cantminutos: cantminBloqueo!,
          userId,
        })
      }
    }
    return
  } catch (err) {
    throw err
  }
}
export const createAdminAndSendMail = async (admin: AdminAttributes) => {
  try {
    const _user: AdminAttributes = await createAdmin(admin)
    return await sendMailAxios({
      template: template_create_admin({
        names: _user.name + ' ' + _user.lastname,
      }),
      title: '[MIYUNTA]  Hola nuevo administrador',
      to: _user.email!,
    })
  } catch (err) {
    throw err
  }
}
export const createAdminIntranetAndSendMailService = async ({
  admin,
  adminId,
}: {
  admin: AdminAttributes
  adminId: number
}) => {
  try {
    const { password, ..._admin }: AdminAttributes = await createAdminIntranet({
      admin,
      adminId,
    })
    await sendMailAxios({
      title: 'Hola ' + _admin.name + ', tu nueva contraseña es:  ' + password,
      to: _admin.email!,
      template: template_create_admin({
        names: _admin.name + ' ' + _admin.lastname,
        redirect_buttom:config.PROY_FEURL,
        banner:
          'https://images.pexels.com/photos/1321943/pexels-photo-1321943.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      }),
    })
    return { admin: _admin }
  } catch (err) {
    throw err
  }
}
export const ArchivedAndUnArchivedAdminService = async ({
  updated_by,
  state,
  id,
}: {
  updated_by: number
  id: number
  state: boolean
}) => {
  try {
    if (!state) await closeAllSession({ userId: id, rol: 'admin' })

    return await updateAdmin({
      updated_by,
      state,
      where: {
        id,
      },
    })
  } catch (err) {
    throw err
  }
}

export const updatePasswordAdminIntranetService = async (new_password:string,userId:number) => {
  try {
    
    const salt = CryptoJS.lib.WordArray.random(30)
    const hashpwd = CryptoJS.PBKDF2(new_password!, salt.toString(), {
      iterations: 10000,
      keySize: 10,
    })
    
    return await updatePasswordAdmin({
      where:{
        id:userId
      },
      updated_by:userId,
      password:hashpwd.toString(),
      salt:salt.toString()
      
    })
   
  } catch (err) {
    throw err
  }
}