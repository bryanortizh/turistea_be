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
  findDriverByNameController,
  inactiveDriverController,
  updateDriverController,
} from "../../drivers/controllers/drivers.controller";
import {
  validateCreateDriver,
  validateUniqueDriverFields,
  validateUpdateDriver,
} from "../../drivers/middlewares/drivers.validator";
import {
  createPackageController,
  findAllPackagesController,
  inactivePackageController,
  updatePackageController,
} from "../../package/controllers/package.controller";
import {
  createGuideController,
  findAllGuideController,
  inactiveGuideController,
  updateGuideController,
} from "../../guide/controller/guide.controller";
import { findAllGuide } from "../../guide/services/find/guide";
import {
  createRouterTrackingController,
  findAllRouterTrackingController,
  inactiveRouterTrackingController,
  updateRouterTrackingController,
} from "../../router_tracking/controllers/router_tracking.controller";
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
/* CONDUCTORES */
router.get("/drivers", findAllDriverController);
router.post(
  "/drivers",
  validateCreateDriver,
  validateUniqueDriverFields,
  createDriverController
);
router.put("/drivers/:id", updateDriverController);
router.put("/drivers-inactive/:id", inactiveDriverController);
router.get("/driver/:name", findDriverByNameController);

/* PAQUETES */
router.get("/packages", findAllPackagesController);
router.post("/packages", createPackageController);
router.put("/packages/:id", updatePackageController);
router.put("/packages-inactive/:id", inactivePackageController);

/* GUIAS */
router.get("/guides", findAllGuideController);
router.post("/guides", createGuideController);
router.put("/guides/:id", updateGuideController);
router.put("/guides-inactive/:id", inactiveGuideController);

/* ROUTER TRACKING */
router.get("/router-tracking", findAllRouterTrackingController);
router.post("/router-tracking", createRouterTrackingController);
router.put("/router-tracking/:id", updateRouterTrackingController);
router.put("/router-tracking-inactive/:id", inactiveRouterTrackingController);
