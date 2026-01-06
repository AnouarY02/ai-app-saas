// Shared utility functions for ai-app

/**
 * isEmptyObject checks if the provided value is a plain empty object.
 */
export function isEmptyObject(obj: unknown): obj is Record<string, never> {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    Object.keys(obj).length === 0 &&
    obj.constructor === Object
  );
}

/**
 * safeJsonParse attempts to parse a string as JSON, returning undefined if parsing fails.
 */
export function safeJsonParse<T = unknown>(input: string): T | undefined {
  try {
    return JSON.parse(input) as T;
  } catch {
    return undefined;
  }
}
