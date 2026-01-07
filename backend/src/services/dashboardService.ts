import { Contact } from '../types/entities';
import { Deal } from '../types/entities';
import * as contactService from './contactService';
import * as dealService from './dealService';

export async function getSummary(userId: string) {
  // Get all contacts and deals for the user
  const { contacts } = await contactService.listContacts(userId, 1, 10000, '');
  const { deals } = await dealService.listDeals(userId, 1, 10000, '', '');
  const totalContacts = contacts.length;
  const totalDeals = deals.length;
  const totalDealValue = deals.reduce((sum, d) => sum + d.value, 0);
  const dealsByStage: { [stage: string]: number } = {};
  deals.forEach(d => {
    dealsByStage[d.stage] = (dealsByStage[d.stage] || 0) + 1;
  });
  return {
    totalContacts,
    totalDeals,
    totalDealValue,
    dealsByStage
  };
}
