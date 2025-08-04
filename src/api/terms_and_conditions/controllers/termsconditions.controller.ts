import { NextFunction, Request, Response } from 'express'
import sequelize from 'sequelize'
import createError from 'http-errors'
import { IToken } from '../../auth/passport/passport'
import { findLatestTermsAndConditions } from '../services/find/termsconditions'
import { createTermsAndConditions } from '../services/create/termsconditions'


export const findLatestTermsAndConditionsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
      
    const terms_and_conditions = await findLatestTermsAndConditions({
      attributes:['id','text_document']
    })
    
    res.status(200).json(terms_and_conditions[0]?terms_and_conditions[0]:{})
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

export const createTermsAndConditionsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { text_document } = req.body
    const user = req.user as IToken
    const terms_and_conditions = await createTermsAndConditions({
      termsConditions:{
        text_document,
        created_by:user.userId
      }
    })
    
    res.status(200).json({message:'se creo correctamente',data:terms_and_conditions})
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
