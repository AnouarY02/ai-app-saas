export interface User {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface AIRequest {
  id: string;
  userId: string;
  input: string;
  output: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: Omit<User, 'passwordHash'>;
}

export interface LogoutRequest {}
export interface LogoutResponse { success: boolean; }

export interface UpdateSettingsRequest {
  email?: string;
  password?: string;
}

export interface APIError {
  error: string;
  details?: any;
}

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email: string };
    }
  }
}
