import type { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth";
import createHttpError from "http-errors";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const session = await auth.api.getSession({ headers: req.headers as any });

  if (!session) {
    throw createHttpError(401, "Unauthorized: No active session");
  }

  // Attach user to request for downstream use
  (req as any).user = session.user;

  next();
};
