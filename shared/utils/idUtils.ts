// ID generation utilities
export function generateId(prefix = ''): string {
  return (
    prefix +
    Math.random().toString(36).slice(2, 10) +
    Date.now().toString(36)
  );
}

export function isValidId(id: string): boolean {
  return typeof id === 'string' && id.length > 0;
}
