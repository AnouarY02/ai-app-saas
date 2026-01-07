// Session for authentication
export interface Session {
  id: string;
  userId: string;
  token: string;
  createdAt: string; // ISO8601
  expiresAt: string; // ISO8601
}
