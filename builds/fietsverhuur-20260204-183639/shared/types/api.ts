// POST /api/auth/register
export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface UserResponse {
  data: User;
}

// POST /api/auth/login
export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// POST /api/auth/refresh
export interface RefreshRequest {
  token: string;
}

// POST /api/auth/logout
export interface LogoutRequest {
  token: string;
}

export interface LogoutResponse {
  message: string;
}

// GET /api/users/:id
export interface GetUserRequest {
  id: string;
}

// PATCH /api/users/:id
export interface UpdateUserRequest {
  email?: string;
  name?: string;
}

// GET /api/insights
export interface GetInsightsRequest {
  userId: string;
}

export interface InsightsResponse {
  data: Insight[];
}
