// API request/response types
import type { UserPublic, UserProfile } from './user';
import type { UserSettings } from './userSettings';

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: UserPublic;
}

export interface LogoutRequest {}

export interface SuccessResponse {
  success: boolean;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  password?: string;
}

export interface UpdateUserSettingsRequest {
  settings: Record<string, unknown>;
}
