export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshRequest {
  userId: string;
}

export interface LogoutRequest {
  userId: string;
}

export interface AuthResponse {
  token: string;
}