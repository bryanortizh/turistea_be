import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import sequelize from "sequelize";
import { IToken } from "../../auth/passport/passport";
import { findOneUser } from "../../user/services/find";
import {
  createUserDriver,
  createUserGuide,
} from "../../user/services/user.service";
import { generate } from "generate-password";
import rn from "random-number";
import CryptoJS from "crypto-js";
import { findAllGuide, findOneGuide } from "../services/find/guide";
import { createGuide } from "../services/create/guide";
import { registerGuideImageService } from "../services/guide.service";
import { updateGuide } from "../services/update/guide";

export const findAllGuideController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const list = await findAllGuide({
      page: Number(req.query.page),
      where: {
        state: Number(req.query.state),
      },
    });
    res.status(200).json(list);
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));

    next(createError(404, err));
  }
};

export const createGuideController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken;

    const userRegister = await findOneUser({ email: req.body.email });

    const guide = await createGuide({
      ...req.body,
      created_by: user.userId,
      updated_by: user.userId,
      state: true,
    });
    let imagen = {};

    if (req.body.image_photo && req.body.image_document) {
      const base64Data = req.body.image_photo.replace(
        /^data:image\/[a-z]+;base64,/,
        ""
      );

      const base64Document = req.body.image_document.replace(
        /^data:image\/[a-z]+;base64,/,
        ""
      );

      imagen = await registerGuideImageService({
        image_document: Buffer.from(base64Document, "base64"),
        image_photo: Buffer.from(base64Data, "base64"),
        guideId: guide.id!,
      });
    }

    const guideData = await findOneGuide({ id: Number(guide.id) });
    if (!userRegister) {
      const password = generate({
        length: 10,
        symbols: false,
        numbers: true,
        lowercase: true,
        uppercase: false,
      });
      const salt = CryptoJS.lib.WordArray.random(30);
      const hashpwd = CryptoJS.PBKDF2(password, salt.toString(), {
        iterations: 10000,
        keySize: 10,
      });

      enum opt {
        max = 9998,
        min = 1001,
      }

      const gen = rn.generator({
        min: opt.min,
        max: opt.max,
        integer: true,
      });
      const code = gen().toString();

      await createUserGuide(
        {
          name: guideData?.name!,
          lastname: guideData?.lastname!,
          email: guideData?.email!,
          cellphone: guideData?.cellphone!,
          sexo: guideData?.sexo!,
          dni: guideData?.number_document!,
          password: password.toString(),
          salt: salt.toString(),
          code_verification: code,
          date_of_birth: "1900-01-01",
          state: false,
        },
        password.toString()
      );
    }

    res.status(200).json({
      ...guide,
      ...imagen,
    });
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));
    next(createError(404, err));
  }
};

export const updateGuideController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken;

    let imagen = {};

    // Manejar imágenes si vienen en el body
    if (req.body.image_photo && req.body.image_document) {
      const base64Data = req.body.image_photo.replace(
        /^data:image\/[a-z]+;base64,/,
        ""
      );

      const base64Document = req.body.image_document.replace(
        /^data:image\/[a-z]+;base64,/,
        ""
      );

      imagen = await registerGuideImageService({
        image_document: Buffer.from(base64Document, "base64"),
        image_photo: Buffer.from(base64Data, "base64"),
        guideId: Number(req.params.id),
      });
    }

    const guide = await updateGuide({
      ...req.body,
      updated_by: user.userId,
      id: Number(req.params.id),
    });

    res.status(200).json({
      ...guide,
      ...imagen,
    });
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));
    next(createError(404, err));
  }
};

export const inactiveGuideController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken;

    const guide = await updateGuide({
      updated_by: user.userId,
      id: Number(req.params.id),
      state: req.body.state,
    });
    res.status(200).json(guide);
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));
    next(createError(404, err));
  }
};
