// Core domain entities for ai-app-saas

export interface User {
  id: string; // UUID
  email: string;
  passwordHash: string;
  name: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface UserPublic {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  id: string; // UUID
  userId: string; // UUID
  token: string;
  expiresAt: string; // ISO date string
  createdAt: string; // ISO date string
}

export interface UserSettings {
  id: string; // UUID
  userId: string; // UUID
  preferences: Record<string, any>;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
