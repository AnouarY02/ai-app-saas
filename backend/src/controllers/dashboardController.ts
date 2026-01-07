import { Request, Response, NextFunction } from 'express';
import * as dashboardService from '../services/dashboardService';

export async function getSummary(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const summary = await dashboardService.getSummary(userId);
    res.json(summary);
  } catch (err) {
    next(err);
  }
}
