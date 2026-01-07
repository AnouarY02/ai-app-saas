import express from 'express';
import { requireAuth } from '../middleware/authMiddleware';
import {
  listContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} from '../controllers/contactController';

const router = express.Router();

router.use(requireAuth);

router.get('/', listContacts);
router.post('/', createContact);
router.get('/:id', getContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

export default router;
