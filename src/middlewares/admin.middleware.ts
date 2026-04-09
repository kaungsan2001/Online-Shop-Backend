import type { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth";
import createHttpError from "http-errors";

export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const session = await auth.api.getSession({ headers: req.headers as any });

  if (!session) {
    throw createHttpError(401, "Unauthorized: No active session");
  }

  const role = (session.user as any).role as string;

  if (role !== "ADMIN" && role !== "SUPERADMIN") {
    throw createHttpError(403, "Forbidden: Admin access required");
  }

  // Attach user to request
  (req as any).user = session.user;

  next();
};
