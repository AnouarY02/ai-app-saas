// shared/src/types/api.ts
import type { User } from './user';
import type { AIInteraction } from './aiInteraction';

export interface AuthResponse {
  user: User;
  token: string;
}

export interface SuccessResponse {
  success: boolean;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
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

export interface AIInteractionRequest {
  input: string;
}

export interface AIInteractionResponse {
  output: string;
  interaction: AIInteraction;
}

export interface AIInteractionHistoryResponse {
  interactions: AIInteraction[];
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
}

export interface ErrorResponse {
  error: string;
  code?: string;
  details?: unknown;
}
