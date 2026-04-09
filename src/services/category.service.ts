import { prisma } from "../db";
import createHttpError from "http-errors";

// ── Types ─────────────────────────────────────────────────────────────────────

interface CreateCategoryInput {
  name: string;
  parentId?: string | null;
}

interface UpdateCategoryInput {
  name?: string;
  parentId?: string | null;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const assertExists = async (id: string) => {
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) throw createHttpError(404, `Category not found: ${id}`);
  return category;
};

// ── Service functions ─────────────────────────────────────────────────────────

export const getAllCategories = async () => {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
    include: {
      parent: { select: { id: true, name: true } },
      children: { select: { id: true, name: true } },
    },
  });
};

export const getCategoryById = async (id: string) => {
  return assertExists(id);
};

export const createCategory = async (data: CreateCategoryInput) => {
  if (data.parentId) {
    await assertExists(data.parentId);
  }

  return prisma.category.create({ data });
};

export const updateCategory = async (id: string, data: UpdateCategoryInput) => {
  await assertExists(id);

  if (data.parentId) {
    await assertExists(data.parentId);

    // Prevent self-reference
    if (data.parentId === id) {
      throw createHttpError(400, "A category cannot be its own parent");
    }
  }

  return prisma.category.update({ where: { id }, data });
};

export const deleteCategory = async (id: string) => {
  await assertExists(id);
  return prisma.category.delete({ where: { id } });
};
