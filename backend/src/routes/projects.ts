import express from 'express';
import { listProjects, createProject, getProject, updateProject, deleteProject } from '../controllers/projectController';
import { requireAuth, requireRole } from '../middleware/auth';
import boardsRouter from './boards';
import activityRouter from './activity';

const router = express.Router();

router.get('/', requireAuth, listProjects);
router.post('/', requireAuth, requireRole('admin'), createProject);
router.get('/:projectId', requireAuth, getProject);
router.patch('/:projectId', requireAuth, requireRole('admin'), updateProject);
router.delete('/:projectId', requireAuth, requireRole('admin'), deleteProject);

router.use('/:projectId/boards', boardsRouter);
router.use('/:projectId/activity', activityRouter);

export default router;
