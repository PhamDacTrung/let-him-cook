export enum EnumRbacAction {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  MANAGE = 'manage',
}

export enum EnumRbacResource {
  DISH = 'dish',
  INGREDIENT = 'ingredient',
  USER = 'user',
  VOTE = 'vote',
  SYSTEM = 'system',
  ROLE = 'role',
}

// Type for resource identifiers (can be specific instances)
export interface ResourceIdentifier {
  resourceType: EnumRbacResource;
  resourceId?: string; // '*' for all resources, specific ID, or 'own' for user's own resources
  subResourceType?: EnumRbacResource; // For nested resources
  subResourceId?: string;
}
