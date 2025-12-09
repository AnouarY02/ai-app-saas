export function toIsoString(date: Date | string): string {
  if (typeof date === 'string') return date;
  return date.toISOString();
}

export function fromIsoString(iso: string): Date {
  return new Date(iso);
}

export function isExpired(iso: string): boolean {
  return new Date(iso).getTime() < Date.now();
}

