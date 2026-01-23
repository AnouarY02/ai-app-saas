// User-related shared types
export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name?: string;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}

export interface UserPublic {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
}
