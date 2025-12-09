export const ERROR_CODES = {
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SESSION_EXPIRED: 'SESSION_EXPIRED',
  DUPLICATE_EMAIL: 'DUPLICATE_EMAIL',
  INVALID_SETTINGS: 'INVALID_SETTINGS',
} as const;

export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];

export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  INVALID_CREDENTIALS: 'Invalid email or password.',
  UNAUTHORIZED: 'Authentication required.',
  FORBIDDEN: 'You do not have permission to access this resource.',
  NOT_FOUND: 'Resource not found.',
  VALIDATION_ERROR: 'One or more fields are invalid.',
  INTERNAL_ERROR: 'An unexpected error occurred.',
  SESSION_EXPIRED: 'Session has expired. Please log in again.',
  DUPLICATE_EMAIL: 'A user with this email already exists.',
  INVALID_SETTINGS: 'Invalid settings payload.'
};

