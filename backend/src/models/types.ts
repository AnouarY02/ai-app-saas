export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  createdAt: Date;
  expiresAt: Date;
}

export interface AIInteraction {
  id: string;
  userId: string;
  input: string;
  output: string;
  createdAt: Date;
}
