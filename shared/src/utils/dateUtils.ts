// shared/src/utils/dateUtils.ts

export function toISODate(date: Date | string | number): string {
  return new Date(date).toISOString();
}

export function fromISODate(iso: string): Date {
  return new Date(iso);
}

export function isExpired(iso: string): boolean {
  return new Date(iso).getTime() < Date.now();
}
