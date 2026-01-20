// shared/dateUtils.ts

export function toISODate(date: Date | string): string {
  if (typeof date === 'string') return date;
  return date.toISOString().split('T')[0];
}

export function toISODateTime(date: Date | string): string {
  if (typeof date === 'string') return date;
  return date.toISOString();
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}
