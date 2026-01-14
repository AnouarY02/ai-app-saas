// User roles and access levels
import { Roles } from '../types/roles';

export const ROLE_LABELS: Record<string, string> = {
  [Roles.USER]: 'User',
  [Roles.ADMIN]: 'Admin',
};

export const ADMIN_ROUTES = ['/admin', '/courts'];
