// Common/shared types

export type ID = string;

export type PaginatedResult<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};

export type SuccessResponse = {
  success: true;
  message?: string;
};

export type ApiError = {
  error: string;
  message?: string;
  code?: string | number;
};
