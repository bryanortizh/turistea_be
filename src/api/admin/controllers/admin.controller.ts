import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import sequelize from 'sequelize'
import { IToken } from '../../auth/passport/passport'
import {
  createAdminIntranetAndSendMailService,
  ArchivedAndUnArchivedAdminService,
  updatePasswordAdminIntranetService,
} from '../services/admin.service'
import { findOneAdmin, findAllAdmin } from '../services/find/admin'
import { updateAdmin } from '../services/update/admin'

export const createAdminIntranetController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IToken
    const admin = await createAdminIntranetAndSendMailService({
      admin: req.body,
      adminId: user.userId,
    })
    res.status(200).json(admin)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const adminProfileController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IToken
    const admin = await findOneAdmin({
      where: {
        id: user.userId,
      },
      attributes: ['name', 'lastname', 'path', 'cellphone', 'email', 'created'],
    })
    res.status(200).json(admin)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const findAllAdminController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const list = await findAllAdmin({
      page: Number(req.query.page),
      where: {
        state: Number(req.query.state),
      },
      attributes: ['id', 'name', 'lastname', 'email', 'cellphone', 'path', 'created', 'updated'],
    })
    res.status(200).json(list)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const ArchivedAndUnArchivedAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken

    await ArchivedAndUnArchivedAdminService({
      updated_by: user.userId,
      id: Number(req.params.id),
      state: req.body.state,
    })
    res.status(200).json(`Se ${req.body.state ? 'desbloqueo' : 'bloqueo'} correctamente`)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const updateAdminIntranetController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IToken
    await updateAdmin({
      where: {
        id: req.params.id,
      },
      updated_by: user.userId,
      name: req.body.name,
      lastname: req.body.lastname,
      cellphone: req.body.cellphone,
      /*       admin_rol_id: req.body.admin_rol_id,
       */
    })

    res.status(200).json('Se actualizo el admin')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
//!Por implementar
export const updateAdminController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IToken
    await updateAdmin({
      where: {
        id: req.params.id || user.userId,
      },
      updated_by: user.userId,
      name: req.body.name,
      lastname: req.body.lastname,
      cellphone: req.body.cellphone,
    })

    res.status(200).json('Se actualizo el admin')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

export const updatePasswordAdminIntranetController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken
    const { new_password } = req.body

    await updatePasswordAdminIntranetService(new_password, user.userId)

    res.status(200).json('Se actualizo el admin')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
