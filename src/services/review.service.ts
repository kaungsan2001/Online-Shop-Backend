import { prisma } from "../db";
import createHttpError from "http-errors";

// ── Types ──────────────────────────────────────────────────────────────────────

interface CreateReviewInput {
  productId: string;
  rating: number;
  comment: string;
}

interface UpdateReviewInput {
  rating?: number;
  comment?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const assertExists = async (id: string) => {
  const review = await prisma.review.findUnique({ where: { id } });
  if (!review) throw createHttpError(404, "Review not found");
  return review;
};

// ── Service functions ─────────────────────────────────────────────────────────

export const getReviewsByProduct = async (productId: string) => {
  return prisma.review.findMany({
    where: { productId },
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { id: true, name: true, image: true } },
    },
  });
};

export const getReviewById = async (id: string) => {
  const review = await prisma.review.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, image: true } },
    },
  });
  if (!review) throw createHttpError(404, "Review not found");
  return review;
};

export const createReview = async (userId: string, data: CreateReviewInput) => {
  // Check product exists
  const product = await prisma.product.findUnique({
    where: { id: data.productId },
  });
  if (!product) throw createHttpError(404, "Product not found");

  // One review per user per product
  const existing = await prisma.review.findFirst({
    where: { userId, productId: data.productId },
  });
  if (existing) {
    throw createHttpError(409, "You have already reviewed this product");
  }

  return prisma.review.create({
    data: { ...data, userId },
    include: { user: { select: { id: true, name: true, image: true } } },
  });
};

export const updateReview = async (
  id: string,
  userId: string,
  data: UpdateReviewInput,
) => {
  const review = await assertExists(id);

  if (review.userId !== userId) {
    throw createHttpError(403, "Forbidden: You can only edit your own reviews");
  }

  return prisma.review.update({ where: { id }, data });
};

export const deleteReview = async (id: string, userId: string) => {
  const review = await assertExists(id);

  if (review.userId !== userId) {
    throw createHttpError(
      403,
      "Forbidden: You can only delete your own reviews",
    );
  }

  return prisma.review.delete({ where: { id } });
};
