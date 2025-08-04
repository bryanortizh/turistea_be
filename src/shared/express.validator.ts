import { header, validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

export const allValidator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

export const deniedAccessUser = [
  header('authorization')
    .custom((authorization, { req }) => req.user.rol !== 'user')
    .withMessage('No tiene autorización para esta ruta como usuario'),
  allValidator,
]
export const deniedAccessAdmin = [
  header('authorization')
    .custom((authorization, { req }) => req.user.rol !== 'admin')
    .withMessage('No tiene autorización para esta ruta como administrador'),
  allValidator,
]
