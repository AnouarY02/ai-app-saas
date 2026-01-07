import { Request, Response, NextFunction } from 'express';
import { aiInteractionRequestSchema, queryParamsSchema } from '../validators/aiValidators';
import { aiService } from '../services/aiService';
import { logger } from '../utils/logger';

export async function createInteraction(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const data = aiInteractionRequestSchema.parse(req.body);
    // Simulate AI response (replace with real AI integration)
    const output = `Echo: ${data.input}`;
    const interaction = await aiService.create({ userId, input: data.input, output });
    logger.info(`AI interaction created for user ${userId}`);
    res.status(201).json({ output, interaction });
  } catch (err) {
    next(err);
  }
}

export async function getHistory(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const { limit = 20, offset = 0 } = queryParamsSchema.parse(req.query);
    const interactions = await aiService.listByUser(userId, limit, offset);
    res.status(200).json({ interactions });
  } catch (err) {
    next(err);
  }
}
