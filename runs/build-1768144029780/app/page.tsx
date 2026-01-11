import { ClubList } from "../components/clubs/club-list";
import { getSession } from "../lib/auth-server";

export default async function HomePage() {
  const session = await getSession();
  // Toon cluboverzicht of clubdashboard afhankelijk van rol
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welkom bij Padel Club Manager</h1>
      <ClubList />
    </div>
  );
}

