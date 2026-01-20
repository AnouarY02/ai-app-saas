import { Request, Response } from 'express';
import { listCommentsByTaskId, createCommentForTask } from '../services/commentService';

export async function listCommentsForTask(req: Request, res: Response) {
  try {
    const { taskId } = req.params;
    res.json(listCommentsByTaskId(taskId));
  } catch (err) {
    res.status(500).json({ error: 'Failed to list comments' });
  }
}

export async function createCommentForTask(req: Request, res: Response) {
  try {
    const { taskId } = req.params;
    const comment = createCommentForTask(taskId, req.body);
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create comment' });
  }
}
