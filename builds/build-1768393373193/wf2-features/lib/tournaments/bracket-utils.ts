import { getTournamentParticipants } from "@/lib/tournaments/data";
import { getMemberById } from "@/lib/members/data";

export async function getBracketData(tournamentId: string) {
  const participants = await getTournamentParticipants(tournamentId);
  const names = await Promise.all(participants.map(async (p) => {
    const member = await getMemberById(p.memberId);
    return member ? member.name : "Unknown";
  }));

  // Simple single-elimination bracket
  let roundPlayers = [...names];
  const rounds: { matches: { player1: string | null, player2: string | null, winner?: string | null }[] }[] = [];
  while (roundPlayers.length > 1) {
    const matches = [];
    for (let i = 0; i < roundPlayers.length; i += 2) {
      matches.push({
        player1: roundPlayers[i] || null,
        player2: roundPlayers[i + 1] || null,
        winner: null
      });
    }
    rounds.push({ matches });
    roundPlayers = matches.map(() => null); // Placeholder for next round
  }
  return { rounds };
}
