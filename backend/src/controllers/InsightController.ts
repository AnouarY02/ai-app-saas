import { Request, Response, NextFunction } from 'express';
import { InsightService } from '../services/InsightService';
import { createInsightSchema, updateInsightSchema } from '../validators/insightValidators';
import { z } from 'zod';

const insightService = new InsightService();

export class InsightController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const insights = await insightService.findAll();
      res.status(200).json(insights);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const insight = await insightService.findById(req.params.id);
      if (!insight) return res.status(404).json({ message: 'Insight not found' });
      res.status(200).json(insight);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const input = createInsightSchema.parse(req.body);
      const insight = await insightService.create(input);
      res.status(201).json(insight);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const input = updateInsightSchema.parse(req.body);
      const insight = await insightService.update(req.params.id, input);
      if (!insight) return res.status(404).json({ message: 'Insight not found' });
      res.status(200).json(insight);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const success = await insightService.delete(req.params.id);
      if (!success) return res.status(404).json({ message: 'Insight not found' });
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
