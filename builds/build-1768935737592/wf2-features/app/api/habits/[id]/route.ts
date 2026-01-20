import { NextRequest, NextResponse } from "next/server";
import { getHabit, updateHabit, deleteHabit } from "@/lib/habits/store";

default const USER_ID = "demo-user";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const habit = getHabit(USER_ID, params.id);
  if (!habit) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(habit);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const habit = updateHabit(USER_ID, params.id, body);
  if (!habit) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(habit);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const ok = deleteHabit(USER_ID, params.id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
