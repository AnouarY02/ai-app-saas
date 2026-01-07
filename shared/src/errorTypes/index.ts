// Error code and error class definitions

export type ErrorCode =
  | 'UNAUTHORIZED'
  | 'INVALID_INPUT'
  | 'NOT_FOUND'
  | 'INTERNAL_ERROR'
  | 'SESSION_EXPIRED';

export class ApiError extends Error {
  code: ErrorCode;
  details?: unknown;

  constructor(code: ErrorCode, message: string, details?: unknown) {
    super(message);
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
