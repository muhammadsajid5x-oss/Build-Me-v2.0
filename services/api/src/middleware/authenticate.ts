import type { NextFunction, Request, Response } from "express";
import {
  authenticateAccessToken,
  type AuthenticatedUser,
} from "../auth/index.js";
import { createApiError } from "../validators/index.js";
declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

function getBearerToken(request: Request): string | null {
  const authorization = request.header("authorization");

  if (!authorization) {
    return null;
  }

  const parts = authorization.trim().split(/\s+/);

  if (parts.length !== 2) {
    return null;
  }

  const [scheme, token] = parts;

  if (scheme?.toLowerCase() !== "bearer" || !token) {
    return null;
  }

  return token;
}
export async function authenticate(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const accessToken = getBearerToken(request);
  if (!accessToken) {
    response
      .status(401)
      .json(createApiError("UNAUTHORIZED", "Authentication is required."));
    return;
  }
  try {
    const user = await authenticateAccessToken(accessToken);
    if (!user) {
      response
        .status(401)
        .json(createApiError("UNAUTHORIZED", "Authentication is required."));
      return;
    }
    request.user = user;
    next();
  } catch {
    response
      .status(401)
      .json(createApiError("UNAUTHORIZED", "Authentication is required."));
  }
}
