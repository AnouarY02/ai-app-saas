import express from 'express';
import {
  listTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
} from '../controllers/tasksController';
import { authenticateJWT } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import { createTaskSchema, updateTaskSchema } from '../validators/taskSchemas';

const router = express.Router();

router.use(authenticateJWT);

router.get('/', listTasks);
router.post('/', validateBody(createTaskSchema), createTask);
router.get('/:taskId', getTask);
router.put('/:taskId', validateBody(updateTaskSchema), updateTask);
router.delete('/:taskId', deleteTask);

export default router;
