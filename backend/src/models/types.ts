export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPublic {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
}

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  createdAt: Date;
  expiresAt: Date;
}

export interface UserSettings {
  id: string;
  userId: string;
  settings: Record<string, any>;
  updatedAt: Date;
}
