import { NextRequest, NextResponse } from "next/server";
import { getCourts, createCourt } from "@/lib/courts/utils";

export async function GET() {
  const courts = await getCourts();
  return NextResponse.json(courts);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const court = await createCourt(data);
  return NextResponse.json(court, { status: 201 });
}
