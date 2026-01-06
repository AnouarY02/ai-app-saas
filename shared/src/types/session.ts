export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: string; // ISO string
  createdAt: string; // ISO string
}
