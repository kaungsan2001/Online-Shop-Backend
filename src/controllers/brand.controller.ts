import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as brandService from "../services/brand.service";

export const getBrands = asyncHandler(async (_req: Request, res: Response) => {
  const brands = await brandService.getAllBrands();
  res.json({ success: true, data: brands });
});

export const getBrand = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params["id"] as string;
  const brand = await brandService.getBrandById(id);
  res.json({ success: true, data: brand });
});

export const createBrand = asyncHandler(async (req: Request, res: Response) => {
  const brand = await brandService.createBrand(req.body);
  res.status(201).json({ success: true, data: brand });
});

export const updateBrand = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params["id"] as string;
  const brand = await brandService.updateBrand(id, req.body);
  res.json({ success: true, data: brand });
});

export const deleteBrand = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params["id"] as string;
  await brandService.deleteBrand(id);
  res.json({ success: true, message: "Brand deleted successfully" });
});
