type Court = {
  id: string;
  clubId: string;
  name: string;
};

const courts: Court[] = [
  {
    id: "court-1",
    clubId: "club-1",
    name: "Court 1",
  },
  {
    id: "court-2",
    clubId: "club-1",
    name: "Court 2",
  },
];

export async function getCourts(): Promise<Court[]> {
  return courts;
}

export async function createCourt(data: { clubId: string; name: string }): Promise<Court> {
  const newCourt: Court = {
    id: `court-${courts.length + 1}`,
    clubId: data.clubId,
    name: data.name,
  };
  courts.push(newCourt);
  return newCourt;
}
