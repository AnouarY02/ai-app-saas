import { Router } from 'express';
import {
  listDeals,
  createDeal,
  getDeal,
  updateDeal,
  deleteDeal
} from '../controllers/dealController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/', listDeals);
router.post('/', createDeal);
router.get('/:id', getDeal);
router.put('/:id', updateDeal);
router.delete('/:id', deleteDeal);

export default router;
