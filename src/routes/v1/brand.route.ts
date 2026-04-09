import { Router } from "express";
import { adminMiddleware } from "../../middlewares/admin.middleware";
import { validateRequest } from "../../middlewares/validated.middleware";
import {
  createBrandValidator,
  updateBrandValidator,
  brandIdValidator,
} from "../../validators/brand.validator";
import {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../../controllers/brand.controller";

const router = Router();

// Public routes (no auth required)
router.get("/", getBrands);
router.get("/:id", brandIdValidator, validateRequest, getBrand);

// Protected (admin-only) routes
router.post(
  "/",
  adminMiddleware,
  createBrandValidator,
  validateRequest,
  createBrand,
);

router.put(
  "/:id",
  adminMiddleware,
  updateBrandValidator,
  validateRequest,
  updateBrand,
);

router.delete(
  "/:id",
  adminMiddleware,
  brandIdValidator,
  validateRequest,
  deleteBrand,
);

export default router;
