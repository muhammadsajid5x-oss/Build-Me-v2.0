import type { NextFunction, Request, Response } from "express";
import { createApiError } from "../validators/index.js";
export function errorHandler(
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction,
): void {
  void _next;
  console.error(error);
  if (response.headersSent) {
    return;
  }
  response
    .status(500)
    .json(
      createApiError("INTERNAL_SERVER_ERROR", "An unexpected error occurred."),
    );
}
