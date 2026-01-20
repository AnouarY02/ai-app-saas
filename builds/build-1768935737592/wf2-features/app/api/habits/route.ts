import { NextRequest, NextResponse } from "next/server";
import { getHabits, addHabit } from "@/lib/habits/store";

// Dummy userId for MVP
default const USER_ID = "demo-user";

export async function GET() {
  const habits = getHabits(USER_ID);
  return NextResponse.json(habits);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body.name) return NextResponse.json({ error: "Name required" }, { status: 400 });
  const habit = addHabit(USER_ID, { name: body.name, description: body.description });
  return NextResponse.json(habit, { status: 201 });
}
