import { UserPublic } from './user';
import { Task } from './task';

export interface AuthResponse {
  token: string;
  user: UserPublic;
}

export interface RegisterUserRequest {
  email: string;
  password: string;
}

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  dueDate?: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: string;
  dueDate?: string;
}

export interface TaskListResponse {
  tasks: Task[];
}

export interface DeleteTaskResponse {
  success: boolean;
}
