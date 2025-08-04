import { Router } from 'express'
import { findAllDepartamentoTypeController } from '../controllers/departamento.controller'

export const router: Router = Router()
//*@GET /api/question-type
router.get('/', findAllDepartamentoTypeController)
