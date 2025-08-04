import { Router } from 'express'
import {
 findAllTipCategoriesUserController,
} from '../controllers/tip.category.controller'

export const router: Router = Router()


router.get('/', findAllTipCategoriesUserController)