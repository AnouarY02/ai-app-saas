// User entity type
import type { ID } from './common';
import { UserRole } from '../constants/roles';

export type User = {
  id: ID;
  name: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
};

export type Session = {
  user: User;
  token: string;
  expiresAt: string; // ISO string
};
