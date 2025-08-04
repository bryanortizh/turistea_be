import sequelize from 'sequelize'
import createError from 'http-errors'
import { NextFunction, Request, Response } from 'express'
import { createAdminRoles } from '../services/create/roles'
import { findAllRoles } from '../services/find/roles'

export const findAllRolesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roles = await findAllRoles()
    res.status(200).json(roles)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
