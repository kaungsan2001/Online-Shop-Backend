import { body, param } from "express-validator";

export const createCategoryValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 100 })
    .withMessage("Name must be at most 100 characters"),

  body("parentId")
    .optional({ nullable: true })
    .isUUID()
    .withMessage("parentId must be a valid UUID"),
];

export const updateCategoryValidator = [
  param("id").isUUID().withMessage("Category id must be a valid UUID"),

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ max: 100 })
    .withMessage("Name must be at most 100 characters"),

  body("parentId")
    .optional({ nullable: true })
    .isUUID()
    .withMessage("parentId must be a valid UUID"),
];

export const categoryIdValidator = [
  param("id").isUUID().withMessage("Category id must be a valid UUID"),
];
