export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface RegisterResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface GetMeResponse {
  data: User;
}

export interface LogoutResponse {
  message: string;
}

export interface RefreshRequest {
  refreshToken: string;
}

export interface RefreshResponse {
  accessToken: string;
}

export interface GetUsersResponse {
  data: User[];
}

export interface GetUserResponse {
  data: User;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface CreateUserResponse {
  data: User;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: 'user' | 'admin';
}

export interface UpdateUserResponse {
  data: User;
}

export interface DeleteUserResponse {
  message: string;
}

export interface GetInsightsResponse {
  data: Insight[];
}

export interface GetInsightResponse {
  data: Insight;
}

export interface CreateInsightRequest {
  title: string;
  content: string;
}

export interface CreateInsightResponse {
  data: Insight;
}

export interface UpdateInsightRequest {
  title?: string;
  content?: string;
}

export interface UpdateInsightResponse {
  data: Insight;
}

export interface DeleteInsightResponse {
  message: string;
}
