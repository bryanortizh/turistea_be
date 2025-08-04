import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import sequelize, { Op } from 'sequelize'
import { template_create_user } from '../../../templates/templates'
import { sendMailAxios } from '../../../utils/generate.mail'
import { findUserByEmailWithoutState } from '../../user/services/find'
import { updateUser } from '../../user/services/update'
import rn from 'random-number'
import CryptoJS from 'crypto-js'

export const restoreAccountUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, new_password, code_verification } = req.body
    const { status } = await findUserByEmailWithoutState({ email })
    const salt = CryptoJS.lib.WordArray.random(30)
    const hashpwd = CryptoJS.PBKDF2(new_password!, salt.toString(), {
      iterations: 10000,
      keySize: 10,
    })

    if (status == 'BI') {
      await updateUser({
        user: {
          password: hashpwd.toString(),
          salt: salt.toString(),
          hora_bloqueo: undefined,
          cantidad_min_bloqueado: 0,
          numIntentos: 0,
          status: 'H',
          state: true,
          code_verification: '',
        },
        where: {
          [Op.and]: {
            email,
            code_verification,
          },
        },
      })
    } else {
      await updateUser({
        user: {
          password: hashpwd.toString(),
          salt: salt.toString(),
          code_verification: '',
        },
        where: {
          [Op.and]: {
            email,
            code_verification,
          },
        },
      })
    }

    res.status(200).json('¡Contraseña actualizada, vuelve a iniciar sesión!')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))
    next(createError(404, err))
  }
}

export const sendCodeVerificationForRestoreAccountUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body
    const { name, lastname } = await findUserByEmailWithoutState({ email })

    enum opt {
      max = 9998,
      min = 1001,
    }

    // const code_verification = Math.floor(
    //   Math.random() * (opt.max - opt.min + 1) + opt.min
    // ).toString()

    const gen = rn.generator({
      min: opt.min,
      max: opt.max,
      integer: true,
    })
    const code = gen().toString()
    await updateUser({
      user: {
        code_verification: code,
      },
      where: {
        email,
      },
    })

    await sendMailAxios({
      template: template_create_user({
        names: name + ' ' + lastname,
        code,
        banner:
          'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      }),
      title: `[NIKA] Código de verificación`,
      to: email!,
    })
    res.status(200).json(`¡Se te envió un código de verificación al correo ${email}!`)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))
    next(createError(404, err))
  }
}
