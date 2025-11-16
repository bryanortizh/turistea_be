import { Router } from "express";
import {
  createFormReserveController,
  findAllFormReserveController,
  findOneFormReserveController,
} from "../controller/form_reserve.controller";
import {
  validateCreateFormReserve,
  validateGetFormReserves,
} from "../middlewares/form_reserve.validator";

export const router: Router = Router();

router.post("/", validateCreateFormReserve, createFormReserveController);
router.get("/", validateGetFormReserves, findAllFormReserveController);
router.get("/:id", findOneFormReserveController);