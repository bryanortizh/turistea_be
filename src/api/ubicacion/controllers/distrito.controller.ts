import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import sequelize, { Op } from 'sequelize'
import { findAllDistrito } from '../services/find/distrito'

export const findAllDistritoController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const list = await findAllDistrito({
      prov_id: Number(req.query.prov_id),
    })
    res.status(200).json(list)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
