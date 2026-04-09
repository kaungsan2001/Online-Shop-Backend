import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as categoryService from "../services/category.service";

export const getCategories = asyncHandler(
  async (_req: Request, res: Response) => {
    const categories = await categoryService.getAllCategories();
    res.json({ success: true, data: categories });
  },
);

export const getCategory = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params["id"] as string;
  const category = await categoryService.getCategoryById(id);
  res.json({ success: true, data: category });
});

export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json({ success: true, data: category });
  },
);

export const updateCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params["id"] as string;
    const category = await categoryService.updateCategory(id, req.body);
    res.json({ success: true, data: category });
  },
);

export const deleteCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params["id"] as string;
    await categoryService.deleteCategory(id);
    res.json({ success: true, message: "Category deleted successfully" });
  },
);
