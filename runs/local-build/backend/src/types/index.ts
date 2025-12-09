export type User = {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserProfile = {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
};

export type Session = {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
};

export type Setting = {
  id: string;
  userId: string;
  key: string;
  value: string;
  updatedAt: Date;
};

export type SettingsList = {
  settings: { key: string; value: string }[];
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: UserProfile;
};

export type LogoutRequest = {};

export type LogoutResponse = {
  success: boolean;
};

export type UpdateProfileRequest = {
  name?: string;
  email?: string;
  password?: string;
};

export type UpdateSettingsRequest = {
  settings: { key: string; value: string }[];
};

export type ApiError = {
  error: string;
};

// Express user augmentation
declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email: string; name: string };
    }
  }
}

