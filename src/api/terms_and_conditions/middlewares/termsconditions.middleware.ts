import { body } from "express-validator";
import { allValidator } from "../../../shared/express.validator";

export const createTermsAndConditionsValidator = [
    body('text_document')
    .isString()
    .withMessage('Tiene que ser un string')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    
    .isLength({ min: 10, max: 1500 })
    .withMessage('Tiene un minimo de 10 y maximo de 4000 letras'),
    allValidator
  ]