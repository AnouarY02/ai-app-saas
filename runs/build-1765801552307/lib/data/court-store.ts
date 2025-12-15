import { v4 as uuidv4 } from 'uuid';

export type Court = {
  id: string;
  name: string;
  location: string;
  description?: string;
};

const courts: Court[] = [];

export function getAllCourts(): Court[] {
  return courts;
}

export function getCourtById(id: string): Court | undefined {
  return courts.find(c => c.id === id);
}

export function createCourt({ name, location, description }: { name: string; location: string; description?: string }): Court {
  const court: Court = {
    id: uuidv4(),
    name,
    location,
    description,
  };
  courts.push(court);
  return court;
}

export function updateCourt(id: string, data: Partial<Omit<Court, 'id'>>): Court | undefined {
  const court = getCourtById(id);
  if (!court) return undefined;
  Object.assign(court, data);
  return court;
}

export function deleteCourt(id: string): boolean {
  const idx = courts.findIndex(c => c.id === id);
  if (idx === -1) return false;
  courts.splice(idx, 1);
  return true;
}

