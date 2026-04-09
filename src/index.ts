import express from "express";
import type { Request, Response, NextFunction } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import dotenv from "dotenv";
import cors from "cors";
import { isHttpError } from "http-errors";
import categoryRouter from "./routes/v1/category.route";

dotenv.config();
const app = express();
const port = 8000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json());

// ── Routes ─────────────────────────────────────────────────────────────────
app.use("/api/v1/categories", categoryRouter);

// ── Global Error Handler ───────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);

  if (isHttpError(err)) {
    res.status(err.status).json({
      success: false,
      message: err.message,
      // Include extra data (e.g. validation errors) when present
      ...(err.errors ? { errors: err.errors } : {}),
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
