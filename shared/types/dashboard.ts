import type { PublicUser } from './user';

export interface DashboardRequest {}

export interface DashboardResponse {
  user: PublicUser;
  features: string[];
}
