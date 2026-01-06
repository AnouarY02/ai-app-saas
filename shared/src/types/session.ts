// shared/src/types/session.ts

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: string; // ISO date string
  createdAt: string; // ISO date string
}
