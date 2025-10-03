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
export const router: Router = Router();

//*@ACCESS ONLY ADMIN PRIMARY

router.get("/profile", adminProfileController);

//*@ACCESS ONLY ADMIN PRIMARY
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
