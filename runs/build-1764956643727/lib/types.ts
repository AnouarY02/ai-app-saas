export interface User {
  id: string;
  email: string;
  name?: string;
  passwordHash: string;
  createdAt: Date;
}

export interface Session {
  sessionId: string;
  userId: string;
  expiresAt: Date;
}

export interface Prompt {
  id: string;
  userId: string;
  input: string;
  output?: string;
  createdAt: Date;
}

