import express from 'express';
import { listActivityForProject } from '../controllers/activityController';
import { requireAuth } from '../middleware/auth';

const router = express.Router({ mergeParams: true });

router.get('/', requireAuth, listActivityForProject);

export default router;
