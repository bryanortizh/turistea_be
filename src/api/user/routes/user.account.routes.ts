import { Router } from "express";
import {
  findProfileUserController,
  getPackageUserController,
  getRouterPackageByIdController,
  udpateDaySessionUserController,
  updateGenderAndDateOfBirthController,
  updateImagePerfilServiceController,
  updatePasswordUserController,
  updateTermsAndConditionsController,
} from "../controllers/user.controller";
import {
  updateGenderAndDateOfBirthUserValidator,
  updatePasswordUserValidator,
} from "../middlewares/user.validator";
import { updateImagePerfil } from "../validator/user.custom";
import {
  createFormReserveController,
  findUserFormReservesController,
} from "../../form_reserve/controller/form_reserve.controller";
import { validateCreateFormReserve } from "../../form_reserve/middlewares/form_reserve.validator";
export const router: Router = Router();

router.get("/", findProfileUserController);
router.put("/daysession", udpateDaySessionUserController);
router.put(
  "/updatepassword",
  updatePasswordUserValidator,
  updatePasswordUserController
);
router.put(
  "/gender/dateofbirth",
  updateGenderAndDateOfBirthUserValidator,
  updateGenderAndDateOfBirthController
);
router.put("/terms/conditions", updateTermsAndConditionsController);
router.put("/image", updateImagePerfil, updateImagePerfilServiceController);
router.get("/packages", getPackageUserController);
router.get("/router-packages/:id", getRouterPackageByIdController);

router.post(
  "/form_reserves",
  validateCreateFormReserve,
  createFormReserveController
);
router.get("/form_reserves", findUserFormReservesController);
