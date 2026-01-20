import { NextRequest, NextResponse } from "next/server";
import { completeHabit } from "@/lib/habits/store";

default const USER_ID = "demo-user";

export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  const habit = completeHabit(USER_ID, params.id);
  if (!habit) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(habit);
}
