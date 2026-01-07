// Simple cross-platform logger utility

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LoggerOptions {
  prefix?: string;
}

export class Logger {
  private prefix: string;

  constructor(options: LoggerOptions = {}) {
    this.prefix = options.prefix ? `[${options.prefix}] ` : '';
  }

  debug(...args: unknown[]) {
    // eslint-disable-next-line no-console
    console.debug(this.prefix + '[DEBUG]', ...args);
  }
  info(...args: unknown[]) {
    // eslint-disable-next-line no-console
    console.info(this.prefix + '[INFO]', ...args);
  }
  warn(...args: unknown[]) {
    // eslint-disable-next-line no-console
    console.warn(this.prefix + '[WARN]', ...args);
  }
  error(...args: unknown[]) {
    // eslint-disable-next-line no-console
    console.error(this.prefix + '[ERROR]', ...args);
  }
}

// Singleton default logger
export const logger = new Logger({ prefix: 'AI-APP' });
