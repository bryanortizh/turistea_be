import { allValidator } from "../../../shared/express.validator";
import { body, header, query } from "express-validator";
import { existsEmailOfUser, validateToken } from "../validator/auth.custom";
import {
  existsEmailOfAdmin,
  RegexValidNewPassword,
} from "../../admin/validator/admin.custom";

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
