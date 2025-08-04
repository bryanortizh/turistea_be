import { Router } from "express";
import { findAllDepartamentoTypeController } from "../../ubicacion/controllers/departamento.controller";
import { findAllDistritoController } from "../../ubicacion/controllers/distrito.controller";
import { findAllProvinciaController } from "../../ubicacion/controllers/provincia.controller";
import {
  findAllDepartamentoUbigeoTypeController,
  findAllDistritoUbigeoController,
  findAllProvinciaUbigeoController,
} from "../../ubigeo/controllers/ubigeo_map.controller";
import {
  ActiveAccountUserValidator,
  EmailUserValidator,
  newPasswordAndCodeValidator,
} from "../../user/middlewares/user.validator";
// import { VerifyEmailUser } from '../../user/validator/user.custom'
import { ActiveAccountUserController } from "../controllers/auth.active.account.controller";
import {
  googleSignInController,
  signInAdminController,
  signInController,
  signOutController,
  signInSocialNetworkController,
  // signOutUserController,
  signUpAdminController,
  signUpController,
  validarEmailUser,
  signInSocialNetworkControllerWithoutValidation,
} from "../controllers/auth.controller";
import {
  restoreAccountUserController,
  sendCodeVerificationForRestoreAccountUserController,
} from "../controllers/auth.restore.account.controller";
import {
  signinAdminValidator,
  signinValidator,
  signoutValidator,
  signupAdminValidator,
  signupValidator,
} from "../middlewares/auth.validator";

export const router: Router = Router();

router.post("/signup", signupValidator, signUpController);
router.post("/signin", signinValidator, signInController);
router.post("/signin-google", googleSignInController);
router.post("/signup-social-network", signInSocialNetworkController);
router.post("/validate-user", validarEmailUser);
router.post(
  "/singup-social-network-user",
  signInSocialNetworkControllerWithoutValidation
);
router.get("/departamentos", findAllDepartamentoUbigeoTypeController);
router.get("/provincias", findAllProvinciaUbigeoController);
router.get("/distritos", findAllDistritoUbigeoController);

router.get("/signout", signoutValidator, signOutController);

//* session admin!

//*@POST /api/admin-signup
// router.post('/admin-signup', signinAdminValidator, signUpAdminController)
router.post("/admin-signin", signupAdminValidator, signInAdminController);

router.post(
  "/sendcodeverification",
  EmailUserValidator,
  sendCodeVerificationForRestoreAccountUserController
);
router.post(
  "/active/verifycode",
  ActiveAccountUserValidator,
  ActiveAccountUserController
);
router.post(
  "/restore",
  newPasswordAndCodeValidator,
  restoreAccountUserController
);
