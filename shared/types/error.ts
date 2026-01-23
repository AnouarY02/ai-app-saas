// API error codes and types

export type ApiErrorCode =
  | 'INVALID_CREDENTIALS'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'VALIDATION_ERROR'
  | 'INTERNAL_ERROR';

export interface ApiError {
  code: ApiErrorCode;
  message: string;
  details?: any;
}
