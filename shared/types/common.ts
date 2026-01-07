// Common/shared types
export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface DeleteResponse {
  success: boolean;
}

export interface DashboardMetrics {
  totalContacts: number;
  totalDeals: number;
  dealsByStage: Record<string, number>;
  totalDealValue: number;
}

export interface QueryParams {
  search?: string;
  page?: number;
  pageSize?: number;
  stage?: string;
  contactId?: string;
}

export interface PathParams {
  id: string;
}
