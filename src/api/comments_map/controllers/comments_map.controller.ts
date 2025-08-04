import { NextFunction, Request, Response } from "express";
import sequelize from "sequelize";
import createError from "http-errors";
import { createCommentsService } from "../services/comments_map.service";
import { IToken } from "../../auth/passport/passport";
import { CommentsAttributes } from "../models/comments_map.model";
import {
  findAllComments,
  findAllCommentsAll,
  SearchComments,
} from "../services/find";
import { updateTip } from "../services/update/index";
import { deleteOneTip } from "../services/delete";
import { DataBase } from "../../../database";
import { any } from "sequelize/types/lib/operators";

export const SeachCommentsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { q } = req.params;

    const regex = q.split(" ").join("|");

    const list = await SearchComments({
      regex,
      order: [["id", "DESC"]],
    });
    res.status(200).json(list);
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));
    next(createError(404, err));
  }
};

export const createCommentsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken;
    const {
      coment_text,
      direct_map,
      lat_direccion,
      long_direccion,
      coment_calificacion,
      coment_motivo,
    } = req.body;

    const _comment = await createCommentsService({
      userId: user.userId,
      comment: {
        coment_text,
        direct_map,
        lat_direccion,
        long_direccion,
        coment_calificacion,
        coment_motivo,
      },
    });
    res.status(200).json(_comment);
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));

    next(createError(404, err));
  }
};
export const findAllCommentsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /*     const comments = await findAllComments()
    res.status(200).json(comments) */
    const comments = await findAllComments({
      where: {
        direct_map: String(req.body.direct_map),
        /*     long_direccion: String(req.query.long_direccion), */
      },
      attributes: {
        include: [
          "id",
          "coment_text",
          "direct_map",
          "id_user",
          "coment_calificacion",
          "lat_direccion",
          "long_direccion",
          "coment_motivo",
          "created",
          "updated",
        ],
        exclude: ["updated_by", "created_by", "state"],
      },
    });
    res.status(200).json(comments);
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));

    next(createError(404, err));
  }
};
export const findAllCommentsAllController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /*  const comments = await findAllCommentsAll() */

    const useHours: any[] = await new DataBase().sequelize.query(
      /*    `
      Select lat_direccion,long_direccion ,count(*) as valoracion,
      CASE
     WHEN coment_calificacion = 'Califica'  THEN 'green'
	 WHEN coment_calificacion = 'Reporte'  THEN 'yellow'
     Else 'sin color'     
     END AS color
     from comments_map
     
     GROUP BY lat_direccion,long_direccion
   ` */
      `Select lat_direccion,long_direccion , coment_calificacion  
     from comments_map
     
   
     `,

      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
    /*     let a: any = [];
    useHours.forEach((element, i) => {
      console.log(i, "indices");
      let variable = useHours[i];
      console.log(variable.valoracion, "valo");
      a = variable.valoracion;
    });
    console.log(a, "esto es a"); */

    res.status(200).json(useHours);
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));

    next(createError(404, err));
  }
};

/* export const updateTipController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken
    const { motivation, tip, title, tip_category_id } = req.body
    await updateTip({
      id: Number(req.params.tipId),
      motivation,
      tip,
      title,
      adminId: user.userId,
      tip_category_id,
    })
    res.status(200).json('¡Se actualizo correctamente!')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const updateImageTipServiceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken

    const results = await updateImageTipService({
      image: req.body.image as Buffer,
      tipId: Number(req.params.tipId),
      adminId: user.userId,
    })
    res.status(200).json(results)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
//*DESC Archived or Unarchived the tips
export const archivedTipController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken

    await updateTip({
      id: Number(req.params.tipId),
      state: req.body.state,
      adminId: user.userId,
    })
    res.status(200).json('¡Se ejecuto correctamente!')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
} */
export const deleteOneCommentsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteOneTip(Number(req.params.commentsId));
    res.status(200).json("¡Se elimino correctamente!");
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err));

    next(createError(404, err));
  }
};
