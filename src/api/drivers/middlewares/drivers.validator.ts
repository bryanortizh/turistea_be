import { body } from "express-validator";
import { allValidator } from "../../../shared/express.validator";
import { DataBase } from "../../../database";

export const validateCreateDriver = [
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
  // .bail().custom(existsDriverEmail), // Descomenta si tienes validador de unicidad
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
  // .bail().custom(existsDriverDocument), // Descomenta si tienes validador de unicidad
  body("number_plate")
    .isString()
    .withMessage("Se requiere el number_plate como string")
    .bail()
    .not()
    .isEmpty()
    .withMessage("No puede ser vacío")
    .bail()
    .isLength({ min: 6, max: 15 })
    .withMessage("Debe tener entre 6 y 15 caracteres"),
  // .bail().custom(existsDriverPlate), // Descomenta si tienes validador de unicidad
  body("brand_car")
    .isString()
    .withMessage("Se requiere el brand_car como string")
    .bail()
    .not()
    .isEmpty()
    .withMessage("No puede ser vacío")
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage("El mínimo es 2 y el máximo es 100"),
  body("model_car")
    .isString()
    .withMessage("Se requiere el model_car como string")
    .bail()
    .not()
    .isEmpty()
    .withMessage("No puede ser vacío")
    .bail()
    .isLength({ min: 1, max: 100 })
    .withMessage("El máximo es 100"),
  body("name_district")
    .isString()
    .withMessage("Se requiere el name_district como string")
    .bail()
    .not()
    .isEmpty()
    .withMessage("No puede ser vacío"),
  body("name_province")
    .isString()
    .withMessage("Se requiere el name_province como string")
    .bail()
    .not()
    .isEmpty()
    .withMessage("No puede ser vacío"),
  body("name_region")
    .isString()
    .withMessage("Se requiere el name_region como string")
    .bail()
    .not()
    .isEmpty()
    .withMessage("No puede ser vacío"),
  allValidator,
];

export const validateUpdateDriver = [
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
  body("number_plate")
    .optional()
    .isString()
    .withMessage("Se requiere el number_plate como string")
    .bail()
    .not()
    .isEmpty()
    .withMessage("No puede ser vacío")
    .bail()
    .isLength({ min: 6, max: 15 })
    .withMessage("Debe tener entre 6 y 15 caracteres"),
  body("brand_car")
    .optional()
    .isString()
    .withMessage("Se requiere el brand_car como string")
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage("El mínimo es 2 y el máximo es 100"),
  body("model_car")
    .optional()
    .isString()
    .withMessage("Se requiere el model_car como string")
    .bail()
    .isLength({ min: 1, max: 100 })
    .withMessage("El máximo es 100"),
  body("name_district")
    .optional()
    .isString()
    .withMessage("Se requiere el name_district como string"),
  body("name_province")
    .optional()
    .isString()
    .withMessage("Se requiere el name_province como string"),
  body("name_region")
    .optional()
    .isString()
    .withMessage("Se requiere el name_region como string"),
  allValidator,
];


export const validateUniqueDriverFields = [
  body("number_document").custom(async (value) => {
    const exists = await DataBase.instance.drivers.findOne({ where: { number_document: value } });
    if (exists) throw new Error("El número de documento ya está registrado");
    return true;
  }),
  body("number_plate").custom(async (value) => {
    const exists = await DataBase.instance.drivers.findOne({ where: { number_plate: value } });
    if (exists) throw new Error("La placa ya está registrada");
    return true;
  }),
  body("email").custom(async (value) => {
    const exists = await DataBase.instance.drivers.findOne({ where: { email: value } });
    if (exists) throw new Error("El correo ya está registrado");
    return true;
  }),
  allValidator
];