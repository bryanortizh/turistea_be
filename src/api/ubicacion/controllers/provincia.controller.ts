import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import sequelize, { Op } from 'sequelize'
import { findAllProvincia } from '../services/find/provincia'

export const findAllProvinciaController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const list = await findAllProvincia({
      region_id: Number(req.query.region_id),
    })
    res.status(200).json(list)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
