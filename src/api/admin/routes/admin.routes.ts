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
  allDriversController,
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
  allGuideController,
  createGuideController,
  findAllGuideController,
  findGuideByNameController,
  inactiveGuideController,
  updateGuideController,
} from "../../guide/controller/guide.controller";
import { findAllGuide } from "../../guide/services/find/guide";
import {
  allTerracesController,
  createTerraceController,
  findAllTerraceController,
  findTerraceByNameController,
  inactiveTerraceController,
  updateTerraceController,
} from "../../terrace/controller/terrace.controller";
import {
  validateCreateTerrace,
  validateUniqueTerraceFields,
  validateUpdateTerrace,
} from "../../terrace/middlewares/terrace.validator";
import {
  createRouterTrackingController,
  findAllRouterTrackingController,
  inactiveRouterTrackingController,
  updateRouterTrackingController,
} from "../../router_tracking/controllers/router_tracking.controller";
import { changeFormReserveStatusController, findAllFormReserveController, findOneFormReserveController } from "../../form_reserve/controller/form_reserve.controller";
import { validateGetFormReserves } from "../../form_reserve/middlewares/form_reserve.validator";
export const router: Router = Router();

router.get("/profile", adminProfileController);
router.get("/", listAdminIntranet, findAllAdminController);
router.get("/search/:search", listAdminIntranet, findAllAdminController);
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
router.get("/drivers-all", allDriversController);
router.get("/drivers/:search", findAllDriverController);
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
router.get("/guides-all", allGuideController)
router.post("/guides", createGuideController);
router.put("/guides/:id", updateGuideController);
router.put("/guides-inactive/:id", inactiveGuideController);
router.get("/guides-search/:name", findGuideByNameController);

/* TERRAMOZAS */
router.get("/terraces", findAllTerraceController);
router.get("/terraces-all", allTerracesController);
router.post("/terraces", 
  validateCreateTerrace,
  validateUniqueTerraceFields,
  createTerraceController
);
router.put("/terraces/:id", validateUpdateTerrace, updateTerraceController);
router.put("/terraces-inactive/:id", inactiveTerraceController);
router.get("/terraces-search/:name", findTerraceByNameController);

/* ROUTER TRACKING */
router.get("/router-tracking/:id", findAllRouterTrackingController);
router.post("/router-tracking", createRouterTrackingController);
router.put("/router-tracking/:id", updateRouterTrackingController);
router.put("/router-tracking-inactive/:id", inactiveRouterTrackingController);


router.get("/form_reserves", validateGetFormReserves, findAllFormReserveController);
router.get("/form_reserves/:id", findOneFormReserveController);
router.put("/form_reserves/:id/approve", changeFormReserveStatusController);
router.put("/form_reserves/:id/reject", changeFormReserveStatusController);