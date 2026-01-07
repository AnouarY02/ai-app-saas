// shared/src/errors/errorTypes.ts

export enum ErrorCode {
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  CONFLICT = 'CONFLICT',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  BAD_REQUEST = 'BAD_REQUEST',
}

export class AppError extends Error {
  code: ErrorCode;
  details?: unknown;
  status?: number;

  constructor(message: string, code: ErrorCode, status?: number, details?: unknown) {
    super(message);
    this.code = code;
    this.status = status;
    this.details = details;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
