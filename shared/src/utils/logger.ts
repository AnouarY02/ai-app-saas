// Simple shared logger utility

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface Logger {
  debug: (...args: any[]) => void;
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
}

const prefix = '[ai-app]';

export const logger: Logger = {
  debug: (...args) => {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.debug(prefix, '[DEBUG]', ...args);
    }
  },
  info: (...args) => {
    // eslint-disable-next-line no-console
    console.info(prefix, '[INFO]', ...args);
  },
  warn: (...args) => {
    // eslint-disable-next-line no-console
    console.warn(prefix, '[WARN]', ...args);
  },
  error: (...args) => {
    // eslint-disable-next-line no-console
    console.error(prefix, '[ERROR]', ...args);
  }
};
