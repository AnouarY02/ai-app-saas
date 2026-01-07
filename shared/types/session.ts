export interface Session {
  id: string;
  userId: string;
  token: string;
  createdAt: string; // ISO date string
  expiresAt: string; // ISO date string
}
