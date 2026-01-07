import { Request, Response } from 'express';
import { ApiStatus } from '../types/api';

export const getHealth = (req: Request, res: Response<ApiStatus>) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
};
