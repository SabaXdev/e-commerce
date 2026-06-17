import { UserRole } from '../../../common/enums';

export type SafeUser = {
  id: string;
  email: string;
  role: UserRole;
  createdAt: Date;
};
