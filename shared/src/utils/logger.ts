// Simple shared logger
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_LEVELS: LogLevel[] = ['debug', 'info', 'warn', 'error'];

let currentLevel: LogLevel = process.env.LOG_LEVEL as LogLevel || 'info';

export function setLogLevel(level: LogLevel) {
  if (LOG_LEVELS.includes(level)) {
    currentLevel = level;
  }
}

function shouldLog(level: LogLevel) {
  return LOG_LEVELS.indexOf(level) >= LOG_LEVELS.indexOf(currentLevel);
}

export const logger = {
  debug: (...args: unknown[]) => shouldLog('debug') && console.debug('[DEBUG]', ...args),
  info: (...args: unknown[]) => shouldLog('info') && console.info('[INFO]', ...args),
  warn: (...args: unknown[]) => shouldLog('warn') && console.warn('[WARN]', ...args),
  error: (...args: unknown[]) => shouldLog('error') && console.error('[ERROR]', ...args),
};
