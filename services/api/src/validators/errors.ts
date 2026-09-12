export type ApiErrorDetail = {
  field?: string;
  message: string;
};
export type ApiErrorResponse = {
  error: {
    code: string;
    message: string;
    details?: ApiErrorDetail[];
  };
};
export const API_ERROR_CODES = {
  BAD_REQUEST: "BAD_REQUEST",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  CONFLICT: "CONFLICT",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
} as const;
export function createValidationError(
  details: ApiErrorDetail[],
): ApiErrorResponse {
  return {
    error: {
      code: API_ERROR_CODES.VALIDATION_ERROR,
      message: "The request contains invalid fields.",
      details,
    },
  };
}
export function createApiError(
  code: string,
  message: string,
): ApiErrorResponse {
  return {
    error: {
      code,
      message,
    },
  };
}
