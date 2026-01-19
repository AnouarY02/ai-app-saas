import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth/utils";
import { aiRequestStore } from "@/lib/ai-request/store";

export async function GET(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const requests = aiRequestStore.getByUser(user.id);
  return NextResponse.json({ requests });
}

export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  if (!body.prompt || typeof body.prompt !== "string") {
    return NextResponse.json({ error: "Prompt is verplicht." }, { status: 400 });
  }
  const aiRequest = aiRequestStore.create({
    userId: user.id,
    prompt: body.prompt
  });
  return NextResponse.json({ request: aiRequest }, { status: 201 });
}
