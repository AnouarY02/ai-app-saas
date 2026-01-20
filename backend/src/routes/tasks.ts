import express from 'express';
import { listTasks, createTask, getTask, updateTask, deleteTask } from '../controllers/taskController';
import { requireAuth } from '../middleware/auth';
import commentsRouter from './comments';

const router = express.Router();

router.get('/', requireAuth, listTasks);
router.post('/', requireAuth, createTask);
router.get('/:taskId', requireAuth, getTask);
router.patch('/:taskId', requireAuth, updateTask);
router.delete('/:taskId', requireAuth, deleteTask);

router.use('/:taskId/comments', commentsRouter);

export default router;
