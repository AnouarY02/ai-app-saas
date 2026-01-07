export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: { id: string; email: string };
}

export interface LogoutRequest {}
export interface LogoutResponse { success: boolean; }

export interface SessionRequest {}
export interface SessionResponse {
  user: { id: string; email: string };
  expiresAt: Date;
}

export interface DashboardRequest {}
export interface DashboardResponse {
  user: { id: string; email: string };
  features: string[];
}

export interface ApiError {
  error: string;
  details?: any;
}
