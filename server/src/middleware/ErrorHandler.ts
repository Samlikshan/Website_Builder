// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";

type CustomError = {
  status?: number;
  message: string;
  type?: string;
};

export function errorHandler(
  err: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("Error:", err);

  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  const type = err.type || "server";

  res.status(status).json({ message, type });
}
