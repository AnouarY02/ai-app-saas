// User domain types
export interface User {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}

export interface UserPublic {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
