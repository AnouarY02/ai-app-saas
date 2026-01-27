export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

export interface LogoutRequest {}

export interface LogoutResponse {
  success: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  createdAt: string;
  lastLoginAt: string;
}

export interface ApiError {
  error: string;
  details?: any;
}
