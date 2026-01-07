import { Request, Response, NextFunction } from 'express';
import { prisma } from '../prisma/client';

export async function metrics(req: Request, res: Response, next: NextFunction) {
  try {
    // @ts-ignore
    const userId = req.userId;
    const [totalContacts, totalDeals, dealsByStageArr, totalDealValue] = await Promise.all([
      prisma.contact.count({ where: { userId } }),
      prisma.deal.count({ where: { userId } }),
      prisma.deal.groupBy({
        by: ['stage'],
        where: { userId },
        _count: { stage: true }
      }),
      prisma.deal.aggregate({ where: { userId }, _sum: { value: true } })
    ]);
    const dealsByStage: Record<string, number> = {};
    dealsByStageArr.forEach((item: any) => {
      dealsByStage[item.stage] = item._count.stage;
    });
    res.json({
      totalContacts,
      totalDeals,
      dealsByStage,
      totalDealValue: totalDealValue._sum.value || 0
    });
  } catch (err) {
    next(err);
  }
}
