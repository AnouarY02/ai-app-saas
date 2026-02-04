export const API_ROUTES = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    REFRESH: '/api/auth/refresh',
    LOGOUT: '/api/auth/logout',
  },
  USERS: {
    GET: (id: string) => `/api/users/${id}`,
    UPDATE: (id: string) => `/api/users/${id}`,
  },
  INSIGHTS: {
    LIST: '/api/insights',
  },
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const ERROR_MESSAGES = {
  REQUIRED_FIELD: (field: string) => `${field} is required`,
  INVALID_EMAIL: 'Invalid email format',
  INVALID_PASSWORD: 'Password must be at least 8 characters',
  UNAUTHORIZED: 'You must be logged in to perform this action',
  FORBIDDEN: 'You do not have permission to perform this action',
  NOT_FOUND: (resource: string) => `${resource} not found`,
  ALREADY_EXISTS: (resource: string) => `${resource} already exists`,
  INTERNAL_ERROR: 'An unexpected error occurred',
} as const;

export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 10,
  MAX_LIMIT: 100,
} as const;
