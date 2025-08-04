import sequelize from "sequelize";
import createError from "http-errors";
import { Response, Request, NextFunction } from "express";
import {
  findAllUbigeo,
  findAllUbigeoDistrito,
  findAllUbigeoProvincia,
} from "../services/find";

export const findAllDepartamentoUbigeoTypeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roles = await findAllUbigeo();
    res.status(200).json(roles);
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));

    next(createError(404, err));
  }
};

export const findAllProvinciaUbigeoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const list = await findAllUbigeoProvincia({
      where: {
        code_departamento: Number(req.query.code_departamento),
      },
    });
    res.status(200).json(list);
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));

    next(createError(404, err));
  }
};

export const findAllDistritoUbigeoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const list = await findAllUbigeoDistrito({
      where: {
        code_provincia: Number(req.query.code_provincia),
      },
    });
    res.status(200).json(list);
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));

    next(createError(404, err));
  }
};
