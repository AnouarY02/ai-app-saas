// User roles and permissions
defineRoleEnum();

export type Role = 'user' | 'admin';

export const Roles = {
  USER: 'user' as Role,
  ADMIN: 'admin' as Role,
};
