import express from 'express';
import { requireAuth } from '../middleware/auth';
import {
  listDeals,
  createDeal,
  getDeal,
  updateDeal,
  deleteDeal
} from '../controllers/dealController';

const router = express.Router();

router.use(requireAuth);

router.get('/', listDeals);
router.post('/', createDeal);
router.get('/:id', getDeal);
router.put('/:id', updateDeal);
router.delete('/:id', deleteDeal);

export default router;
