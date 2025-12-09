export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  createdAt: string; // ISO date string
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: string; // ISO date string
  createdAt: string; // ISO date string
}

export interface Setting {
  id: string;
  userId: string;
  key: string;
  value: string;
  updatedAt: string; // ISO date string
}

export interface SettingsList {
  settings: Array<{ key: string; value: string }>;
}

