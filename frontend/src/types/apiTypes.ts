export interface User {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface LogoutRequest {}
export interface LogoutResponse {
  success: boolean;
}

export interface UpdateSettingsRequest {
  email?: string;
  password?: string;
}

export type AIRequestStatus = 'pending' | 'completed' | 'failed';

export interface AIRequest {
  id: string;
  userId: string;
  input: string;
  output: string;
  status: AIRequestStatus;
  createdAt: string;
  updatedAt: string;
}

export interface APIError {
  message: string;
  code?: string | number;
}
