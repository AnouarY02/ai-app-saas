export const logger = {
  info: (msg: string, meta?: any) => {
    if (meta) {
      // eslint-disable-next-line no-console
      console.log(`[INFO] ${msg}`, meta);
    } else {
      // eslint-disable-next-line no-console
      console.log(`[INFO] ${msg}`);
    }
  },
  error: (msg: string, meta?: any) => {
    if (meta) {
      // eslint-disable-next-line no-console
      console.error(`[ERROR] ${msg}`, meta);
    } else {
      // eslint-disable-next-line no-console
      console.error(`[ERROR] ${msg}`);
    }
  }
};
