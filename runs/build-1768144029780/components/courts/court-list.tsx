import { getCourtsByClub } from "../../lib/data/court-store";

export async function CourtList({ clubId }: { clubId: string }) {
  const courts = await getCourtsByClub(clubId);
  if (!courts.length) return <div>Geen banen gevonden.</div>;
  return (
    <ul className="divide-y bg-white rounded shadow">
      {courts.map(court => (
        <li key={court.id} className="p-4 flex items-center justify-between">
          <span className="font-semibold">{court.name}</span>
        </li>
      ))}
    </ul>
  );
}

