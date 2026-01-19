// shared/types/models.ts
// Core shared model types for User and Session

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: string; // ISO timestamp
  createdAt: string; // ISO timestamp
}
