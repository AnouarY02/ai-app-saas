// Shared utility functions

/**
 * Returns the current timestamp as ISO string
 */
export function getIsoTimestamp(): string {
  return new Date().toISOString();
}

/**
 * Simple logger for debugging (logs to console with timestamp)
 */
export function logWithTimestamp(...args: any[]): void {
  // eslint-disable-next-line no-console
  console.log(`[${getIsoTimestamp()}]`, ...args);
}
