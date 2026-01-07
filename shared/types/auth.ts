// Auth types
import type { UserPublic } from './user';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: UserPublic;
}

export interface SuccessResponse {
  success: true;
  message?: string;
}
