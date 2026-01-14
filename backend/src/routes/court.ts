import { Router } from 'express';
import { list, create, update, remove } from '../controllers/courtController';
import { requireAuth, requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/', requireAuth, list);
router.post('/', requireAuth, requireAdmin, create);
router.patch('/:id', requireAuth, requireAdmin, update);
router.delete('/:id', requireAuth, requireAdmin, remove);

export default router;
