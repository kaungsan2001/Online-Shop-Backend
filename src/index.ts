import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import dotenv from "dotenv";
import cors from "cors";

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
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
