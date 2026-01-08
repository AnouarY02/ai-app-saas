function timestamp() {
  return new Date().toISOString();
}

export function logInfo(...args: any[]) {
  console.log(`[INFO] [${timestamp()}]`, ...args);
}

export function logError(...args: any[]) {
  console.error(`[ERROR] [${timestamp()}]`, ...args);
}
