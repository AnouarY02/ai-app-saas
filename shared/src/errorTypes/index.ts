// Shared error types and helpers

export enum SharedErrorCode {
  UNKNOWN = 'UNKNOWN',
  NETWORK = 'NETWORK',
  VALIDATION = 'VALIDATION',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
}

export class SharedError extends Error {
  code: SharedErrorCode;
  details?: unknown;

  constructor(code: SharedErrorCode, message: string, details?: unknown) {
    super(message);
    this.name = 'SharedError';
    this.code = code;
    this.details = details;
  }
}
