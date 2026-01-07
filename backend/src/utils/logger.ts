export function logInfo(...args: any[]) {
  console.log(`[${new Date().toISOString()}] [INFO]`, ...args);
}

export function logError(...args: any[]) {
  console.error(`[${new Date().toISOString()}] [ERROR]`, ...args);
}
