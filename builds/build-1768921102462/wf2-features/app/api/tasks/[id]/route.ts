import { NextRequest, NextResponse } from "next/server";
import { getTaskById, deleteTaskById } from "@/lib/tasks/utils";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const task = await getTaskById(params.id);
  if (!task) {
    return NextResponse.json({ error: "Niet gevonden" }, { status: 404 });
  }
  return NextResponse.json(task);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const deleted = await deleteTaskById(params.id);
  if (!deleted) {
    return NextResponse.json({ error: "Niet gevonden of geen toegang" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
