// Shared error codes and types
export enum ErrorCode {
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  CONFLICT = 'CONFLICT',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}

export class AppError extends Error {
  code: ErrorCode;
  status: number;
  details?: any;

  constructor(code: ErrorCode, message: string, status = 400, details?: any) {
    super(message);
    this.code = code;
    this.status = status;
    this.details = details;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
