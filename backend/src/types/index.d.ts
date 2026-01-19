import { User as DBUser } from '../models/User';
import { Session as DBSession } from '../models/Session';

export interface SignupRequest {
  email: string;
  password: string;
  name?: string;
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

export interface AuthResponse {
  user: Omit<DBUser, 'password_hash'>;
  token: string;
}

export interface SuccessResponse {
  success: boolean;
}

export interface ApiError {
  error: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}
