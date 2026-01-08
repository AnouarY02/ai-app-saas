// Shared error codes and error helpers

/**
 * Minimal error code enum for shared use
 */
export enum SharedErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  UNKNOWN = 'UNKNOWN',
}

/**
 * Shared error type
 */
export interface SharedError {
  code: SharedErrorCode;
  message: string;
  details?: any;
}

/**
 * Helper to create a SharedError
 */
export function createSharedError(code: SharedErrorCode, message: string, details?: any): SharedError {
  return { code, message, details };
}
