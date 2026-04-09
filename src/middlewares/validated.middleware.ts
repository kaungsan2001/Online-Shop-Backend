import type { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";

export const validateRequest = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw createHttpError(422, "Validation failed", {
      errors: errors.array(),
    });
  }

  next();
};
