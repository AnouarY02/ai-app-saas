import { NextRequest } from "next/server";

// Dummy authenticatie voor demo; in productie JWT/cookies gebruiken
export async function getUserFromRequest(req: NextRequest): Promise<{ id: string; email: string } | null> {
  // Simuleer user extractie uit headers of cookies
  const userId = req.headers.get("x-user-id");
  const email = req.headers.get("x-user-email");
  if (userId && email) {
    return { id: userId, email };
  }
  return null;
}
