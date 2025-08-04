import { Router } from 'express'
import { SeachUsersController } from '../../user/controllers/user.controller'
import {
  archivedNoticiaController,
  createNoticiaController,
  deleteOneNoticiaController,
  findAllNoticiaController,
  SeachTipsController,
  updateImageNoticiaServiceController,
  updateNoticiaController,
} from '../controllers/noticia.controller'
import {
  archivedOrUnArchivedNoticiaValidator,
  createNoticiaValidator,
  deleteNoticiaValidator,
  listNoticiaValidator,
  updateImageNoticiaValidator,
  updateNoticiaValidator,
} from '../middlewares/noticia.validator'

export const router: Router = Router()

router.get('/search/:q', SeachTipsController)

router.post('/', createNoticiaValidator, createNoticiaController)
router.get('/', listNoticiaValidator, findAllNoticiaController)
router.put('/:noticiaId', updateNoticiaValidator, updateNoticiaController)
router.delete('/:noticiaId', deleteNoticiaValidator, deleteOneNoticiaController)
router.put('/:noticiaId/image', updateImageNoticiaValidator, updateImageNoticiaServiceController)
router.put('/:noticiaId/archived', archivedOrUnArchivedNoticiaValidator, archivedNoticiaController)
