export interface ApiError {
  code: ApiErrorCode;
  message: string;
  details?: unknown;
}

export type ApiErrorCode =
  | 'INVALID_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'INTERNAL_ERROR'
  | 'SESSION_EXPIRED';
