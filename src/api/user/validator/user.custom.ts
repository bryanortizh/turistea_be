import {
  findUserByEmailWithoutState,
  // , findVerifyCodeVerificationUser, findVerifyStatusAndCodeVerificationUser
} from "../../user/services/find";
import { Request } from "express";
import { DataBase } from "../../../database";
import { IToken } from "../../auth/passport/passport";
import { UserAttributes } from "../models/user.model";
import { validatePassPriv } from "../../admin/validator/admin.custom";
import { body, param } from "express-validator";
import { resizeImage } from "../../../helpers/sharp";
import { extractFile } from "../../../shared/express.satinizer";
import { allValidator } from "../../../shared/express.validator";

export const VerifyCodeVerificationUser = async (
  code_verification: string,
  { req }: { req: Request | any }
): Promise<void> => {
  const _email = await findUserByEmailWithoutState({ email: req.body.email });
  if (!_email) throw new Error(`¡No existe el email ${req.body.email}!`);
  if (_email) {
    // if(_email.state == true )throw new Error(`¡El correo ya se ha confirmado, la cuenta se encuentra activa!`)

    if (_email.code_verification != code_verification)
      throw new Error(`¡el código de verificación es incorrecto!`);
    // const statusAccout = await  findVerifyStatusAndCodeVerificationUser({ code_verification , email : req.body.email,state:true})
    // if (statusAccout) throw new Error(`¡El correo ya se ha confirmado, la cuenta se encuentra activa!`)
    //statusaccount = 1

    // const verifyCode = await  findVerifyCodeVerificationUser({ email: req.body.email , code_verification})
    // if (!verifyCode) throw new Error(`¡el codigo de verificación es incorrecto!`)
  }
};

export const VerifyEmailUser = async (email: string): Promise<void> => {
  const _email = await findUserByEmailWithoutState({ email });
  if (!_email) throw new Error(`¡No existe el email ${email}!`);
};

export const notExistsUserId = async (id: string): Promise<void> => {
  const user = await DataBase.instance.user.findByPk(id);
  if (!user) throw new Error(`¡No existe el id ${id}!`);
};

export const SamePassword = async (
  new_password: string,
  { req }: { req: any }
) => {
  const { userId } = req.user as IToken;

  const user: UserAttributes | null = await DataBase.instance.user.findByPk(
    userId
  );

  const _validatePassPriv = validatePassPriv({
    password: new_password,
    salt: user?.salt,
    hashedPass: user?.password,
  });
  if (_validatePassPriv)
    throw new Error("La nueva contraseña debe ser diferente a la actual");
};

export const updateImagePerfil = [
  /*   param("userId")
    .isNumeric()
    .withMessage("Se require un numero")
    .bail()
    .custom(notExistsUserId), */
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
