import { body, query, param } from 'express-validator'
import { resizeImage } from '../../../helpers/sharp'
import { allValidator } from '../../../shared/express.validator'
import { extractFile } from '../../../shared/express.satinizer'
import { existsTip } from '../validator/tip.custom'
import { findOneTip } from '../services/find/index'
import { existsTipCategory } from '../validator/tip.category.custom'
export const createTipValidator = [
  body('title')
    .isString()
    .withMessage('Tiene que ser un string')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 10, max: 200 })
    .withMessage('Tiene un minimo de 10 letras y maximo de 200'),
  body('tip')
    .isString()
    .withMessage('Tiene que se un tip')
    .bail()
    .isLength({ max: 500 })
    .withMessage('Tiene un maximo de 500'),
  body('tip_category_id')
    .isNumeric()
    .withMessage('Se require una categoria')
    .bail()
    .custom(existsTipCategory),
  body('motivation')
    .isString()
    .withMessage('Tiene que se una motivación')
    .bail()
    .isLength({ max: 500 })
    .withMessage('Tiene un maximo de 500'),
  body('image')
    .isString()
    .withMessage('Es una cadena de Base64')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .customSanitizer(extractFile)
    .isBase64()
    .withMessage('Tiene que ser una cadena de Base64')
    .custom(
      (file, { req }) =>
        req.mimetype === 'image/jpeg' || req.mimetype === 'image/jpg' || req.mimetype === 'image/png'
    )
    .withMessage('Solo se permiten formatos de imagen')
    .customSanitizer((image: string) => Buffer.from(image, 'base64'))
    .customSanitizer(async (image: Buffer) => {
      return await resizeImage({
        file: image,
        pngOptions: {
          compressionLevel: 9,
        },
        resizeOptions: {
          width: 300,
          height: 300,
          fit: 'cover',
        },
      })
    })
    .optional({ nullable: true }),
  allValidator,
]
export const deleteTipValidator = [
  param('tipId').isNumeric().withMessage('Tiene que ser numerico').bail().custom(existsTip),
  allValidator,
]
export const updateTipValidator = [
  param('tipId').isNumeric().withMessage('Tiene que ser numerico').bail().custom(existsTip),
  body('tip_category_id')
    .isNumeric()
    .withMessage('Se require una categoria')
    .bail()
    .custom(existsTipCategory),
  body('title')
    .isString()
    .withMessage('Tiene que ser un string')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .isLength({ min: 10, max: 200 })
    .withMessage('Tiene un minimo de 10 letras y maximo de 200'),
  body('tip')
    .isString()
    .withMessage('Tiene que se un tip')
    .bail()
    .isLength({ max: 500 })
    .withMessage('Tiene un maximo de 500'),
  body('motivation')
    .isString()
    .withMessage('Tiene que se una motivación')
    .bail()
    .isLength({ max: 500 })
    .withMessage('Tiene un maximo de 500'),
  allValidator,
]
//*@DESC update image of the question
export const updateImageTipValidator = [
  param('tipId').isNumeric().withMessage('Se require un numero').bail().custom(existsTip),
  body('image')
    .isString()
    .withMessage('Es una cadena de Base64')
    .bail()
    .not()
    .isEmpty()
    .withMessage('No puede ser vacio')
    .bail()
    .customSanitizer(extractFile)
    .isBase64()
    .withMessage('Tiene que ser una cadena de Base64')
    .custom(
      (file, { req }) =>
        req.mimetype === 'image/jpeg' || req.mimetype === 'image/jpg' || req.mimetype === 'image/png'
    )
    .withMessage('Solo se permiten formatos de imagen')
    .customSanitizer((image: string) => Buffer.from(image, 'base64'))
    .customSanitizer(async (image: Buffer) => {
      return await resizeImage({
        file: image,
        pngOptions: {
          compressionLevel: 9,
        },
        resizeOptions: {
          width: 300,
          height: 300,
          fit: 'cover',
        },
      })
    }),
  allValidator,
]
export const listTipsValidator = [
  query('page').isNumeric().withMessage('Solo numero').bail().isInt({ min: 1 }).withMessage('El nimimo es 1'),
  query('state').isBoolean().withMessage('Solo valores booleanos'),
  allValidator,
]
//*DESC Validator of the archived or unarchived of the Tip
export const archivedOrUnArchivedTipValidator = [
  body('state').isBoolean().withMessage('Solo valores booleanos'),
  param('tipId')
    .isNumeric()
    .withMessage('Tiene que ser valores numericos')
    .bail()
    .custom(async (tipId: number, { req }: { req: any }) => {
      const question = await findOneTip({ id: tipId, state: !req.body.state })
      if (!question)
        throw new Error('El tip no existe o esta en estado ' + (req.body.state ? 'activo' : 'archivado'))
    }),
  allValidator,
]
