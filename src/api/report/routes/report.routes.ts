import { Router } from 'express'
import { report1, getNewUsersStats } from '../controllers/report.controller'

export const router: Router = Router()

router.get('/report1/:start_date/:finish_date', report1)
router.get('/new-users-stats', getNewUsersStats)
