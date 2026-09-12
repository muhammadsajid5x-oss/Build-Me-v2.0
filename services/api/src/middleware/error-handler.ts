import type { NextFunction, Request, Response } from "express";
import { createApiError } from "../validators/index.js";

export function errorHandler(
  error: unknown,
  _request: Request,
  response: Response,
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  _next: NextFunction,
): void {
  if (response.headersSent) {
    return;
  }

  if (error instanceof Error && error.message === "NOT_FOUND") {
    response
      .status(404)
      .json(
        createApiError("NOT_FOUND", "The requested resource was not found."),
      );
    return;
  }

  console.error(error);

  response
    .status(500)
    .json(
      createApiError("INTERNAL_SERVER_ERROR", "An unexpected error occurred."),
    );
}
