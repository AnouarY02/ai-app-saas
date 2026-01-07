import { User, Contact, Deal } from './entities';

export interface UserSummary {
  id: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: UserSummary;
}

export interface SuccessResponse {
  success: boolean;
}

export interface ContactListResponse {
  contacts: Contact[];
  total: number;
}

export interface DealListResponse {
  deals: Deal[];
  total: number;
}

export interface DashboardSummary {
  totalContacts: number;
  totalDeals: number;
  totalDealValue: number;
  dealsByStage: { [stage: string]: number };
}
