// shared/types/user.ts

export interface User {
  id: string;
  email: string;
  full_name: string;
  created_at: string; // ISO8601
  updated_at: string; // ISO8601
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  updated_at: string;
}

export interface UserAuthToken {
  access_token: string;
  token_type: 'bearer';
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface UserSignupRequest {
  email: string;
  password: string;
  full_name: string;
}

export interface UserProfileUpdateRequest {
  full_name?: string;
  password?: string;
}
