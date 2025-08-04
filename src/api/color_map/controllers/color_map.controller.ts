import sequelize from 'sequelize'
import createError from 'http-errors'
import { Response, Request, NextFunction } from 'express'
import { findAllColors } from '../services/find'

export const findAllColorTypeController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roles = await findAllColors()
    res.status(200).json(roles)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
