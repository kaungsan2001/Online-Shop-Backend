import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as reviewService from "../services/review.service";

// GET /api/v1/reviews?productId=<uuid>  — public
export const getReviews = asyncHandler(async (req: Request, res: Response) => {
  const productId = req.query["productId"] as string;
  const reviews = await reviewService.getReviewsByProduct(productId);
  res.json({ success: true, data: reviews });
});

// GET /api/v1/reviews/:id  — public
export const getReview = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params["id"] as string;
  const review = await reviewService.getReviewById(id);
  res.json({ success: true, data: review });
});

// POST /api/v1/reviews  — auth required
export const createReview = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = (req as any).user.id as string;
    const review = await reviewService.createReview(userId, req.body);
    res.status(201).json({ success: true, data: review });
  },
);

// PUT /api/v1/reviews/:id  — owner only
export const updateReview = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params["id"] as string;
    const userId = (req as any).user.id as string;
    const review = await reviewService.updateReview(id, userId, req.body);
    res.json({ success: true, data: review });
  },
);

// DELETE /api/v1/reviews/:id  — owner only
export const deleteReview = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params["id"] as string;
    const userId = (req as any).user.id as string;
    await reviewService.deleteReview(id, userId);
    res.json({ success: true, message: "Review deleted successfully" });
  },
);
