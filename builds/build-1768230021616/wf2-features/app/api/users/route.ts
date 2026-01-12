import { NextRequest, NextResponse } from "next/server";
import { getUsers, createUser } from "@/lib/users/utils";

export async function GET() {
  const users = await getUsers();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const user = await createUser(data);
  return NextResponse.json(user, { status: 201 });
}
