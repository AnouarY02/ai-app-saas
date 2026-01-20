import { Request, Response } from 'express';
import { listBoardsByProjectId, createBoardForProject, getBoardById, updateBoard, deleteBoard } from '../services/boardService';

export async function listBoardsForProject(req: Request, res: Response) {
  try {
    const { projectId } = req.params;
    res.json(listBoardsByProjectId(projectId));
  } catch (err) {
    res.status(500).json({ error: 'Failed to list boards' });
  }
}

export async function createBoardForProject(req: Request, res: Response) {
  try {
    const { projectId } = req.params;
    const board = createBoardForProject(projectId, req.body);
    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create board' });
  }
}

export async function getBoard(req: Request, res: Response) {
  try {
    const { boardId } = req.params;
    const board = getBoardById(boardId);
    if (!board) return res.status(404).json({ error: 'Board not found' });
    res.json(board);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get board' });
  }
}

export async function updateBoard(req: Request, res: Response) {
  try {
    const { boardId } = req.params;
    const board = updateBoard(boardId, req.body);
    res.json(board);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update board' });
  }
}

export async function deleteBoard(req: Request, res: Response) {
  try {
    const { boardId } = req.params;
    deleteBoard(boardId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete board' });
  }
}
