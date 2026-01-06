import type { ApiError } from './types/apiError';
import { ERROR_CODES } from './constants';

export class ApiErrorBase extends Error implements ApiError {
  code: string;
  details?: unknown;

  constructor(code: string, message: string, details?: unknown) {
    super(message);
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, ApiErrorBase.prototype);
  }
}

export class UnauthorizedError extends ApiErrorBase {
  constructor(message = 'Unauthorized', details?: unknown) {
    super(ERROR_CODES.UNAUTHORIZED, message, details);
  }
}

export class InvalidInputError extends ApiErrorBase {
  constructor(message = 'Invalid input', details?: unknown) {
    super(ERROR_CODES.INVALID_INPUT, message, details);
  }
}

export class NotFoundError extends ApiErrorBase {
  constructor(message = 'Not found', details?: unknown) {
    super(ERROR_CODES.NOT_FOUND, message, details);
  }
}

export class InternalError extends ApiErrorBase {
  constructor(message = 'Internal server error', details?: unknown) {
    super(ERROR_CODES.INTERNAL_ERROR, message, details);
  }
}

export class SessionExpiredError extends ApiErrorBase {
  constructor(message = 'Session expired', details?: unknown) {
    super(ERROR_CODES.SESSION_EXPIRED, message, details);
  }
}
