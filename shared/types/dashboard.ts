// Dashboard metrics
export interface DashboardMetrics {
  totalContacts: number;
  totalDeals: number;
  dealsByStage: Record<string, number>;
  totalDealValue: number;
}
