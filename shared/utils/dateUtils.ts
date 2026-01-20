// Date formatting and manipulation utils
export function toISO(date: Date | string): string {
  return typeof date === 'string' ? new Date(date).toISOString() : date.toISOString();
}

export function fromISO(iso: string): Date {
  return new Date(iso);
}

export function formatDate(date: Date | string, locale = 'en-US', opts?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(locale, opts);
}

export function formatDateTime(date: Date | string, locale = 'en-US', opts?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString(locale, opts);
}
