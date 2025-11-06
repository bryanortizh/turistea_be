import { body } from "express-validator";
import { allValidator } from "../../../shared/express.validator";
import { DataBase } from "../../../database";

export const validateCreateTerrace = [
  body("name")
    .isString()
    .withMessage("Se requiere el name como string")
    .bail()
    .not()
    .isEmpty()
    .withMessage("No puede ser vacío")
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage("El mínimo es 3 y el máximo es 100"),
  body("lastname")
    .isString()
    .withMessage("Se requiere el lastname como string")
    .bail()
    .not()
    .isEmpty()
    .withMessage("No puede ser vacío")
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage("El mínimo es 3 y el máximo es 100"),
  body("email").isEmail().withMessage("Se requiere un correo válido"),
  body("cellphone")
    .isString()
    .withMessage("Se requiere el cellphone como string")
    .bail()
    .isLength({ min: 9, max: 15 })
    .withMessage("Debe tener entre 9 y 15 dígitos"),
  body("type_document")
    .isString()
    .withMessage("Se requiere el type_document como string")
    .bail()
    .not()
    .isEmpty()
    .withMessage("No puede ser vacío")
    .bail()
    .isLength({ min: 1, max: 5 })
    .withMessage("El máximo es 5 caracteres"),
  body("number_document")
    .isString()
    .withMessage("Se requiere el number_document como string")
    .bail()
    .not()
    .isEmpty()
    .withMessage("No puede ser vacío")
    .bail()
    .isLength({ min: 6, max: 13 })
    .withMessage("Debe tener entre 6 y 13 caracteres"),
  body("sexo")
    .toLowerCase()
    .isIn(["hombre", "mujer"])
    .withMessage("Solo se eligen Hombre y Mujer"),
  allValidator,
];

export const validateUpdateTerrace = [
  body("name")
    .optional()
    .isString()
    .withMessage("Se requiere el name como string"),
  body("lastname")
    .optional()
    .isString()
    .withMessage("Se requiere el lastname como string"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Se requiere un correo válido"),
  body("cellphone")
    .optional()
    .isString()
    .withMessage("Se requiere el cellphone como string")
    .bail()
    .isLength({ min: 9, max: 15 })
    .withMessage("Debe tener entre 9 y 15 dígitos"),
  body("type_document")
    .optional()
    .isString()
    .withMessage("Se requiere el type_document como string")
    .bail()
    .isLength({ min: 1, max: 5 })
    .withMessage("El máximo es 5 caracteres"),
  body("number_document")
    .optional()
    .isString()
    .withMessage("Se requiere el number_document como string")
    .bail()
    .isLength({ min: 6, max: 13 })
    .withMessage("Debe tener entre 6 y 13 caracteres"),
  body("sexo")
    .optional()
    .toLowerCase()
    .isIn(["hombre", "mujer"])
    .withMessage("Solo se eligen Hombre y Mujer"),
  allValidator,
];

export const validateUniqueTerraceFields = [
  body("number_document").custom(async (value) => {
    const exists = await DataBase.instance.terrace.findOne({ where: { number_document: value } });
    if (exists) throw new Error("El número de documento ya está registrado");
    return true;
  }),
  body("email").custom(async (value) => {
    const exists = await DataBase.instance.terrace.findOne({ where: { email: value } });
    if (exists) throw new Error("El correo ya está registrado");
    return true;
  }),
  allValidator
];