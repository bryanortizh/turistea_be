import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import sequelize from "sequelize";
import { IToken } from "../../auth/passport/passport";
import { findOneUser } from "../../user/services/find";
import {
  createUserDriver,
  createUserGuide,
  createUserTerrace,
} from "../../user/services/user.service";
import { generate } from "generate-password";
import rn from "random-number";
import CryptoJS from "crypto-js";
import {
  allTerraces,
  findAllTerrace,
  findOneTerrace,
  findTerraceByName,
} from "../services/find/terrace";
import { createTerrace } from "../services/create/terrace";
import { registerTerraceImageService } from "../services/terrace.service";
import { updateTerrace } from "../services/update/terrace";
import { findDriverByName } from "../../drivers/services/find/driver";

export const findAllTerraceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const list = await findAllTerrace({
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

export const allTerracesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const list = await allTerraces();
    res.status(200).json(list);
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));

    next(createError(404, err));
  }
};


export const findTerraceByNameController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.params.name);
    const terrace = await findTerraceByName(req.params.name);
    res.status(200).json(terrace);
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));

    next(createError(404, err));
  }
};



export const createTerraceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken;

    const userRegister = await findOneUser({ email: req.body.email });

    const terrace = await createTerrace({
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

      imagen = await registerTerraceImageService({
        image_document: Buffer.from(base64Document, "base64"),
        image_photo: Buffer.from(base64Data, "base64"),
        terraceId: terrace.id!,
      });
    }

    const terraceData = await findOneTerrace({ id: Number(terrace.id) });
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

      await createUserTerrace(
        {
          name: terraceData?.name!,
          lastname: terraceData?.lastname!,
          email: terraceData?.email!,
          cellphone: terraceData?.cellphone!,
          sexo: terraceData?.sexo!,
          dni: terraceData?.number_document!,
          password: password.toString(),
          salt: salt.toString(),
          code_verification: code,
          date_of_birth: "1900-01-01",
          state: true,
        },
        password.toString()
      );
    }

    res.status(200).json({
      ...terrace,
      ...imagen,
    });
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));
    next(createError(404, err));
  }
};

export const updateTerraceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken;

    let imagen = {};

    // Manejar imágenes si vienen en el body
    if (req.body.image_photo || req.body.image_document) {
      const imageData: any = {};

      if (req.body.image_photo) {
        const base64Data = req.body.image_photo.replace(
          /^data:image\/[a-z]+;base64,/,
          ""
        );
        imageData.image_photo = Buffer.from(base64Data, "base64");
      }

      if (req.body.image_document) {
        const base64Document = req.body.image_document.replace(
          /^data:image\/[a-z]+;base64,/,
          ""
        );
        imageData.image_document = Buffer.from(base64Document, "base64");
      }

      imagen = await registerTerraceImageService({
        ...imageData,
        terraceId: Number(req.params.id),
      });
    }

    const terrace = await updateTerrace({
      ...req.body,
      updated_by: user.userId,
      id: Number(req.params.id),
    });

    res.status(200).json({
      ...terrace,
      ...imagen,
    });
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));
    next(createError(404, err));
  }
};

export const inactiveTerraceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken;

    const terrace = await updateTerrace({
      updated_by: user.userId,
      id: Number(req.params.id),
      state: req.body.state,
    });
    res.status(200).json(terrace);
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));
    next(createError(404, err));
  }
};
