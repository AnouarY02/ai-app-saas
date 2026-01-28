import { Router } from 'express';
const router = Router();

// This route is mounted at /api/health, so this handler responds to GET /api/health
router.get('/', (req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

export default router;