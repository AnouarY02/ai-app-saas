import React from "react";
import { getBracketData } from "@/lib/tournaments/bracket-utils";
import { Card } from "@/components/ui/card";

export async function BracketView({ tournamentId }: { tournamentId: string }) {
  const { rounds } = await getBracketData(tournamentId);

  if (!rounds.length) {
    return <div className="text-muted-foreground">No bracket data available.</div>;
  }

  return (
    <div className="flex gap-6 overflow-x-auto">
      {rounds.map((round, i) => (
        <div key={i} className="flex flex-col gap-4 min-w-[180px]">
          <div className="font-semibold mb-2">Round {i + 1}</div>
          {round.matches.map((match, j) => (
            <Card key={j} className="p-2 border-primary/30">
              <div className="flex flex-col gap-1">
                <span>{match.player1 || "TBD"}</span>
                <span className="text-center text-muted-foreground">vs</span>
                <span>{match.player2 || "TBD"}</span>
              </div>
              {match.winner && (
                <div className="mt-1 text-xs text-green-600">Winner: {match.winner}</div>
              )}
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
}
