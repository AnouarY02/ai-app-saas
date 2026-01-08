import { Request, Response, NextFunction } from 'express';
import { HealthCheckResponse } from '../types/health';

export const healthCheck = (req: Request, res: Response<HealthCheckResponse>, next: NextFunction) => {
  try {
    const response: HealthCheckResponse = {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
