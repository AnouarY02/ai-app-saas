import { NextRequest } from "next/server";

// Dummy user session extraction for MVP
export async function getUserFromRequest(req: NextRequest): Promise<{ id: string } | null> {
  // In productie: JWT/cookie/session parsing
  // MVP: altijd dezelfde gebruiker
  return { id: "demo-user" };
}
