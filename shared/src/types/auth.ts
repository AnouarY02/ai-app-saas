import type { User } from './user';

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface LogoutRequest {
  token: string;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  password?: string;
}

export interface SuccessResponse {
  success: boolean;
}
