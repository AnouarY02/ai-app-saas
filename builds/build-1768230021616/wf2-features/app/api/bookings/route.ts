import { NextRequest, NextResponse } from "next/server";
import { getBookings, createBooking } from "@/lib/bookings/utils";

export async function GET() {
  const bookings = await getBookings();
  return NextResponse.json(bookings);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const booking = await createBooking(data);
  return NextResponse.json(booking, { status: 201 });
}
