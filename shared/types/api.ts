// shared/types/api.ts
// API request/response types
import type { User } from './models';

export interface SignupRequest {
  email: string;
  password: string;
  name?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LogoutRequest {
  token: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface SuccessResponse {
  success: boolean;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}
