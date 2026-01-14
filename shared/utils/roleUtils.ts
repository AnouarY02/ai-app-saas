// Role-based access helpers
import { Role, Roles } from '../types/roles';

export function isAdmin(role: Role): boolean {
  return role === Roles.ADMIN;
}

export function canManageCourts(role: Role): boolean {
  return isAdmin(role);
}

export function canManageUsers(role: Role): boolean {
  return isAdmin(role);
}

export function canBookCourt(role: Role): boolean {
  return role === Roles.USER || role === Roles.ADMIN;
}
