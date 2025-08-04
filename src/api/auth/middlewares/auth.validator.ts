import { allValidator } from "../../../shared/express.validator";
import { body, header, query } from "express-validator";
import { existsEmailOfUser, validateToken } from "../validator/auth.custom";
import {
  existsEmailOfAdmin,
  RegexValidNewPassword,
} from "../../admin/validator/admin.custom";
import { existsProvincia } from "../../ubicacion/validator/provincia.custom";
import { existsDistrito } from "../../ubicacion/validator/distrito.custom";
import { existsDepartamento } from "../../ubicacion/validator/departamento.custom";

export const signupValidator = [
  body("email")
    .isEmail()
    .withMessage("Se require un email")
    .bail()
    .custom(existsEmailOfUser)
    .custom(existsEmailOfAdmin),
  body("name")
    .isString()
    .withMessage("Se require un string")
    .bail()
    .not()
    .isEmpty()
    .withMessage("No puede ser vacio"),
  body("lastname")
    .isString()
    .withMessage("Se require un string")
    .bail()
    .not()
    .isEmpty()
    .withMessage("No puede ser vacio"),
  body("date_of_birth")
    .isDate()
    .withMessage("Se require un date")
    .bail()
    .not()
    .isEmpty()
    .withMessage("No puede ser vacio"),
  // .optional({nullable:true}),

  body("cellphone")
    .isNumeric()
    .withMessage("Se require un entero")
    .bail()
    .isLength({ min: 9, max: 9 })
    .withMessage("Debe ser 9 numeros"),
  body("sexo")
    .toLowerCase()
    .isIn(["hombre", "mujer", "no especificado"])
    .withMessage("Solo se eliguen Hombre y Mujer"),
  /*   body("dni")
    .isNumeric()
    .withMessage("Se require el DNI")
    .bail()
    .isLength({ min: 8, max: 8 }), */
  body("password")
    .isString()
    .withMessage("Se require un string")
    .bail()
    .not()
    .isEmpty()
    .withMessage("No puede ser vacio")
    .bail()
    .isLength({ min: 6, max: 16 })
    .withMessage("Tiene que tener de 6 a 16 digitos")
    .bail()
    .custom(RegexValidNewPassword),

  body("code_departamento")
    .isNumeric()
    .withMessage("Se requiere un departamento")
    .bail()
    .optional({ nullable: true }),

  body("code_provincia")
    .isNumeric()
    .withMessage("Se requiere una provincia")
    .bail()
    .optional({ nullable: true }),

  body("ubigeo")
    .isNumeric()
    .withMessage("Se requiere un distrito")
    .bail()
    .optional({ nullable: true }),
  // .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
  // .withMessage('Se requiere al menos un numero y un caracter especial'),
  allValidator,
];
export const signinValidator = [
  body("email").isEmail().withMessage("Se require un email"),
  body("password")
    .isString()
    .withMessage("Se require un string")
    .bail()
    .not()
    .isEmpty()
    .withMessage("No puede ser vacio")
    .bail(),
  // .isLength({ min: 10, max: 16 })
  // .withMessage('Tiene que tener de 10 a 16 digitos')
  // .bail()
  // .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
  // .withMessage('Se requiere al menos un numero y un caracter especial'),
  allValidator,
];
export const signoutValidator = [
  header("authorization")
    .isString()
    .withMessage("Se require un string")
    .bail()
    .not()
    .isEmpty()
    .withMessage("No puede ser vacio")
    .bail()
    .custom(validateToken),
  // .custom((authorization, { req }) => req.user.rol !== 'user')
  // .withMessage('No tiene autorización para esta ruta como usuario'),

  // .isLength({ min: 10, max: 16 })
  // .withMessage('Tiene que tener de 10 a 16 digitos')
  // .bail()
  // .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
  // .withMessage('Se requiere al menos un numero y un caracter especial'),
  allValidator,
];

export const signupAdminValidator = [
  body("email").isEmail().withMessage("Se require un email"),
  body("password")
    .isString()
    .withMessage("Se require un string")
    .bail()
    .not()
    .isEmpty()
    .withMessage("No puede ser vacio"),
  allValidator,
];
//*@DESC Validator data the administrator
export const signinAdminValidator = [
  body("email")
    .isEmail()
    .withMessage("Se require un email")
    .bail()
    .custom(existsEmailOfUser)
    .custom(existsEmailOfAdmin),
  body("name")
    .isString()
    .withMessage("Se require un string")
    .bail()
    .not()
    .isEmpty()
    .withMessage("No puede ser vacio"),
  body("lastname")
    .isString()
    .withMessage("Se require un string")
    .bail()
    .not()
    .isEmpty()
    .withMessage("No puede ser vacio"),
  body("cellphone")
    .isNumeric()
    .withMessage("Se require un entero")
    .bail()
    .isLength({ min: 9, max: 9 })
    .withMessage("Debe ser 9 numeros"),
  body("sexo")
    .toLowerCase()
    .isIn(["hombre", "mujer"])
    .withMessage("Solo se eliguen Hombre y Mujer"),
  body("password")
    .isString()
    .withMessage("Se require un string")
    .bail()
    .not()
    .isEmpty()
    .withMessage("No puede ser vacio")
    .bail()
    .isLength({ min: 6, max: 16 })
    .withMessage("Tiene que tener de 6 a 16 digitos")
    .bail()
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .withMessage("Se requiere al menos un numero y un caracter especial"),
  allValidator,
];
