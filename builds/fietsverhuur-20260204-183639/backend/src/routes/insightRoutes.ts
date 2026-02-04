import { Router } from 'express';
import { InsightController } from '@/controllers/InsightController';
import { authenticate } from '@/middleware/auth';

const router = Router();

router.get('/', authenticate, InsightController.getAll);
router.get('/:id', authenticate, InsightController.getOne);
router.post('/', authenticate, InsightController.create);
router.put('/:id', authenticate, InsightController.update);
router.patch('/:id', authenticate, InsightController.update);
router.delete('/:id', authenticate, InsightController.delete);

export default router;