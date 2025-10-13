import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import sequelize from "sequelize";
import { findAllDrivers } from "../services/find/driver";
import { createDriver } from "../services/create/driver";
import { IToken } from "../../auth/passport/passport";
import { updateDriver } from "../services/update/driver";
import { registerDriverImageService } from "../services/drivers.service";

export const findAllDriverController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const list = await findAllDrivers({
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
      state: true,
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
    const driver = await updateDriver({
      ...req.body,
      updated_by: user.userId,
      id: Number(req.params.id),
    });
    res.status(200).json(driver);
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
