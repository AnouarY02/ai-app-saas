type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_LEVEL: LogLevel = (process.env.LOG_LEVEL as LogLevel) || 'info';

function shouldLog(level: LogLevel): boolean {
  const levels = ['debug', 'info', 'warn', 'error'];
  return levels.indexOf(level) >= levels.indexOf(LOG_LEVEL);
}

export const logger = {
  debug: (...args: any[]) => shouldLog('debug') && console.debug('[DEBUG]', ...args),
  info: (...args: any[]) => shouldLog('info') && console.info('[INFO]', ...args),
  warn: (...args: any[]) => shouldLog('warn') && console.warn('[WARN]', ...args),
  error: (...args: any[]) => shouldLog('error') && console.error('[ERROR]', ...args)
};
