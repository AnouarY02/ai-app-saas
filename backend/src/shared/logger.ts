import { Request, Response, NextFunction } from 'express';

export const logger = {
  info: (msg: string, meta?: any) => {
    // eslint-disable-next-line no-console
    console.log(`[INFO] ${msg}`, meta || '');
  },
  error: (err: any) => {
    // eslint-disable-next-line no-console
    if (err instanceof Error) {
      console.error(`[ERROR] ${err.name}: ${err.message}`);
    } else {
      console.error('[ERROR]', err);
    }
  }
};

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  next();
}
