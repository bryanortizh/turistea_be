import { Router } from 'express'
import { updateIdDeviceController } from '../controllers/user.controller'
export const router: Router = Router()

router.put('/:device_id', updateIdDeviceController)