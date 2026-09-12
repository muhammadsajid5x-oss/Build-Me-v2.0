export const PERMISSIONS = {
  AUTHENTICATED: "authenticated",
} as const;
export type Permission =
  (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
