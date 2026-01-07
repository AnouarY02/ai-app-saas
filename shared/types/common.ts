// Common/shared types
export interface PaginatedResult<T> {
  items: T[];
  total: number;
}

export interface SuccessResponse {
  success: true;
  message?: string;
}

export interface ErrorResponse {
  error: string;
  code?: string;
  details?: unknown;
}

export interface AuthResponse {
  token: string;
  user: UserSummary;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface DashboardSummary {
  totalContacts: number;
  totalDeals: number;
  totalDealValue: number;
  dealsByStage: Record<string, number>;
}
