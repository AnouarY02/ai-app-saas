// Shared error types and error codes

/**
 * Standard error codes for API and internal use
 */
export enum ErrorCode {
  UNKNOWN = 'UNKNOWN',
  VALIDATION_FAILED = 'VALIDATION_FAILED',
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}

/**
 * Shared error shape for API responses
 */
export interface ApiError {
  code: ErrorCode;
  message: string;
  details?: unknown;
}

/**
 * Helper to create an ApiError object
 */
export function createApiError(
  code: ErrorCode,
  message: string,
  details?: unknown
): ApiError {
  return { code, message, details };
}
