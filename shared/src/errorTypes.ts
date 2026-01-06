// Shared error type definitions for ai-app

/**
 * AppErrorCode enumerates possible error codes for the app.
 * Extend as needed when new error cases are introduced.
 */
export enum AppErrorCode {
  UNKNOWN = 'UNKNOWN',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}

/**
 * AppError is a standard error shape for backend/frontend error handling.
 */
export interface AppError {
  code: AppErrorCode;
  message: string;
  details?: unknown;
}
