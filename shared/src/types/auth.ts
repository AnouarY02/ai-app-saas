// Auth DTOs
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: import('./user').UserPublic;
}

export interface LogoutRequest {}

export interface LogoutResponse {
  success: boolean;
}
