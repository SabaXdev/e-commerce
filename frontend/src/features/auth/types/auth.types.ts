import { UserRole } from '@/shared/enums';

export type AuthTokenResponse = {
  accessToken: string;
};

export type AuthenticatedUser = {
  userId: string;
  email: string;
  role: UserRole;
};

export type SafeUser = {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string;
};

export type JwtPayload = {
  sub: string;
  email: string;
  role: UserRole;
};

export type Session = {
  accessToken: string;
  user: AuthenticatedUser;
};
