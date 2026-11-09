import { body } from "express-validator";

export const createUserValidator = [
  body("firstName")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("firstName is required")
    .isLength({ max: 50 })
    .withMessage("firstName must have at most 50 characters"),
  body("lastName")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("lastName is required")
    .isLength({ max: 50 })
    .withMessage("lastName must have at most 50 characters"),
  body("email")
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage("email is not valid")
    .isLength({ max: 100 })
    .withMessage("email must have at most 100 characters"),
  body("password")
    .isString()
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage(
      "password must have at least 8 characters, one uppercase, one lowercase and one number",
    )
    .isLength({ max: 72 })
    .withMessage("password must have at most 72 characters"),
];