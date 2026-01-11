// Shared utility functions for both frontend and backend

/**
 * Returns true if the value is neither null nor undefined.
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Returns a deep clone of the provided object.
 * Note: Only works for JSON-serializable data.
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * No-op function, useful as a default callback.
 */
export function noop(): void {}
