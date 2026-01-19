// shared/utils/format.ts
// Formatting helpers (dates, names, etc.)

export function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleString();
}

export function formatUserName(name?: string, email?: string): string {
  if (name && name.trim()) return name;
  if (email) return email.split('@')[0];
  return 'User';
}
