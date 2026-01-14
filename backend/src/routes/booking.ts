import { Router } from 'express';
import { list, create, update, cancel } from '../controllers/bookingController';
import { requireAuth, requireBookingOwnerOrAdmin } from '../middleware/auth';

const router = Router();

router.get('/', requireAuth, list);
router.post('/', requireAuth, create);
router.patch('/:id', requireAuth, requireBookingOwnerOrAdmin, update);
router.delete('/:id', requireAuth, requireBookingOwnerOrAdmin, cancel);

export default router;
