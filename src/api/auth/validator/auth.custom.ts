import { findUserByEmail } from '../../user/services/find'
import { Request } from 'express'
import config from '../../../config/environments/index'
import { TokenAttributes } from '../../token/models/token.model'
import { findTokenByUUID } from '../../token/services/find'
import jwt from 'jsonwebtoken'
export const existsEmailOfUser = async (email: string, { req }: { req: Request | any }): Promise<void> => {
  const _email = await findUserByEmail({ email })
  if (_email) throw new Error('Ya existe el email')
}

export const validateToken = async (authorization: string, { req }: { req: Request | any }): Promise<void> => {
  
  const opts = {
    // token: req.headers.authorization?.split(' ')[1],
    secretOrKey: config.SECRET_HIDDEN_KEY,
  }
  
  if(!authorization.includes('Bearer '))throw new Error("Se requiere el formato: Bearer ")
  let extractToken = authorization.split('Bearer ')[1] 
  const data_values:any = await new Promise((resolve,reject)=>{
    jwt.verify(extractToken as string,opts.secretOrKey as string,(err,data)=>{
      if(err) reject('Token invalido')
      resolve(data)
    })
  })
  
  const token: TokenAttributes = await findTokenByUUID({ uuid: data_values?._id })
  if(!token)throw new Error('Token no utilizable o no activo')
  // req.data_values={
  //   uuid:token.uuid,
  //   rol:token.rol
  // }
}
