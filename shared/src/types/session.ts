export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: string; // ISO8601
  createdAt: string; // ISO8601
}

export interface SessionStatus {
  valid: boolean;
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
}
