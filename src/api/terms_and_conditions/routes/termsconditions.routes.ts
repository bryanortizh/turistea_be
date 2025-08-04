import { Router } from 'express'
import { createTermsAndConditionsController, findLatestTermsAndConditionsController } from '../controllers/termsconditions.controller'
import { createTermsAndConditionsValidator } from '../middlewares/termsconditions.middleware'

export const router: Router = Router()
//*@GET /api/terms-conditions
router.get('/', findLatestTermsAndConditionsController)
router.post('/',createTermsAndConditionsValidator, createTermsAndConditionsController)

