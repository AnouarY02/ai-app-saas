// Standard error codes and error response types

export type ErrorCode =
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'VALIDATION_ERROR'
  | 'CONFLICT'
  | 'INTERNAL_ERROR';

export interface ErrorResponse {
  error: ErrorCode;
  message: string;
  details?: unknown;
}
