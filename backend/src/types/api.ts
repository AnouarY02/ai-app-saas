import { UserPublic } from '../models/User';
import { Task } from '../models/Task';

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UpdateProfileRequest {
  name?: string;
  password?: string;
}

export interface AuthResponse {
  token: string;
  user: UserPublic;
}

export interface SuccessResponse {
  message: string;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  dueDate?: Date;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: string;
  dueDate?: Date;
}

export interface QueryParams {
  status?: string;
  dueDate?: string;
}

export interface PathParams {
  id: string;
}
