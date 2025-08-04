import { Router } from 'express'
import { findAllColorTypeController } from '../controllers/color_map.controller'

export const router: Router = Router()
//*@GET /api/question-type
router.get('/', findAllColorTypeController)
