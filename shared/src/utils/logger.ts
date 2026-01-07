// shared/src/utils/logger.ts

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_LEVELS: LogLevel[] = ['debug', 'info', 'warn', 'error'];

function getLogLevel(): LogLevel {
  if (typeof process !== 'undefined' && process.env && process.env.LOG_LEVEL) {
    const envLevel = process.env.LOG_LEVEL.toLowerCase();
    if (LOG_LEVELS.includes(envLevel as LogLevel)) {
      return envLevel as LogLevel;
    }
  }
  return 'info';
}

const currentLevel = getLogLevel();

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS.indexOf(level) >= LOG_LEVELS.indexOf(currentLevel);
}

export const logger = {
  debug: (...args: unknown[]) => shouldLog('debug') && console.debug('[DEBUG]', ...args),
  info: (...args: unknown[]) => shouldLog('info') && console.info('[INFO]', ...args),
  warn: (...args: unknown[]) => shouldLog('warn') && console.warn('[WARN]', ...args),
  error: (...args: unknown[]) => shouldLog('error') && console.error('[ERROR]', ...args),
};
