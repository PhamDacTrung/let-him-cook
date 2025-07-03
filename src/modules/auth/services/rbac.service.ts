import {
  EnumRbacAction,
  EnumUserRole,
  ResourceIdentifier,
} from '@common/enums';
import {
  Permission,
  RBAC_ROLES,
  Role,
} from '@common/interfaces/rbac.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RbacService {
  private isResourceMatch(
    resourceA: ResourceIdentifier,
    resourceB: ResourceIdentifier,
  ): boolean {
    // If resource has no ID, it applies to all resources of that type
    if (!resourceA.resourceId) {
      return resourceA.resourceType === resourceB.resourceType;
    }
    // If resource has specific ID, it must match exactly
    return (
      resourceA.resourceType === resourceB.resourceType &&
      resourceA.resourceId === resourceB.resourceId
    );
  }

  private isActionMatch(
    permissionAction: EnumRbacAction,
    targetAction: EnumRbacAction,
  ): boolean {
    // MANAGE action implies all other actions
    if (permissionAction === EnumRbacAction.MANAGE) {
      return true;
    }
    return permissionAction === targetAction;
  }

  private evaluatePermissions(
    permissions: Permission[],
    action: EnumRbacAction,
    resource: ResourceIdentifier,
  ): boolean {
    // First check for explicit denies
    const isDenied = permissions.some(
      (permission) =>
        permission.effect === 'deny' &&
        this.isActionMatch(permission.action, action) &&
        this.isResourceMatch(permission.resource, resource),
    );

    if (isDenied) {
      return false;
    }

    // Then check for allows
    return permissions.some(
      (permission) =>
        permission.effect === 'allow' &&
        this.isActionMatch(permission.action, action) &&
        this.isResourceMatch(permission.resource, resource),
    );
  }

  public canAccess(
    userRole: EnumUserRole,
    action: EnumRbacAction,
    resource: ResourceIdentifier,
  ): boolean {
    const role = RBAC_ROLES[userRole];
    if (!role) {
      return false;
    }

    return this.evaluatePermissions(role.permissions, action, resource);
  }

  public getPermissionsForRole(role: EnumUserRole): Permission[] {
    return RBAC_ROLES[role]?.permissions || [];
  }

  public getRoleByName(roleName: string): Role | undefined {
    return RBAC_ROLES[roleName];
  }
}
