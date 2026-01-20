import express from 'express';
import { listCommentsForTask, createCommentForTask } from '../controllers/commentController';
import { requireAuth } from '../middleware/auth';

const router = express.Router({ mergeParams: true });

router.get('/', requireAuth, listCommentsForTask);
router.post('/', requireAuth, createCommentForTask);

export default router;
