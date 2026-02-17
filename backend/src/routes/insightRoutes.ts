import { Router } from 'express';
import { InsightController } from '../controllers/InsightController';
import { authenticate } from '../middleware/auth';

const router = Router();
const insightController = new InsightController();

router.get('/', authenticate, insightController.getAll.bind(insightController));
router.get('/:id', authenticate, insightController.getOne.bind(insightController));
router.post('/', authenticate, insightController.create.bind(insightController));
router.put('/:id', authenticate, insightController.update.bind(insightController));
router.patch('/:id', authenticate, insightController.update.bind(insightController));
router.delete('/:id', authenticate, insightController.delete.bind(insightController));

export default router;
