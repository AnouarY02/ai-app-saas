import { v4 as uuidv4 } from 'uuid';

export interface Metric {
  id: string;
  teamId: string;
  type: string;
  value: number;
  period: string;
}

const metrics: Metric[] = [];

export function listMetricsByTeamId(teamId: string): Metric[] {
  return metrics.filter(m => m.teamId === teamId);
}
