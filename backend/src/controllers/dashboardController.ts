import { Request, Response, NextFunction } from 'express';
import dashboardService from '../services/dashboardService';
import { logError } from '../utils/logger';

const getDashboardData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const data = await dashboardService.getDashboardData(userId);
    res.json(data);
  } catch (err) {
    logError('Dashboard error:', err);
    next(err);
  }
};

export default { getDashboardData };
