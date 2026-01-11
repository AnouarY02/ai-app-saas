import { v4 as uuid } from "uuid";

export interface Court {
  id: string;
  clubId: string;
  name: string;
}

const courts: Court[] = [
  { id: "c1", clubId: "club1", name: "Baan 1" },
  { id: "c2", clubId: "club1", name: "Baan 2" },
  { id: "c3", clubId: "club2", name: "Baan 1" }
];

export async function getCourtsByClub(clubId: string): Promise<Court[]> {
  return courts.filter(c => c.clubId === clubId);
}

export async function getCourtById(id: string): Promise<Court | undefined> {
  return courts.find(c => c.id === id);
}

export async function addCourt(data: { clubId: string; name: string }): Promise<Court> {
  const court = { id: uuid(), ...data };
  courts.push(court);
  return court;
}

export async function updateCourt(id: string, data: Partial<Court>): Promise<Court | undefined> {
  const court = courts.find(c => c.id === id);
  if (!court) return undefined;
  Object.assign(court, data);
  return court;
}

export async function deleteCourt(id: string): Promise<boolean> {
  const idx = courts.findIndex(c => c.id === id);
  if (idx === -1) return false;
  courts.splice(idx, 1);
  return true;
}

