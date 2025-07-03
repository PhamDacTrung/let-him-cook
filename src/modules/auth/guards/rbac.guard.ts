import { EnumRbacAction, ResourceIdentifier } from '@common/enums';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RbacService } from '../services/rbac.service';

export const RBAC_KEY = 'rbac';
export interface RbacMetadata {
  action: EnumRbacAction;
  resource: ResourceIdentifier;
}

export const RequirePermission = (
  action: EnumRbacAction,
  resource: ResourceIdentifier,
) => SetMetadata(RBAC_KEY, { action, resource });

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private rbacService: RbacService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const rbacData = this.reflector.getAllAndOverride<RbacMetadata>(RBAC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!rbacData) {
      return true; // No RBAC requirements specified
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user || !user.role) {
      return false; // No user or role information
    }

    return this.rbacService.canAccess(
      user.role,
      rbacData.action,
      rbacData.resource,
    );
  }
}
