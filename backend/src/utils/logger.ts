export const logger = {
  info: (msg: string) => {
    console.log(`[${new Date().toISOString()}] INFO: ${msg}`);
  },
  error: (err: any) => {
    if (err instanceof Error) {
      console.error(`[${new Date().toISOString()}] ERROR:`, err.stack || err.message);
    } else {
      console.error(`[${new Date().toISOString()}] ERROR:`, err);
    }
  }
};
