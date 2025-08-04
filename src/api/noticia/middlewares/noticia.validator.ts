import { body, query, param } from "express-validator";
import { resizeImage } from "../../../helpers/sharp";
import { allValidator } from "../../../shared/express.validator";
import { extractFile } from "../../../shared/express.satinizer";
import { existsNoticia } from "../validator/noticia.custom";
import { findOneNoticia } from "../services/find/index";
import { existsProv } from "../../ubicacion/middlewares/provincia.validator";
import { existsDepar } from "../../ubicacion/middlewares/departamento.validator";
import { existsDistri } from "../../ubicacion/middlewares/distrito.validator";
export const createNoticiaValidator = [
  body("title")
    .isString()
    .withMessage("Tiene que ser un string")
    .bail()
    .not()
    .isEmpty()
    .withMessage("No puede ser vacio")
    .bail()
    .isLength({ min: 10, max: 200 })
    .withMessage("Tiene un minimo de 10 letras y maximo de 200"),

  body("titular")
    .isString()
    .withMessage("Tiene que tener un titular")
    .bail()
    .isLength({ max: 500 })
    .withMessage("Tiene un maximo de 500"),
  /*   body('region_id').isNumeric().withMessage('Se requiere un departamento').bail().custom(existsDepar),

  body('prov_id').isNumeric().withMessage('Se requiere una provincia').bail().custom(existsProv),
  body('distrito_id').isNumeric().withMessage('Se requiere un distrito').bail().custom(existsDistri), */

  body("image")
    .isString()
    .withMessage("Es una cadena de Base64")
    .bail()
    .not()
    .isEmpty()
    .withMessage("No puede ser vacio")
    .bail()
    .customSanitizer(extractFile)
    .isBase64()
    .withMessage("Tiene que ser una cadena de Base64")
    .custom(
      (file, { req }) =>
        req.mimetype === "image/jpeg" ||
        req.mimetype === "image/jpg" ||
        req.mimetype === "image/png"
    )
    .withMessage("Solo se permiten formatos de imagen")
    .customSanitizer((image: string) => Buffer.from(image, "base64"))
    .customSanitizer(async (image: Buffer) => {
      return await resizeImage({
        file: image,
        pngOptions: {
          compressionLevel: 9,
        },
        resizeOptions: {
          width: 300,
          height: 300,
          fit: "cover",
        },
      });
    })
    .optional({ nullable: true }),
  allValidator,
];
export const deleteNoticiaValidator = [
  param("noticiaId")
    .isNumeric()
    .withMessage("Tiene que ser numerico")
    .bail()
    .custom(existsNoticia),
  allValidator,
];
export const updateNoticiaValidator = [
  param("noticiaId")
    .isNumeric()
    .withMessage("Tiene que ser numerico")
    .bail()
    .custom(existsNoticia),
  /*   body('region_id').isNumeric().withMessage('Se requiere un departamento').bail().custom(existsDepar),

  body('prov_id').isNumeric().withMessage('Se requiere una provincia').bail().custom(existsProv),
  body('distrito_id').isNumeric().withMessage('Se requiere un distrito').bail().custom(existsDistri), */

  body("title")
    .isString()
    .withMessage("Tiene que ser un string")
    .bail()
    .not()
    .isEmpty()
    .withMessage("No puede ser vacio")
    .bail()
    .isLength({ min: 10, max: 200 })
    .withMessage("Tiene un minimo de 10 letras y maximo de 200"),
  body("titular")
    .isString()
    .withMessage("Tiene que se un titular")
    .bail()
    .isLength({ max: 500 })
    .withMessage("Tiene un maximo de 500"),
];
//*@DESC update image of the question
export const updateImageNoticiaValidator = [
  param("noticiaId")
    .isNumeric()
    .withMessage("Se require un numero")
    .bail()
    .custom(existsNoticia),
  body("image")
    .isString()
    .withMessage("Es una cadena de Base64")
    .bail()
    .not()
    .isEmpty()
    .withMessage("No puede ser vacio")
    .bail()
    .customSanitizer(extractFile)
    .isBase64()
    .withMessage("Tiene que ser una cadena de Base64")
    .custom(
      (file, { req }) =>
        req.mimetype === "image/jpeg" ||
        req.mimetype === "image/jpg" ||
        req.mimetype === "image/png"
    )
    .withMessage("Solo se permiten formatos de imagen")
    .customSanitizer((image: string) => Buffer.from(image, "base64"))
    .customSanitizer(async (image: Buffer) => {
      return await resizeImage({
        file: image,
        pngOptions: {
          compressionLevel: 9,
        },
        resizeOptions: {
          width: 300,
          height: 300,
          fit: "cover",
        },
      });
    }),
  allValidator,
];
export const listNoticiaValidator = [
  query("page")
    .isNumeric()
    .withMessage("Solo numero")
    .bail()
    .isInt({ min: 1 })
    .withMessage("El nimimo es 1"),
  query("state").isBoolean().withMessage("Solo valores booleanos"),
  allValidator,
];
//*DESC Validator of the archived or unarchived of the Tip
export const archivedOrUnArchivedNoticiaValidator = [
  body("state").isBoolean().withMessage("Solo valores booleanos"),
  param("noticiaId")
    .isNumeric()
    .withMessage("Tiene que ser valores numericos")
    .bail()
    .custom(async (noticiaId: number, { req }: { req: any }) => {
      const noticia = await findOneNoticia({
        id: noticiaId,
        state: !req.body.state,
      });
      if (!noticia)
        throw new Error(
          "La noticia no existe o esta en estado " +
            (req.body.state ? "activo" : "archivado")
        );
    }),
  allValidator,
];
