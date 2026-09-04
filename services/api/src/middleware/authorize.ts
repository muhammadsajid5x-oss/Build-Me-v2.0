import type { NextFunction, Request, Response } from "express";
import {
  createApiError,
} from "../validators/index.js";
import {
  PERMISSIONS,
  type Permission,
} from "../permissions/index.js";
export function authorize(
  permission: Permission,
) {
  return (
    request: Request,
    response: Response,
    next: NextFunction,
  ): void => {
    if (!request.user) {
      response.status(401).json(
        createApiError(
          "UNAUTHORIZED",
          "Authentication is required.",
        ),
      );
      return;
    }
    if (permission === PERMISSIONS.AUTHENTICATED) {
      next();
      return;
    }
    response.status(403).json(
      createApiError(
        "FORBIDDEN",
        "You do not have permission to access this resource.",
      ),
    );
  };
}
