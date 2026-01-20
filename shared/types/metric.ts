// Metric type
import type { ID } from './common';

export type Metric = {
  id: ID;
  teamId: ID;
  type: string;
  value: number;
  period: string;
};
