import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import sequelize from "sequelize";
import {
  allDrivers,
  findAllDrivers,
  findDriverByName,
  findOneDriver,
} from "../services/find/driver";
import { createDriver } from "../services/create/driver";
import { IToken } from "../../auth/passport/passport";
import { updateDriver } from "../services/update/driver";
import { registerDriverImageService } from "../services/drivers.service";
import { findOneUser } from "../../user/services/find";
import { createUserDriver } from "../../user/services/user.service";
import { generate } from "generate-password";
import rn from "random-number";
import CryptoJS from "crypto-js";


export const findAllDriverController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const searchTerm = req.params.search;
    const whereCondition: any = {
      state: Number(req.query.state),
    };

    if (searchTerm && searchTerm.trim() !== "") {
      whereCondition[sequelize.Op.or] = [
        { name: { [sequelize.Op.like]: `%${searchTerm}%` } },
        { lastname: { [sequelize.Op.like]: `%${searchTerm}%` } },
        { email: { [sequelize.Op.like]: `%${searchTerm}%` } },
        { cellphone: { [sequelize.Op.like]: `%${searchTerm}%` } },
        { number_document: { [sequelize.Op.like]: `%${searchTerm}%` } },
        { number_plate: { [sequelize.Op.like]: `%${searchTerm}%` } },
      ];
    }

    const list = await findAllDrivers({
      page: Number(req.query.page),
      where: whereCondition,
    });
    res.status(200).json(list);
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));

    next(createError(404, err));
  }
};

export const allDriversController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const list = await allDrivers();
    res.status(200).json(list);
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));

    next(createError(404, err));
  }
};

export const findDriverByNameController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const driver = await findDriverByName(req.params.name);
    res.status(200).json(driver);
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));

    next(createError(404, err));
  }
};

export const createDriverController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken;

    const driver = await createDriver({
      ...req.body,
      created_by: user.userId,
      updated_by: user.userId,
      state: false,
    });
    let imagen = {};

    if (req.body.image_car && req.body.image_document) {
      const base64Data = req.body.image_car.replace(
        /^data:image\/[a-z]+;base64,/,
        ""
      );

      const base64Document = req.body.image_document.replace(
        /^data:image\/[a-z]+;base64,/,
        ""
      );

      imagen = await registerDriverImageService({
        image_document: Buffer.from(base64Document, "base64"),
        image_car: Buffer.from(base64Data, "base64"),
        driverId: driver.id!,
      });
    }
    res.status(200).json({
      ...driver,
      ...imagen,
    });
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));
    next(createError(404, err));
  }
};

export const updateDriverController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken;

    let imagen = {};

    if (req.body.image_car && req.body.image_document) {
      const base64Data = req.body.image_car.replace(
        /^data:image\/[a-z]+;base64,/,
        ""
      );

      const base64Document = req.body.image_document.replace(
        /^data:image\/[a-z]+;base64,/,
        ""
      );

      imagen = await registerDriverImageService({
        image_document: Buffer.from(base64Document, "base64"),
        image_car: Buffer.from(base64Data, "base64"),
        driverId: Number(req.params.id),
      });
    }

    const driver = await updateDriver({
      ...req.body,
      updated_by: user.userId,
      id: Number(req.params.id),
    });

    res.status(200).json({
      ...driver,
      ...imagen,
    });
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));
    next(createError(404, err));
  }
};

export const inactiveDriverController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken;
    const userRegister = await findOneUser({ email: req.body.email });
    const driverData = await findOneDriver({ id: Number(req.params.id) });
    if (!userRegister && req.body.state === true) {
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

      await createUserDriver(
        {
          name: driverData?.name!,
          lastname: driverData?.lastname!,
          email: driverData?.email!,
          cellphone: driverData?.cellphone!,
          sexo: driverData?.sexo!,
          dni: driverData?.number_document!,
          password: password.toString(),
          salt: salt.toString(),
          code_verification: code,
          date_of_birth: "1900-01-01",
          state: true,
        },
        password.toString()
      );
    }

    const driver = await updateDriver({
      updated_by: user.userId,
      id: Number(req.params.id),
      state: req.body.state,
    });
    res.status(200).json(driver);
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));
    next(createError(404, err));
  }
};
