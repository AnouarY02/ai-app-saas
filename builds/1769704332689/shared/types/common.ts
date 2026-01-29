export type ApiError = {
  error: string;
  code: string;
  message: string;
  details?: {};
};

export type ApiResponse<T> = {
  data: T;
  meta?: {};
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  pages: number;
};