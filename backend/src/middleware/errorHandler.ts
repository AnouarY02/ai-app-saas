import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  if (err.name === 'ZodError') {
    return res.status(400).json({ error: 'Validation Error', code: 'VALIDATION_ERROR', message: err.message, details: err.errors });
  }
  res.status(500).json({ error: 'Internal Server Error', code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred' });
};

export default errorHandler;