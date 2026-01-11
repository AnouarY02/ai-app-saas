import { getClubById } from "../../../lib/data/club-store";

export default async function ClubDashboard({ params }: { params: { clubId: string } }) {
  const club = await getClubById(params.clubId);
  if (!club) return <div>Club niet gevonden.</div>;
  return (
    <div>
      <h1 className="text-xl font-bold mb-2">{club.name}</h1>
      <p className="text-gray-600">{club.address}</p>
      <div className="mt-6">Welkom bij het clubdashboard.</div>
    </div>
  );
}

