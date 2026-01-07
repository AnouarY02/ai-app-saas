// Standard API error codes and helpers
export const ApiErrorCodes = {
  INVALID_INPUT: 'INVALID_INPUT',
  AUTH_REQUIRED: 'AUTH_REQUIRED',
  NOT_FOUND: 'NOT_FOUND',
  EMAIL_EXISTS: 'EMAIL_EXISTS',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  FORBIDDEN: 'FORBIDDEN',
  SERVER_ERROR: 'SERVER_ERROR',
} as const;

export type ApiErrorCode = typeof ApiErrorCodes[keyof typeof ApiErrorCodes];

export function createApiError(code: ApiErrorCode, message: string, details?: unknown) {
  return { code, message, details };
}
