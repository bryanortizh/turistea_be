import { Router } from 'express'
import { SeachUsersController } from '../../user/controllers/user.controller'
import {
  archivedTipController,
  createTipController,
  deleteOneTipController,
  findAllTipsController,
  SeachTipsController,
  updateImageTipServiceController,
  updateTipController,
} from '../controllers/tip.controller'
import {
  archivedOrUnArchivedTipValidator,
  createTipValidator,
  deleteTipValidator,
  listTipsValidator,
  updateImageTipValidator,
  updateTipValidator,
} from '../middlewares/tip.validator'

export const router: Router = Router()

router.get('/search/:q', SeachTipsController)

router.post('/', createTipValidator, createTipController)
router.get('/', listTipsValidator, findAllTipsController)
router.put('/:tipId', updateTipValidator, updateTipController)
router.delete('/:tipId', deleteTipValidator, deleteOneTipController)
router.put('/:tipId/image', updateImageTipValidator, updateImageTipServiceController)
router.put('/:tipId/archived', archivedOrUnArchivedTipValidator, archivedTipController)
