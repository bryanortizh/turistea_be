import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import sequelize from "sequelize";
import { IToken } from "../../auth/passport/passport";
import { findAllPackages } from "../services/find/package";
import { createPackage } from "../services/create/package";
import {
  registerPackageImageService,
  updatePackage,
} from "../services/update/package";

export const findAllPackagesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const list = await findAllPackages({
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

export const createPackageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken;

    const pkg = await createPackage({
      ...req.body,
      created_by: user.userId,
      updated_by: user.userId,
      state: true,
    });
    let imagen = {};

    if (req.body.image_bg) {
      const base64Data = req.body.image_bg.replace(
        /^data:image\/[a-z]+;base64,/,
        ""
      );

      imagen = await registerPackageImageService({
        image_bg: Buffer.from(base64Data, "base64"),
        packageId: pkg.id!,
      });
    }

    res.status(200).json({
      ...pkg,
      ...imagen,
    });
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));
    next(createError(404, err));
  }
};

export const updatePackageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken;

    let imagen = {};

    if (req.body.image_bg) {
      const base64Data = req.body.image_bg.replace(
        /^data:image\/[a-z]+;base64,/,
        ""
      );

      imagen = await registerPackageImageService({
        image_bg: Buffer.from(base64Data, "base64"),
        packageId: req.params.id as unknown as number,
      });
    }

    const pkg = await updatePackage({
      ...req.body,
      updated_by: user.userId,
      id: Number(req.params.id),
    });

    res.status(200).json({
      ...pkg,
      ...imagen,
    });
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));
    next(createError(404, err));
  }
};

export const inactivePackageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken;

    const pkg = await updatePackage({
      updated_by: user.userId,
      id: Number(req.params.id),
      state: req.body.state,
    });
    res.status(200).json(pkg);
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));
    next(createError(404, err));
  }
};
