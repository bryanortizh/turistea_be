import { Router } from 'express'
import {
  createAdminIntranetController,
  adminProfileController,
  ArchivedAndUnArchivedAdminController,
  updateAdminIntranetController,
  updatePasswordAdminIntranetController,
} from '../controllers/admin.controller'
import {
  archivedOrUnArchivedAdminValidator,
  createAdminIntranet,
  listAdminIntranet,
  updateAdminIntranetValidator,
  updatePasswordAdminIntranetValidator,
} from '../middlewares/admin.validator'
import { findAllAdminController } from '../controllers/admin.controller'
export const router: Router = Router()

//*@ACCESS ONLY ADMIN PRIMARY
router.post('/', createAdminIntranet, createAdminIntranetController)

router.get('/profile', adminProfileController)

//*@ACCESS ONLY ADMIN PRIMARY
router.get('/', listAdminIntranet, findAllAdminController)

//*@ACCESS ONLY ADMIN PRIMARY
router.put(
  '/:id/blocking',
  archivedOrUnArchivedAdminValidator,
  ArchivedAndUnArchivedAdminController
)

//*@ACCESS ONLY ADMIN PRIMARY
router.put('/:id', updateAdminIntranetValidator, updateAdminIntranetController)

router.put('/password/update', updatePasswordAdminIntranetValidator, updatePasswordAdminIntranetController)

