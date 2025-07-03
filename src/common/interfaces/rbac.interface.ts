import {
  EnumRbacAction,
  EnumRbacResource,
  ResourceIdentifier,
} from '@common/enums';

export interface Permission {
  action: EnumRbacAction;
  resource: ResourceIdentifier;
  effect: 'allow' | 'deny';
}

export interface Role {
  name: string;
  description?: string;
  permissions: Permission[];
}

// Predefined roles with their permissions
export const RBAC_ROLES: { [key: string]: Role } = {
  ADMIN: {
    name: 'Admin',
    description: 'Full system access',
    permissions: [
      {
        action: EnumRbacAction.MANAGE,
        resource: { resourceType: EnumRbacResource.SYSTEM },
        effect: 'allow',
      },
      // This permission allows all actions on all resources
      {
        action: EnumRbacAction.MANAGE,
        resource: { resourceType: EnumRbacResource.ROLE },
        effect: 'allow',
      },
    ],
  },
  USER: {
    name: 'User',
    description: 'Regular user access',
    permissions: [
      // Dish permissions
      {
        action: EnumRbacAction.READ,
        resource: { resourceType: EnumRbacResource.DISH },
        effect: 'allow',
      },
      {
        action: EnumRbacAction.LIST,
        resource: { resourceType: EnumRbacResource.DISH },
        effect: 'allow',
      },
      // Vote permissions
      {
        action: EnumRbacAction.CREATE,
        resource: { resourceType: EnumRbacResource.VOTE },
        effect: 'allow',
      },
      {
        action: EnumRbacAction.UPDATE,
        resource: { resourceType: EnumRbacResource.VOTE },
        effect: 'allow',
      },
      {
        action: EnumRbacAction.DELETE,
        resource: { resourceType: EnumRbacResource.VOTE },
        effect: 'allow',
      },
      // User self-management
      {
        action: EnumRbacAction.READ,
        resource: { resourceType: EnumRbacResource.USER },
        effect: 'allow',
      },
      // Deny system management
      {
        action: EnumRbacAction.MANAGE,
        resource: { resourceType: EnumRbacResource.SYSTEM },
        effect: 'deny',
      },
    ],
  },
};
