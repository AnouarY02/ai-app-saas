import { Router } from 'express';
import { listTasks, getTask, createTask, updateTask, partialUpdateTask, deleteTask } from '../controllers/taskController';

const router = Router();

router.get('/', listTasks);
router.get('/:id', getTask);
router.post('/', createTask);
router.put('/:id', updateTask);
router.patch('/:id', partialUpdateTask);
router.delete('/:id', deleteTask);

export default router;