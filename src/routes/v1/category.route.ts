import { Router } from "express";
import { adminMiddleware } from "../../middlewares/admin.middleware";
import { validateRequest } from "../../middlewares/validated.middleware";
import {
  createCategoryValidator,
  updateCategoryValidator,
  categoryIdValidator,
} from "../../validators/category.validator";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../controllers/category.controller";

const router = Router();

// Public routes
router.get("/", getCategories);
router.get("/:id", categoryIdValidator, validateRequest, getCategory);

// Protected (admin-only) routes
router.post(
  "/",
  adminMiddleware,
  createCategoryValidator,
  validateRequest,
  createCategory,
);

router.put(
  "/:id",
  adminMiddleware,
  updateCategoryValidator,
  validateRequest,
  updateCategory,
);

router.delete(
  "/:id",
  adminMiddleware,
  categoryIdValidator,
  validateRequest,
  deleteCategory,
);

export default router;
