import { UserRole } from '../../../common/enums';

export type JwtPayload = {
  sub: string;
  email: string;
  role: UserRole;
};

export type AuthenticatedUser = {
  userId: string;
  email: string;
  role: UserRole;
};

export type AuthTokenResponse = {
  accessToken: string;
};
