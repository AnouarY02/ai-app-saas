export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface LogoutRequest {
  token: string;
}

export interface LogoutResponse {
  success: boolean;
}
