// Auth
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: import('./domain').UserProfile;
}

export interface LogoutRequest {}
export interface LogoutResponse {
  success: boolean;
}

// Profile
export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  password?: string;
}

// Settings
export interface UpdateSettingsRequest {
  settings: Array<{ key: string; value: string }>;
}

