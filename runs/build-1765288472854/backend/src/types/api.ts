export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name?: string;
  };
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

export interface LogoutResponse {
  success: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  password?: string;
}

export interface SessionStatus {
  valid: boolean;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}

