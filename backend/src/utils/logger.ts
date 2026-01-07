export const logger = {
  info: (msg: string, meta?: any) => {
    // eslint-disable-next-line no-console
    console.log(`[INFO] ${msg}`, meta || '');
  },
  warn: (msg: string, meta?: any) => {
    // eslint-disable-next-line no-console
    console.warn(`[WARN] ${msg}`, meta || '');
  },
  error: (msg: string, meta?: any) => {
    // eslint-disable-next-line no-console
    console.error(`[ERROR] ${msg}`, meta || '');
  },
};
