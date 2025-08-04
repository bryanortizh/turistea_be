import { Router } from 'express'
import { SeachUsersController } from '../../user/controllers/user.controller'
import {
  /* archivedTipController, */
  createCommentsController,
  deleteOneCommentsController,
  findAllCommentsAllController,
  findAllCommentsController,
  SeachCommentsController,
  /*   updateImageTipServiceController, */
  /*   updateTipController, */
} from '../controllers/comments_map.controller'
import {
  /*   archivedOrUnArchivedTipValidator, */
  createCommentsValidator,
  deleteCommentsValidator,

  /*   updateImageTipValidator,
  updateTipValidator, */
} from '../middlewares/comments_map.validator'

export const router: Router = Router()

router.get('/search/:q', SeachCommentsController)

router.post('/', createCommentsValidator, createCommentsController)
router.post('/getAll', findAllCommentsController)
router.get('/', findAllCommentsAllController)

/* router.put('/:tipId', updateTipValidator, updateTipController) */
router.delete('/:commentId', deleteCommentsValidator, deleteOneCommentsController)
/* router.put('/:tipId/image', updateImageTipValidator, updateImageTipServiceController)
router.put('/:tipId/archived', archivedOrUnArchivedTipValidator, archivedTipController) */
