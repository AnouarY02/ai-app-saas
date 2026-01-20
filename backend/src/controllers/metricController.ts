import { Request, Response } from 'express';
import { listMetricsByTeamId } from '../services/metricService';

export async function listMetricsForTeam(req: Request, res: Response) {
  try {
    const { teamId } = req.query;
    if (!teamId || typeof teamId !== 'string') {
      return res.status(400).json({ error: 'teamId is required' });
    }
    res.json(listMetricsByTeamId(teamId));
  } catch (err) {
    res.status(500).json({ error: 'Failed to list metrics' });
  }
}
