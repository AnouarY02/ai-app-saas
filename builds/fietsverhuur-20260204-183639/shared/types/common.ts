export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  error: string;
  code?: string;
  message?: string;
  details?: Record<string, any>;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface ListQueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
}

export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type ApiEndpoint = string;

export interface RequestConfig {
  method: ApiMethod;
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string>;
  query?: Record<string, any>;
}
