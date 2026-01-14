// Shared user types and interfaces
import { Role } from './roles';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name?: string;
  role: Role;
  createdAt: string; // ISO Date
  updatedAt: string; // ISO Date
}

export interface UserPublic {
  id: string;
  email: string;
  name?: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: UserPublic;
}

export interface DeleteResponse {
  success: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

export interface UpdateUserRequest {
  name?: string;
  role?: Role;
}
