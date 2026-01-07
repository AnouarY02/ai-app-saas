// User entity types
export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name?: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface UserPublic {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
}
