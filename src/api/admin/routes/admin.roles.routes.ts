import { Router } from 'express'
import { findAllRolesController } from '../controllers/admin.roles.controller'

export const router: Router = Router()

//*@DESC    /api/roles
router.get('/', findAllRolesController)
