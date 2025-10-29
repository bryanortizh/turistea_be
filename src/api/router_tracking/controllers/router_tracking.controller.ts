import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import sequelize from "sequelize";
import { IToken } from "../../auth/passport/passport";
import { findAllRouterTrackings } from "../services/find/router_tracking";
import { createRouterTracking } from "../services/create/router_tracking";
import { registerRouterTrackingImageService } from "../services/router_tracking.service";
import { updateRouterTracking } from "../services/update/router_tracking";

export const findAllRouterTrackingController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const list = await findAllRouterTrackings({
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

export const createRouterTrackingController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken;

    const pkg = await createRouterTracking({
      ...req.body,
      created_by: user.userId,
      updated_by: user.userId,
      state: true,
    });
    let imagen = {};

    if (req.body.image_one && req.body.image_two && req.body.image_tree) {
      const base64DataOne = req.body.image_one.replace(
        /^data:image\/[a-z]+;base64,/,
        ""
      );

      const base64DataTwo = req.body.image_two.replace(
        /^data:image\/[a-z]+;base64,/,
        ""
      );

      const base64DataThree = req.body.image_tree.replace(
        /^data:image\/[a-z]+;base64,/,
        ""
      );

      imagen = await registerRouterTrackingImageService({
        image_one: Buffer.from(base64DataOne, "base64"),
        image_two: Buffer.from(base64DataTwo, "base64"),
        image_tree: Buffer.from(base64DataThree, "base64"),
        routerTrackingId: pkg.id!,
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

export const updateRouterTrackingController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken;

    let imagen = {};

    if (req.body.image_one && req.body.image_two && req.body.image_tree) {
      const base64DataOne = req.body.image_one.replace(
        /^data:image\/[a-z]+;base64,/,
        ""
      );

      const base64DataTwo = req.body.image_two.replace(
        /^data:image\/[a-z]+;base64,/,
        ""
      );

      const base64DataThree = req.body.image_tree.replace(
        /^data:image\/[a-z]+;base64,/,
        ""
      );

      imagen = await registerRouterTrackingImageService({
        image_one: Buffer.from(base64DataOne, "base64"),
        image_two: Buffer.from(base64DataTwo, "base64"),
        image_tree: Buffer.from(base64DataThree, "base64"),
        routerTrackingId: req.params.id as unknown as number,
      });
    }

    const pkg = await updateRouterTracking({
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

export const inactiveRouterTrackingController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken;

    const pkg = await updateRouterTracking({
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
