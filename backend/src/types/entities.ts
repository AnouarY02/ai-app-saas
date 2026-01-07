export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserPublic {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  createdAt: string;
  expiresAt: string;
}

export interface UserSettings {
  id: string;
  userId: string;
  preferences: any;
  createdAt: string;
  updatedAt: string;
}
