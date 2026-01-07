import { Request, Response, NextFunction } from 'express';
import * as contactModel from '../models/contactModel';
import * as dealModel from '../models/dealModel';

export async function getMetrics(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const totalContacts = await contactModel.countContacts(userId);
    const { totalDeals, dealsByStage, totalDealValue } = await dealModel.getDealMetrics(userId);
    res.json({
      totalContacts,
      totalDeals,
      dealsByStage,
      totalDealValue,
    });
  } catch (err) {
    next(err);
  }
}
