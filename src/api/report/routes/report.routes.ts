import { Router } from 'express'
import { report1 } from '../controllers/report.controller'

export const router: Router = Router()

router.get('/report1/:start_date/:finish_date', report1)
// router.get('/frecuency/:start_date/:finish_date/:actionId',useFrecuencyReportController)

// Herramienta de gestion de presupuesto  - actionId - 3
// Herramienta de comparador y simulador  de ahorro y credito - actionId - 4

// router.get('/sharetips/:start_date/:finish_date',useFrecuencyReportController)
