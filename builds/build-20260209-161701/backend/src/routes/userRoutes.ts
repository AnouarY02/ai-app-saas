import { Router } from 'express';
import { UserController } from '@/controllers/UserController';
import { authenticate } from '@/middleware/auth';

const router = Router();
const userController = new UserController();

router.get('/', authenticate, userController.getAll.bind(userController));
router.get('/:id', authenticate, userController.getOne.bind(userController));
router.post('/', authenticate, userController.create.bind(userController));
router.put('/:id', authenticate, userController.update.bind(userController));
router.patch('/:id', authenticate, userController.update.bind(userController));
router.delete('/:id', authenticate, userController.delete.bind(userController));

export default router;
