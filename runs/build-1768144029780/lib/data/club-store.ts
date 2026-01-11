import { v4 as uuid } from "uuid";

export interface Club {
  id: string;
  name: string;
  address?: string;
}

const clubs: Club[] = [
  { id: "club1", name: "Padel Club Amsterdam", address: "Amsterdam" },
  { id: "club2", name: "Padel Club Utrecht", address: "Utrecht" }
];

export async function getClubs(): Promise<Club[]> {
  return clubs;
}

export async function getClubById(id: string): Promise<Club | undefined> {
  return clubs.find(c => c.id === id);
}

export async function addClub(data: { name: string; address?: string }): Promise<Club> {
  const club = { id: uuid(), ...data };
  clubs.push(club);
  return club;
}

export async function updateClub(id: string, data: Partial<Club>): Promise<Club | undefined> {
  const club = clubs.find(c => c.id === id);
  if (!club) return undefined;
  Object.assign(club, data);
  return club;
}

export async function deleteClub(id: string): Promise<boolean> {
  const idx = clubs.findIndex(c => c.id === id);
  if (idx === -1) return false;
  clubs.splice(idx, 1);
  return true;
}

