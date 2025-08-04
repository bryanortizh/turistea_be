import { NextFunction, Request, Response } from "express";
import sequelize from "sequelize";
import createError from "http-errors";
import {
  createNoticiaService,
  updateImageNoticiaService,
} from "../services/noticia.service";
import { IToken } from "../../auth/passport/passport";
import { NoticiaAttributes } from "../models/noticia.model";
import {
  findAllNoticia,
  findAllNoticiaNoPage,
  SearchTip,
} from "../services/find";
import { updateNoticia } from "../services/update/index";
import { deleteOneNoticia } from "../services/delete";

export const SeachTipsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { q } = req.params;

    const regex = q.split(" ").join("|");

    const list = await SearchTip({
      regex,
      order: [["id", "DESC"]],
    });
    res.status(200).json(list);
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));
    next(createError(404, err));
  }
};

export const createNoticiaController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken;
    const {
      titular,
      title,
      code_departamento,
      code_provincia,
      ubigeo,
      name_departamento,
      name_provincia,
      name_distrito,
    } = req.body;

    const image = req.body.image as Buffer;

    const _noticia = await createNoticiaService({
      adminId: user.userId,
      image,
      noticia: {
        titular,
        title,
        code_departamento,
        code_provincia,
        ubigeo,
        name_departamento,
        name_provincia,
        name_distrito,
      },
    });
    res.status(200).json(_noticia);
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));

    next(createError(404, err));
  }
};
export const findAllNoticiaController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const noticia = await findAllNoticia({
      page: Number(req.query.page),
      where: {
        state: Number(req.query.state),
      },
      attributes: {
        include: [
          "id",
          "title",
          "titular",
          "name_departamento",
          "name_provincia",
          "name_distrito",
          "created",
          "updated",
          "path",
          "key",
          "size",
        ],
        exclude: ["updated_by", "created_by", "state"],
      },
    });
    res.status(200).json(noticia);
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));

    next(createError(404, err));
  }
};
/* 
export const findAllNoticiaController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roles = await findAllNoticia()
    res.status(200).json(roles)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
} */

export const updateNoticiaController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken;
    const {
      titular,
      title,
      code_departamento,
      code_provincia,
      ubigeo,
      name_departamento,
      name_provincia,
      name_distrito,
    } = req.body;
    await updateNoticia({
      id: Number(req.params.noticiaId),
      titular,
      title,
      adminId: user.userId,
      code_departamento,
      code_provincia,
      ubigeo,
      name_departamento,
      name_provincia,
      name_distrito,
    });
    res.status(200).json("¡Se actualizo correctamente!");
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));

    next(createError(404, err));
  }
};
export const updateImageNoticiaServiceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken;

    const results = await updateImageNoticiaService({
      image: req.body.image as Buffer,
      noticiaId: Number(req.params.noticiaId),
      adminId: user.userId,
    });
    res.status(200).json(results);
    console.log(results);
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));

    next(createError(404, err));
  }
};
//*DESC Archived or Unarchived the tips
export const archivedNoticiaController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken;

    await updateNoticia({
      id: Number(req.params.noticiaId),
      state: req.body.state,
      adminId: user.userId,
    });
    res.status(200).json("¡Se ejecuto correctamente!");
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));

    next(createError(404, err));
  }
};
export const deleteOneNoticiaController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteOneNoticia(Number(req.params.noticiaId));
    res.status(200).json("¡Se elimino correctamente!");
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));

    next(createError(404, err));
  }
};
export const findAllNoticiaNoPageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roles = await findAllNoticiaNoPage({
      where: {
        code_departamento: Number(req.query.code_departamento),
      },
    });
    res.status(200).json(roles);
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));

    next(createError(404, err));
  }
};
