// Shared date utility functions
/**
 * Returns an ISO string for the current date/time (UTC).
 */
export function nowIso(): string {
  return new Date().toISOString();
}

/**
 * Formats an ISO date string as a human-readable date (YYYY-MM-DD).
 */
export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toISOString().slice(0, 10);
}

/**
 * Returns true if the given ISO date string is in the past.
 */
export function isPast(iso: string): boolean {
  return new Date(iso).getTime() < Date.now();
}
