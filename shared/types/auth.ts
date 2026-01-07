import type { PublicUser } from './user';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: PublicUser;
}

export interface LogoutRequest {}

export interface LogoutResponse {
  success: boolean;
}

export interface SessionRequest {}

export interface SessionResponse {
  user: PublicUser;
  expiresAt: string; // ISO date string
}
