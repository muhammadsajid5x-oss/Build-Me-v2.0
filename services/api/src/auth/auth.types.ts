export type AuthenticatedUser = {
  id: string;
  email?: string;
};
export type AuthContext = {
  user: AuthenticatedUser;
  accessToken: string;
};
