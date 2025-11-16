import { body, query } from "express-validator";
import { allValidator } from "../../../shared/express.validator";

export const validateCreateFormReserve = [
  body("type_document")
    .optional()
    .isString()
    .withMessage("El tipo de documento debe ser un string"),

  body("number_document")
    .optional()
    .isString()
    .withMessage("El número de documento debe ser un string"),

  body("full_name")
    .isString()
    .withMessage("El nombre completo es requerido y debe ser un string")
    .bail()
    .not()
    .isEmpty()
    .withMessage("El nombre completo no puede estar vacío")
    .bail()
    .isLength({ min: 2, max: 200 })
    .withMessage("El nombre completo debe tener entre 2 y 200 caracteres"),

  body("id_user")
    .optional()
    .isInt({ min: 1 })
    .withMessage("El ID de usuario debe ser un número entero positivo"),

  body("id_package")
    .isInt({ min: 1 })
    .withMessage(
      "El ID del paquete es requerido y debe ser un número entero positivo"
    ),

  body("id_router_tracking")
    .optional()
    .isInt({ min: 1 })
    .withMessage("El ID de router tracking debe ser un número entero positivo"),

  body("date_reserve")
    .isISO8601()
    .withMessage("La fecha de reserva debe tener un formato válido (ISO8601)")
    .bail()
    .custom((value) => {
      const reserveDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (reserveDate < today) {
        throw new Error("La fecha de reserva no puede ser anterior a hoy");
      }
      return true;
    }),

  body("cant_people")
    .isInt({ min: 1, max: 50 })
    .withMessage("La cantidad de personas debe ser un número entre 1 y 50"),

  body("users_json")
    .optional()
    .custom((value) => {
      if (typeof value === "string") {
        try {
          JSON.parse(value);
          return true;
        } catch {
          throw new Error("users_json debe ser un JSON válido");
        }
      }
      // Si es un objeto, está bien
      if (typeof value === "object") {
        return true;
      }
      throw new Error("users_json debe ser un JSON válido o un objeto");
    }),

  body("guide")
    .optional()
    .isBoolean()
    .withMessage("El campo guide debe ser un boolean"),

  body("terrace")
    .optional()
    .isBoolean()
    .withMessage("El campo terrace debe ser un boolean"),

  body("price_total")
    .isFloat({ min: 0 })
    .withMessage("El precio total debe ser un número positivo"),

  body("status_form")
    .optional()
    .isIn(["pending", "confirmed", "cancelled", "completed"])
    .withMessage(
      "El estado del formulario debe ser: pending, confirmed, cancelled o completed"
    ),

  allValidator,
];

export const validateGetFormReserves = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("La página debe ser un número entero positivo"),

  query("status")
    .optional()
    .isIn([
      "pending",
      "pendingsing",
      "pendingpay",
      "pendingpayinprocess",
      "reserve",
      "inprocesstravel",
      "done",
      "rejected",
    ])
    .withMessage(
      "El estado debe ser: pending, pendingsing, pendingpay, reserve, inprocesstravel, pendingpayinprocess, done o rejected"
    ),
  query("state")
    .optional()
    .isBoolean()
    .withMessage("State debe ser un boolean"),

  query("id_package")
    .optional()
    .isInt({ min: 1 })
    .withMessage("El ID del paquete debe ser un número entero positivo"),

  query("id_user")
    .optional()
    .isInt({ min: 1 })
    .withMessage("El ID del usuario debe ser un número entero positivo"),

  allValidator,
];
