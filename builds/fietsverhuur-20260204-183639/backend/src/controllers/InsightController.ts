import { Request, Response, NextFunction } from 'express';
import { InsightService } from '@/services/InsightService';
import { createInsightSchema, updateInsightSchema } from '@/validators/insightValidators';

export const InsightController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const insights = await InsightService.findAll();
      res.json({ data: insights });
    } catch (error) {
      next(error);
    }
  },

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const insight = await InsightService.findById(req.params.id);
      if (!insight) return res.status(404).json({ error: 'Insight not found' });
      res.json({ data: insight });
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = createInsightSchema.parse(req.body);
      const insight = await InsightService.create(validated);
      res.status(201).json({ data: insight });
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = updateInsightSchema.parse(req.body);
      const insight = await InsightService.update(req.params.id, validated);
      if (!insight) return res.status(404).json({ error: 'Insight not found' });
      res.json({ data: insight });
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await InsightService.delete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Insight not found' });
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};