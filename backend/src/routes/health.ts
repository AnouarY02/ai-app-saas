import { Router, Request, Response } from 'express';
import { ApiStatus } from '../types/api';

const router = Router();

router.get('/', (req: Request, res: Response<ApiStatus>) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

export default router;
