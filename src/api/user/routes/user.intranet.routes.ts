import { Router } from 'express'
import {  findAllUsersController, findAllUsersRecordTypeController, findAllUsersRangeAgeController, UnsubscribeTheUserAndClean, SeachUsersController } from '../controllers/user.controller'
import { listUserIntranetValidator, listUserRecordType, UnsubscribeUser } from '../middlewares/user.validator'
export const router: Router = Router()
router.get('/', listUserIntranetValidator, findAllUsersController)
router.get('/search/:q', SeachUsersController)


router.get('/recordType', listUserRecordType, findAllUsersRecordTypeController)

router.get('/rangeAge', findAllUsersRangeAgeController)


router.post('/unsubscribe/clean',UnsubscribeUser, UnsubscribeTheUserAndClean)

// router.post('/activate', ActiveAccountUserValidator, ActiveAccountUserController)

