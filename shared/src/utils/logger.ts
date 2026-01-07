// Minimal shared logger utility
import { DEFAULT_LOG_LEVEL } from '../config/constants';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const levelPriority: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

export interface LoggerOptions {
  level?: LogLevel;
  prefix?: string;
}

export class Logger {
  private level: LogLevel;
  private prefix: string;

  constructor(options: LoggerOptions = {}) {
    this.level = options.level || DEFAULT_LOG_LEVEL;
    this.prefix = options.prefix ? `[${options.prefix}] ` : '';
  }

  private shouldLog(level: LogLevel) {
    return levelPriority[level] >= levelPriority[this.level];
  }

  debug(...args: unknown[]) {
    if (this.shouldLog('debug')) {
      // eslint-disable-next-line no-console
      console.debug(this.prefix + '[DEBUG]', ...args);
    }
  }
  info(...args: unknown[]) {
    if (this.shouldLog('info')) {
      // eslint-disable-next-line no-console
      console.info(this.prefix + '[INFO]', ...args);
    }
  }
  warn(...args: unknown[]) {
    if (this.shouldLog('warn')) {
      // eslint-disable-next-line no-console
      console.warn(this.prefix + '[WARN]', ...args);
    }
  }
  error(...args: unknown[]) {
    if (this.shouldLog('error')) {
      // eslint-disable-next-line no-console
      console.error(this.prefix + '[ERROR]', ...args);
    }
  }
}

// Default logger instance
export const logger = new Logger();
