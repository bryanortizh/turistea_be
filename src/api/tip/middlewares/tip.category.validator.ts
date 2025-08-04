import { body, param } from 'express-validator'
import { titleCase } from 'title-case'
import {
  existsTipCategory,
  notExistsTipCategory,
  notExistsTipCategoryExcId,
} from '../validator/tip.category.custom'
import { allValidator } from '../../../shared/express.validator'
export const createTipCategoryValidator = [
  body('category')
    .isString()
    .withMessage('Se require un string')
    .bail()
    .not()
    .isEmpty()
    .customSanitizer((category) => titleCase(category))
    .withMessage('No puede ser vacio')
    .custom(notExistsTipCategory),
  allValidator,
]
export const updateTipCategoryValidator = [
  param('id')
    .isNumeric()
    .withMessage('Se require un numero')
    .bail()
    .custom(existsTipCategory),
  body('category')
    .isString()
    .withMessage('Se require un string')
    .bail()
    .not()
    .isEmpty()
    .customSanitizer((category) => titleCase(category))
    .withMessage('No puede ser vacio')
    .bail()
    .custom(notExistsTipCategoryExcId),
  allValidator,
]
export const deleteTipCategoryValidator = [
  param('id')
    .isNumeric()
    .withMessage('Se require un numero')
    .bail()
    .custom(existsTipCategory),
  allValidator,
]

export const findTipCategoryValidator = [
  param('tip_category_id')
    .isNumeric()
    .withMessage('Se require un numero')
    .bail()
    .custom(existsTipCategory),
  allValidator,
]