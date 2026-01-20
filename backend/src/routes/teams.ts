import express from 'express';
import { listTeams, createTeam, getTeam, updateTeam, deleteTeam } from '../controllers/teamController';
import { requireAuth, requireRole } from '../middleware/auth';

const router = express.Router();

router.get('/', requireAuth, listTeams);
router.post('/', requireAuth, requireRole('admin'), createTeam);
router.get('/:teamId', requireAuth, getTeam);
router.patch('/:teamId', requireAuth, requireRole('admin'), updateTeam);
router.delete('/:teamId', requireAuth, requireRole('admin'), deleteTeam);

export default router;
