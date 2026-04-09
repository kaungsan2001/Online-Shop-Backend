import { body, param } from "express-validator";

export const createBrandValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 100 })
    .withMessage("Name must be at most 100 characters"),
];

export const updateBrandValidator = [
  param("id").isUUID().withMessage("Brand id must be a valid UUID"),

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ max: 100 })
    .withMessage("Name must be at most 100 characters"),
];

export const brandIdValidator = [
  param("id").isUUID().withMessage("Brand id must be a valid UUID"),
];
