import { Router } from 'express'
import { getNewUsersStats, getReservesReport } from '../controllers/report.controller'

export const router: Router = Router()

router.get('/new-users-stats', getNewUsersStats)
router.get('/reserves-report', getReservesReport)
