// shared/types.ts

export type UUID = string;
export type ISODate = string; // ISO 8601 format

export interface User {
  id: UUID;
  email: string;
  passwordHash: string;
  createdAt: ISODate;
  updatedAt: ISODate;
  lastLoginAt: ISODate;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: UUID;
    email: string;
  };
}

export interface LogoutRequest {
  // No fields required for logout
}

export interface LogoutResponse {
  success: boolean;
}

export interface UserProfile {
  id: UUID;
  email: string;
  createdAt: ISODate;
  lastLoginAt: ISODate;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}
