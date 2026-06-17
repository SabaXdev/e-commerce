import { UserRole } from '../../../common/enums';

export class User {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
}
