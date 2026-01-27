import { Router } from 'express';
import { listUsers, getUser, updateUser, partialUpdateUser, deleteUser } from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/', listUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.patch('/:id', partialUpdateUser);
router.delete('/:id', deleteUser);

export default router;