import { Suspense } from "react";
import { BracketView } from "@/components/tournaments/BracketView";

export default function TournamentBracketPage({ params }: { params: { id: string } }) {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tournament Bracket</h1>
      <Suspense fallback={<div>Loading bracket...</div>}>
        <BracketView tournamentId={params.id} />
      </Suspense>
    </main>
  );
}
