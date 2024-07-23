import { UserRole } from '@enums';

export interface AuthPayload {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
