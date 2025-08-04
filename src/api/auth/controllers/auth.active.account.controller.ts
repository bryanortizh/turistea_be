import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import sequelize from 'sequelize'
import { updateUserStateCodeVerification } from '../../user/services/update'

export const ActiveAccountUserController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email } = req.body
      // const { option } = req.query
      // let message = ''
      // if(option == 'restore'){
      //   message:'¡Codigo de verificación correcto!'
      // }
      await updateUserStateCodeVerification({state:true,email})
      res.status(200).json({code_verification:req.body.code_verification,message:'¡Código de verificación correcto!'})
      
    } catch (err: any) {
      if (err instanceof sequelize.ValidationError) next(createError(400, err))
      next(createError(404, err))
    }
  }
  