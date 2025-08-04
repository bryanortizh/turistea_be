import { body, query } from 'express-validator'
import { allValidator } from '../../../shared/express.validator'
import { RegexValidNewPassword } from '../../admin/validator/admin.custom'
import { notExistsUserId, SamePassword, VerifyCodeVerificationUser, VerifyEmailUser } from '../validator/user.custom'
export const listUserIntranetValidator = [
  query('page')
    .isNumeric()
    .withMessage('Solo numero')
    .bail()
    .isInt({ min: 1 })
    .withMessage('El nimimo es 1'),
  query('state').isBoolean().withMessage('Solo valores booleanos'),
  allValidator,
]


export const listUserRecordType = [
  allValidator,
]

export const ActiveAccountUserValidator = [
  body('email')
  .isEmail()
  .withMessage('Se require un correo valido')
  .bail()
  // .custom(VerifyEmailUser)
  .not()
  .isEmpty()
  .withMessage('No puede ser vacio')
  .bail()
  .isLength({ min: 6, max: 100 })
  .withMessage('Tiene que tener de 6 a 16 digitos')
  .bail(),
  
  body('code_verification')
  .isString()
  .withMessage('Se require una cadena de 4 digitos')
  .bail()
  .custom(VerifyCodeVerificationUser)
  .not()
  .isEmpty()
  .withMessage('No puede ser vacio')
  .bail()
  .isLength({ min: 4, max: 4 })
  .withMessage('Tiene que tener 4 digitos')
  .bail(),
  allValidator,
  
]

export const EmailUserValidator = [
  body('email')
  .isEmail()
  .withMessage('Se require un correo valido')
  .bail()
  .custom(VerifyEmailUser)
  .not()
  .isEmpty()
  .withMessage('No puede ser vacio')
  .bail()
  .isLength({ min: 6, max: 100 })
  .withMessage('Tiene que tener de 6 a 16 digitos')
  .bail(),
  allValidator
]
export const UnsubscribeUser = [
  body('userId')
  .isNumeric()
  .withMessage('Se require un valor de tipo numérico')
  .bail()
  .custom(notExistsUserId)
  .not()
  .isEmpty()
  .withMessage('No puede ser vacio')
  .bail()
  .isLength({ min: 1 })
  .withMessage('Tiene que tener de 1 a mas digitos')
  .bail(),
  allValidator
]

export const newPasswordAndCodeValidator = [
  body('email')
  .isEmail()
  .withMessage('Se require un formato de correo valido')
  .bail()
  .custom(VerifyEmailUser)
  .not()
  .isEmpty()
  .withMessage('No puede ser vacio')
  .bail()
  .isLength({ min: 6, max: 100 })
  .withMessage('Tiene que tener de 6 a 16 digitos')
  .bail(),
  
  body('code_verification')
  .isString()
  .withMessage('Se require una cadena de caracteres')
  .bail()
  .custom(VerifyCodeVerificationUser)
  .not()
  .isEmpty()
  .withMessage('No puede ser vacio')
  .bail()
  .isLength({ min: 4, max: 4 })
  .withMessage('La longitud de caracteres numericos es 4')
  .bail(),
  
  body('new_password')
  .isString()
  .withMessage('Se require un string')
  .bail()
  .not()
  .isEmpty()
  .withMessage('No puede ser vacio')
  .bail()
  .isLength({ min: 6, max: 16 })
  .withMessage('La longitud minima de caractes es 6 y maxima 16')
  .bail()
  .custom(RegexValidNewPassword),
  allValidator
]


export const updatePasswordUserValidator = [
  // header('authorization').custom(accessOnlyAdminPrimary), //!ADMIN PRIMARY
  
  // body('current_password')
  //   .isString()
  //   .withMessage('Se require el current_password como string')
  //   .bail()
  //   .custom(validatePasswordAdmin)
  //   .not()
  //   .isEmpty()
  //   .withMessage('No puede ser vacio')
  //   .bail()
  //   .isLength({ min: 1, max: 300 })
  //   .withMessage('El minimo es 1 y el maximo es 300 letras'),
    
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
    .custom(SamePassword)
    .custom(RegexValidNewPassword),
    // .custom((pass:string )=>{
    //   const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/)
    //   console.log("regex",regex.test(pass))
      
    //   if(regex.test(pass) == false) throw new Error('Mínimo 8 caracteres al menos 1 alfabeto en mayúscula, 1 alfabeto en minúscula, 1 número y 1 carácter especial:')
    // }),
    // .not()
  
  allValidator,
]



export const updateGenderAndDateOfBirthUserValidator = [
 
  body('date_of_birth')
  .isDate()
  .withMessage('Se require un date')
  .bail()
  .not()
  .isEmpty()
  .withMessage('No puede ser vacio')
  .optional({nullable:true}),

body('sexo')
  .toLowerCase()
  .isIn(['hombre', 'mujer','no especificado'])
  .withMessage('Solo se eliguen Hombre y Mujer')
  .bail()
  .not()
  .isEmpty()
  .withMessage('No puede ser vacio')
  .optional({nullable:true}),
  
  
  allValidator,
]