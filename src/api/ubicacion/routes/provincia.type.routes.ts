import { Router } from 'express'
import { findAllProvinciaController } from '../controllers/provincia.controller'
import { getProvinciaValidator } from '../middlewares/provincia.validator'

export const router: Router = Router()

router.get('/', getProvinciaValidator, findAllProvinciaController)
