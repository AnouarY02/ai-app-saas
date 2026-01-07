// Date utilities
export function toIsoString(date: Date | string): string {
  return (typeof date === 'string' ? new Date(date) : date).toISOString();
}

export function formatDate(date: Date | string, locale = 'en-US'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(locale);
}
