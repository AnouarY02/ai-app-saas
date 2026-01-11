import { v4 as uuid } from "uuid";

export interface Wallet {
  id: string;
  memberId: string;
  balance: number;
}

const wallets: Wallet[] = [
  { id: "w1", memberId: "m1", balance: 50 },
  { id: "w2", memberId: "m2", balance: 20 },
  { id: "w3", memberId: "m3", balance: 100 }
];

import { getMembersByClub } from "./member-store";

export async function getWalletsByClub(clubId: string): Promise<Wallet[]> {
  const members = await getMembersByClub(clubId);
  const memberIds = members.map(m => m.id);
  return wallets.filter(w => memberIds.includes(w.memberId));
}

export async function getWalletById(id: string): Promise<Wallet | undefined> {
  return wallets.find(w => w.id === id);
}

export async function updateWallet(id: string, data: Partial<Wallet>): Promise<Wallet | undefined> {
  const wallet = wallets.find(w => w.id === id);
  if (!wallet) return undefined;
  Object.assign(wallet, data);
  return wallet;
}

