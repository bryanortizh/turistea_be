import { Router } from "express";
import { findAllNoticiaNoPageController } from "../../noticia/controllers/noticia.controller";
import {
  findProfileUserController,
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
router.get("/noticias", findAllNoticiaNoPageController);
// router.post('/activate', ActiveAccountUserValidator, ActiveAccountUserController)
