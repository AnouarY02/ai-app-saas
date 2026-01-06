// shared/src/errorTypes.ts

/**
 * Error codes used across the app for consistency.
 */
export enum ErrorCode {
  UNKNOWN = 'UNKNOWN',
  INVALID_CONFIG = 'INVALID_CONFIG',
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}

/**
 * AppError: Custom error class for shared error handling.
 */
export class AppError extends Error {
  code: ErrorCode;
  status?: number;

  constructor(message: string, code: ErrorCode = ErrorCode.UNKNOWN, status?: number) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.status = status;
  }
}
