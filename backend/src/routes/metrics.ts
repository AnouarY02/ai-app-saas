import express from 'express';
import { listMetricsForTeam } from '../controllers/metricController';
import { requireAuth } from '../middleware/auth';

const router = express.Router();

router.get('/', requireAuth, listMetricsForTeam);

export default router;
