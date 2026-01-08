// User domain types
export interface User {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface UserPublic {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
