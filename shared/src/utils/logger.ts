type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_LEVELS: LogLevel[] = ['debug', 'info', 'warn', 'error'];

function getLogLevel(): LogLevel {
  if (typeof process !== 'undefined' && process.env && process.env.LOG_LEVEL) {
    const lvl = process.env.LOG_LEVEL.toLowerCase();
    if (LOG_LEVELS.includes(lvl as LogLevel)) return lvl as LogLevel;
  }
  return 'info';
}

const currentLevel = getLogLevel();

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS.indexOf(level) >= LOG_LEVELS.indexOf(currentLevel);
}

export const logger = {
  debug: (...args: any[]) => shouldLog('debug') && console.debug('[DEBUG]', ...args),
  info: (...args: any[]) => shouldLog('info') && console.info('[INFO]', ...args),
  warn: (...args: any[]) => shouldLog('warn') && console.warn('[WARN]', ...args),
  error: (...args: any[]) => shouldLog('error') && console.error('[ERROR]', ...args),
};
