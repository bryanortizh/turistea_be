import { body, header, param } from 'express-validator'
import {
  existsEmailOfAdmin,
  accessOnlyAdminPrimary,
  existsAdmin,
  validatePasswordAdmin,
  RegexValidNewPassword,
} from '../validator/admin.custom'
import { allValidator } from '../../../shared/express.validator'
import { existsRoles } from '../validator/amdin.roles.custom'
import { findOneAdmin } from '../services/find/admin'

export const createAdminIntranet = [
  body('name')
    .isString()
    .withMessage('Se require el name como string')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage('El minimo es 3 y el maximo es 100'),
  body('lastname')
    .isString()
    .withMessage('Se require el name como string')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage('El minimo es 3 y el maximo es 100'),
  body('email').isEmail().withMessage('Se require un correo valido').bail().custom(existsEmailOfAdmin),
  body('cellphone')
    .isNumeric()
    .withMessage('Se require el cellphone como valores numericos')
    .bail()
    .isLength({ min: 9, max: 9 })
    .withMessage('Se require un numero de Peru, 9 digitos'),
  body('admin_rol_id').isNumeric().withMessage('Se require un Id numerico').bail().custom(existsRoles),
  header('authorization').custom(accessOnlyAdminPrimary), //!ADMIN PRIMARY
  allValidator,
]
export const updateAdminIntranetValidator = [
  param('id').isNumeric().withMessage('Se require un numero').bail().custom(existsAdmin),
  body('name')
    .isString()
    .withMessage('Se require el name como string')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage('El minimo es 3 y el maximo es 100'),
  body('lastname')
    .isString()
    .withMessage('Se require el name como string')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage('El minimo es 3 y el maximo es 100'),
  body('cellphone')
    .isNumeric()
    .withMessage('Se require el cellphone como valores numericos')
    .bail()
    .isLength({ min: 9, max: 9 })
    .withMessage('Se requiere un numero de Peru, 9 digitos'),
  /*   body('admin_rol_id')
    .isNumeric()
    .withMessage('Se require un Id numerico')
    .bail()
    .custom(existsRoles), */
  header('authorization').custom(accessOnlyAdminPrimary), //!ADMIN PRIMARY
  allValidator,
]
export const listAdminIntranet = [
  header('authorization').custom(accessOnlyAdminPrimary), //!ADMIN PRIMARY
  allValidator,
]
//*DESC Validator of the archived or unarchived of the questions
export const archivedOrUnArchivedAdminValidator = [
  body('state').isBoolean().withMessage('Solo valores booleanos'),
  param('id')
    .isNumeric()
    .withMessage('Tiene que ser valores numericos')
    .bail()
    .custom(async (adminId: number, { req }: { req: any }) => {
      const admin = await findOneAdmin({ where: { id: adminId, state: !req.body.state } })
      if (!admin)
        throw new Error(
          'El administrador no existe o esta en estado ' + (req.body.state ? 'activo' : 'archivado')
        )
    }),
  header('authorization').custom(accessOnlyAdminPrimary), //!ADMIN PRIMARY
  allValidator,
]

export const updatePasswordAdminIntranetValidator = [
  header('authorization').custom(accessOnlyAdminPrimary), //!ADMIN PRIMARY

  body('current_password')
    .isString()
    .withMessage('Se require el current_password como string')
    .bail()
    .custom(validatePasswordAdmin)
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 1, max: 300 })
    .withMessage('El minimo es 1 y el maximo es 300 letras'),

  body('new_password')
    .isString()
    .withMessage('Se require new_password como string')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 6, max: 16 })
    .withMessage('El minimo es 6 y el maximo es 16 letras')
    .custom(RegexValidNewPassword),
  // .custom((pass:string )=>{
  //   const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/)
  //   console.log("regex",regex.test(pass))

  //   if(regex.test(pass) == false) throw new Error('Mínimo 8 caracteres al menos 1 alfabeto en mayúscula, 1 alfabeto en minúscula, 1 número y 1 carácter especial:')
  // }),
  // .not()

  allValidator,
]
