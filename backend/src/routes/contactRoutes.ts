import { Router } from 'express';
import {
  listContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact
} from '../controllers/contactController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/', listContacts);
router.post('/', createContact);
router.get('/:id', getContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

export default router;
