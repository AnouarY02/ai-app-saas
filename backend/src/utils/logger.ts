import { Request, Response, NextFunction } from 'express';

export const logger = {
  info: (msg: string) => {
    if (process.env.LOG_LEVEL !== 'error') {
      console.log(`[INFO] ${msg}`);
    }
  },
  error: (err: any) => {
    console.error(`[ERROR]`, err);
  }
};

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  logger.info(`${req.method} ${req.url}`);
  next();
}
