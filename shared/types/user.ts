export interface User {
  id: string;
  email: string;
  passwordHash?: string; // Only present on backend
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  lastLoginAt?: string; // ISO date string
}

export type PublicUser = Pick<User, 'id' | 'email'>;
