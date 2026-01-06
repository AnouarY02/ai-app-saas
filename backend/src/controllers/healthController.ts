import { Request, Response } from 'express';
import { HealthStatus } from '../types/health';
import { validateHealthCheckResponse } from '../validators/healthCheckResponseSchema';
import { logger } from '../utils/logger';

export const healthCheck = (req: Request, res: Response) => {
  const response: HealthStatus = { status: 'ok' };
  const { valid, errors } = validateHealthCheckResponse(response);
  if (!valid) {
    logger.error('Health check response validation failed', errors);
    return res.status(500).json({ error: 'Internal Server Error', details: errors });
  }
  res.status(200).json(response);
};
