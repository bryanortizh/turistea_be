import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import sequelize from "sequelize";
import { findAllDrivers } from "../services/find/driver";
import { createDriver } from "../services/create/driver";
import { IToken } from "../../auth/passport/passport";
import { updateDriver } from "../services/update/driver";

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
    res.status(200).json(driver);
  } catch (err: any) {
    console.log(err);
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
    console.log(err);
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