import { prisma } from "../db";
import createHttpError from "http-errors";

// ── Types ──────────────────────────────────────────────────────────────────────

interface CreateBrandInput {
  name: string;
}

interface UpdateBrandInput {
  name?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const assertExists = async (id: string) => {
  const brand = await prisma.brand.findUnique({ where: { id } });
  if (!brand) throw createHttpError(404, `Brand not found`);
  return brand;
};

// ── Service functions ─────────────────────────────────────────────────────────

export const getAllBrands = async () => {
  return prisma.brand.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, createdAt: true, updatedAt: true },
  });
};

export const getBrandById = async (id: string) => {
  return assertExists(id);
};

export const createBrand = async (data: CreateBrandInput) => {
  const existing = await prisma.brand.findUnique({
    where: { name: data.name },
  });
  if (existing)
    throw createHttpError(409, `Brand already exists: ${data.name}`);

  return prisma.brand.create({ data });
};

export const updateBrand = async (id: string, data: UpdateBrandInput) => {
  await assertExists(id);

  if (data.name) {
    const existing = await prisma.brand.findFirst({
      where: { name: data.name, NOT: { id } },
    });
    if (existing)
      throw createHttpError(409, `Brand name already taken: ${data.name}`);
  }

  return prisma.brand.update({ where: { id }, data });
};

export const deleteBrand = async (id: string) => {
  await assertExists(id);
  return prisma.brand.delete({ where: { id } });
};
