import { Router } from 'express'
import { findAllDistritoController } from '../controllers/distrito.controller'
import { getDistritoValidator } from '../middlewares/distrito.validator'

export const router: Router = Router()

router.get('/', getDistritoValidator, findAllDistritoController)
