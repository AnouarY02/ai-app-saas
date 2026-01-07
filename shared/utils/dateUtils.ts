// Date utilities
export function toIsoString(date: Date | string): string {
  return new Date(date).toISOString();
}

export function formatDate(date: string | Date, locale = 'en-US', options?: Intl.DateTimeFormatOptions): string {
  return new Date(date).toLocaleDateString(locale, options);
}
