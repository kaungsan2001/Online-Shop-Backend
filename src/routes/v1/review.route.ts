import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validateRequest } from "../../middlewares/validated.middleware";
import {
  createReviewValidator,
  updateReviewValidator,
  reviewIdValidator,
} from "../../validators/review.validator";
import {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
} from "../../controllers/review.controller";

const router = Router();

// Public routes
router.get("/", getReviews);
router.get("/:id", reviewIdValidator, validateRequest, getReview);

// Auth-required routes
router.post(
  "/",
  authMiddleware,
  createReviewValidator,
  validateRequest,
  createReview,
);

// Owner-only routes (ownership enforced in service layer)
router.put(
  "/:id",
  authMiddleware,
  updateReviewValidator,
  validateRequest,
  updateReview,
);
router.delete(
  "/:id",
  authMiddleware,
  reviewIdValidator,
  validateRequest,
  deleteReview,
);

export default router;
