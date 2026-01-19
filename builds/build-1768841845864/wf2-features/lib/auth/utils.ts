import { NextRequest } from "next/server";

// Dummy user-auth voor MVP; in productie: JWT/cookies
export function getUserFromRequest(req: NextRequest): { id: string; email: string } | null {
  // Voorbeeld: haal userId uit header ("x-user-id")
  const userId = req.headers.get("x-user-id");
  if (!userId) return null;
  // In echte app: lookup user in store/db
  return { id: userId, email: "demo@example.com" };
}
