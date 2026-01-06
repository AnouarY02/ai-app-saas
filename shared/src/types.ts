// Shared type definitions for ai-app

/**
 * HealthStatus represents the possible values for the health check endpoint.
 */
export type HealthStatus = 'ok' | 'error';

/**
 * EmptyObject is used for endpoints that expect or return an empty object.
 */
export type EmptyObject = Record<string, never>;
