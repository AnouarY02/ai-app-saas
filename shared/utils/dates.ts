// Date/time helper utilities
export function toISODate(date: Date | string): string {
  if (typeof date === 'string') return new Date(date).toISOString();
  return date.toISOString();
}

export function isPast(date: Date | string): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.getTime() < Date.now();
}

export function isFuture(date: Date | string): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.getTime() > Date.now();
}

export function formatDate(date: Date | string, locale = 'en-US', opts?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(locale, opts);
}
