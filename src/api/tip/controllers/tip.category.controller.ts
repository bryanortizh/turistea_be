import { NextFunction, Request, Response } from 'express'
import { IToken } from '../../auth/passport/passport'
import { createtTipCategory } from '../services/create/tip.category'
import sequelize from 'sequelize'
import createError from 'http-errors'
import { findAllTipCategory } from '../services/find/tip.category'
import { updateTipCategory } from '../services/update/tip.category'
import { deleteTipCategory } from '../services/delete/tip.category'

export const createTipCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken
    const category = await createtTipCategory({
      tip_category: {
        created_by: user.userId,
        ...req.body,
      },
    })
    res.status(200).json(category)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const findAllTipCategoriesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const list_tip_categories = await findAllTipCategory({
      order: [['id', 'ASC']],
      attributes: {
        include: ['id', 'category', 'created', 'updated'],
        exclude: ['created_by', 'updated_by'],
      },
    })
    res.status(200).json(list_tip_categories)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

export const findAllTipCategoriesUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const list_tip_categories = await findAllTipCategory({
      order: [['id', 'ASC']],
      attributes: {
        include: ['id', 'category', 'created'],
        exclude: ['created_by', 'updated_by','updated'],
      },
    })
    res.status(200).json(list_tip_categories)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}


export const updateTipCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await updateTipCategory({
      tip_category: {
        category: req.body.category,
      },

      where: {
        id: Number(req.params.id),
      },
    })
    res.status(200).json('!Se actualizo la categoria¡')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const deleteTipCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteTipCategory({
      where: {
        id: Number(req.params.id),
      },
    })
    res.status(200).json('!Se elimino con exito¡')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
