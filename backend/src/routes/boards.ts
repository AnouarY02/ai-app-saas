import express from 'express';
import { listBoardsForProject, createBoardForProject, getBoard, updateBoard, deleteBoard } from '../controllers/boardController';
import { requireAuth, requireRole } from '../middleware/auth';

const router = express.Router({ mergeParams: true });

router.get('/', requireAuth, listBoardsForProject);
router.post('/', requireAuth, requireRole('admin'), createBoardForProject);
router.get('/:boardId', requireAuth, getBoard);
router.patch('/:boardId', requireAuth, requireRole('admin'), updateBoard);
router.delete('/:boardId', requireAuth, requireRole('admin'), deleteBoard);

export default router;
