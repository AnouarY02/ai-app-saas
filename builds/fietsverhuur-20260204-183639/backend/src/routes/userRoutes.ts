import { Router } from 'express';
import { UserController } from '@/controllers/UserController';
import { authenticate } from '@/middleware/auth';

const router = Router();

router.get('/', authenticate, UserController.getAll);
router.get('/:id', authenticate, UserController.getOne);
router.post('/', authenticate, UserController.create);
router.put('/:id', authenticate, UserController.update);
router.patch('/:id', authenticate, UserController.update);
router.delete('/:id', authenticate, UserController.delete);

export default router;