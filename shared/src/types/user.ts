// User entity (internal, sensitive fields)
export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  createdAt: string; // ISO8601
  updatedAt: string; // ISO8601
}

// UserPublic: safe for client exposure
export interface UserPublic {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
