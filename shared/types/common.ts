export type ApiError = {
  error: string;
  code: string;
  message: string;
  details?: Record<string, any>;
};

export type ApiResponse<T> = {
  data: T;
  meta?: Record<string, any>;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  pages: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type StandardResponse = ApiResponse<null>;