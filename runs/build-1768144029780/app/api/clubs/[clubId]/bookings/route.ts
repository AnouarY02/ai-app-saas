import { NextRequest, NextResponse } from "next/server";
import { getBookingsByClub, addBooking } from "../../../../../lib/data/booking-store";

export async function GET(_: NextRequest, { params }: { params: { clubId: string } }) {
  const bookings = await getBookingsByClub(params.clubId);
  return NextResponse.json(bookings);
}

export async function POST(req: NextRequest, { params }: { params: { clubId: string } }) {
  const data = await req.json();
  if (!data.courtId || !data.memberId || !data.startTime || !data.endTime) {
    return NextResponse.json({ error: "courtId, memberId, startTime, endTime verplicht" }, { status: 400 });
  }
  const booking = await addBooking({ clubId: params.clubId, ...data });
  return NextResponse.json(booking, { status: 201 });
}

