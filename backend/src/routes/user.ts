import { Router } from 'express';
import { getMe, list, update, remove } from '../controllers/userController';
import { requireAuth, requireAdminOrSelf } from '../middleware/auth';

const router = Router();

router.get('/me', requireAuth, getMe);
router.get('/', requireAuth, list);
router.patch('/:id', requireAuth, requireAdminOrSelf, update);
router.delete('/:id', requireAuth, requireAdminOrSelf, remove);

export default router;
