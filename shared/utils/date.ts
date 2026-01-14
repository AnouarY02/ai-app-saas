// Date manipulation and helper functions
export function toISO(date: Date | string): string {
  return new Date(date).toISOString();
}

export function isOverlap(
  startA: string,
  endA: string,
  startB: string,
  endB: string
): boolean {
  return new Date(startA) < new Date(endB) && new Date(startB) < new Date(endA);
}

export function isFuture(date: string): boolean {
  return new Date(date) > new Date();
}

export function formatDate(date: string | Date, locale = 'en-US') {
  return new Date(date).toLocaleDateString(locale);
}

export function formatTime(date: string | Date, locale = 'en-US') {
  return new Date(date).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
}
