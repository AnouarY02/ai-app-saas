import express from 'express';
import { healthCheck } from '../controllers/healthController';

const router = express.Router();

// GET /api/health
router.get('/', healthCheck);

export default router;
