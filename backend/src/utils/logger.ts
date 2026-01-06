export const logger = {
  info: (...args: any[]) => {
    if (process.env.LOG_LEVEL !== 'error') {
      console.log('[INFO]', ...args);
    }
  },
  error: (...args: any[]) => {
    console.error('[ERROR]', ...args);
  }
};
