import { EnumUserRole } from '@common/enums';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'role';
export const Roles = (...roles: EnumUserRole[]) =>
  SetMetadata(ROLES_KEY, roles);
