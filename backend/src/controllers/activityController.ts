import { Request, Response } from 'express';
import { listActivityByProjectId } from '../services/activityService';

export async function listActivityForProject(req: Request, res: Response) {
  try {
    const { projectId } = req.params;
    res.json(listActivityByProjectId(projectId));
  } catch (err) {
    res.status(500).json({ error: 'Failed to list activity' });
  }
}
