// User entity types
export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserPublic {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
}
