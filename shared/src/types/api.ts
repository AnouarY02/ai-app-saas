// shared/src/types/api.ts
import type { User } from './user';
import type { AIRequest } from './aiRequest';

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

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface AIRequestCreate {
  input: string;
}
