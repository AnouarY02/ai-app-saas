import { UserProfile } from './user';

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
  stats?: object;
}

export interface ApiError {
  error: string;
}
