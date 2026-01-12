type Club = {
  id: string;
  name: string;
  address: string;
  createdAt: string;
};

const clubs: Club[] = [
  {
    id: "club-1",
    name: "Padel Paradise",
    address: "123 Main St, Cityville",
    createdAt: new Date().toISOString(),
  },
];

export async function getClubs(): Promise<Club[]> {
  return clubs;
}

export async function createClub(data: { name: string; address: string }): Promise<Club> {
  const newClub: Club = {
    id: `club-${clubs.length + 1}`,
    name: data.name,
    address: data.address,
    createdAt: new Date().toISOString(),
  };
  clubs.push(newClub);
  return newClub;
}
