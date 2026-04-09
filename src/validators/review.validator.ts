import { body, param } from "express-validator";

export const createReviewValidator = [
  body("productId").isUUID().withMessage("productId must be a valid UUID"),

  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be an integer between 1 and 5"),

  body("comment")
    .trim()
    .notEmpty()
    .withMessage("Comment is required")
    .isLength({ max: 1000 })
    .withMessage("Comment must be at most 1000 characters"),
];

export const updateReviewValidator = [
  param("id").isUUID().withMessage("Review id must be a valid UUID"),

  body("rating")
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be an integer between 1 and 5"),

  body("comment")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Comment cannot be empty")
    .isLength({ max: 1000 })
    .withMessage("Comment must be at most 1000 characters"),
];

export const reviewIdValidator = [
  param("id").isUUID().withMessage("Review id must be a valid UUID"),
];
