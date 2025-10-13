import { Router } from "express";
import {
  createAdminIntranetController,
  adminProfileController,
  ArchivedAndUnArchivedAdminController,
  updateAdminIntranetController,
  updatePasswordAdminIntranetController,
} from "../controllers/admin.controller";
import {
  archivedOrUnArchivedAdminValidator,
  createAdminIntranet,
  listAdminIntranet,
  updateAdminIntranetValidator,
  updatePasswordAdminIntranetValidator,
} from "../middlewares/admin.validator";
import { findAllAdminController } from "../controllers/admin.controller";
import {
  createDriverController,
  findAllDriverController,
  inactiveDriverController,
  updateDriverController,
} from "../../drivers/controllers/drivers.controller";
import {
  validateCreateDriver,
  validateUniqueDriverFields,
  validateUpdateDriver,
} from "../../drivers/middlewares/drivers.validator";
export const router: Router = Router();

router.get("/profile", adminProfileController);
router.get("/", listAdminIntranet, findAllAdminController);
router.put("/:id", updateAdminIntranetValidator, updateAdminIntranetController);
router.post("/", createAdminIntranet, createAdminIntranetController);
router.put(
  "/:id/blocking",
  archivedOrUnArchivedAdminValidator,
  ArchivedAndUnArchivedAdminController
);
router.put(
  "/password/update",
  updatePasswordAdminIntranetValidator,
  updatePasswordAdminIntranetController
);
router.get("/drivers", findAllDriverController);
router.post(
  "/drivers",
  validateCreateDriver,
  validateUniqueDriverFields,
  createDriverController
);
router.put(
  "/drivers/:id",
  validateUpdateDriver,
  validateUniqueDriverFields,
  updateDriverController
);
router.put("/drivers-inactive/:id", inactiveDriverController);