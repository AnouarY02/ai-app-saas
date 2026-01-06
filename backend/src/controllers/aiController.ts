import { Request, Response, NextFunction } from 'express';
import { aiRequestService } from '../services/aiRequestService';
import { aiRequestCreateSchema } from '../validators/aiValidators';

export async function createRequest(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    const parsed = aiRequestCreateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid request', details: parsed.error.errors });
    }
    const aiRequest = await aiRequestService.createAIRequest(userId, parsed.data.input);
    res.status(201).json(aiRequest);
  } catch (err) {
    next(err);
  }
}

export async function listRequests(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    const requests = await aiRequestService.listByUser(userId);
    res.status(200).json(requests);
  } catch (err) {
    next(err);
  }
}

export async function getRequest(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    const id = req.params.id;
    const aiRequest = await aiRequestService.getById(id);
    if (!aiRequest || aiRequest.userId !== userId) {
      return res.status(404).json({ error: 'AI request not found' });
    }
    res.status(200).json(aiRequest);
  } catch (err) {
    next(err);
  }
}
