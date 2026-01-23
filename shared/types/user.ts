// User and related types for TestApp

export type UUID = string;

export interface User {
  id: UUID;
  email: string;
  hashed_password: string;
  full_name: string;
  is_active: boolean;
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
}

export interface UserProfile {
  id: UUID;
  email: string;
  full_name: string;
  is_active: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: UserProfile;
}

export interface LogoutResponse {
  success: boolean;
}

export interface DashboardData {
  user: UserProfile;
  stats?: Record<string, any>;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}
