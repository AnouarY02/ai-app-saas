// Shared API types

/**
 * Health check status response type
 */
export type ApiHealthStatus = {
  status: string;
};

/**
 * Empty object type for endpoints that expect no request body
 */
export type EmptyObject = Record<string, never>;
