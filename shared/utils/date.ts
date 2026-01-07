// Date formatting and parsing utilities

export function toIsoString(date: Date): string {
  return date.toISOString();
}

export function fromIsoString(iso: string): Date {
  return new Date(iso);
}

export function formatDateShort(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString();
}
