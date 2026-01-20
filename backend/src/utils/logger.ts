export function logWithTimestamp(message: string) {
  const now = new Date().toISOString();
  // eslint-disable-next-line no-console
  console.log(`[${now}] ${message}`);
}
