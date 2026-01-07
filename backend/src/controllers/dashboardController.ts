import { Request, Response, NextFunction } from 'express';
import { contacts } from '../models/contact';
import { deals } from '../models/deal';

export async function getMetrics(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const userContacts = contacts.filter(c => c.ownerId === userId);
    const userDeals = deals.filter(d => d.ownerId === userId);
    const dealsByStage: Record<string, number> = {};
    let totalDealValue = 0;
    for (const deal of userDeals) {
      dealsByStage[deal.stage] = (dealsByStage[deal.stage] || 0) + 1;
      totalDealValue += deal.value;
    }
    res.json({
      totalContacts: userContacts.length,
      totalDeals: userDeals.length,
      dealsByStage,
      totalDealValue
    });
  } catch (err) {
    next(err);
  }
}
