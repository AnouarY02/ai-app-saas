export type User = {
  id: string;
  email: string;
  passwordHash?: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Session = {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
};

export type AuthResponse = {
  user: Omit<User, 'passwordHash'>;
  token: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  name?: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LogoutRequest = {
  token: string;
};

export type UpdateProfileRequest = {
  name?: string;
  email?: string;
  password?: string;
};

export type UserProfile = {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
};

export type SuccessResponse = {
  success: boolean;
};

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email: string };
      token?: string;
    }
  }
}
