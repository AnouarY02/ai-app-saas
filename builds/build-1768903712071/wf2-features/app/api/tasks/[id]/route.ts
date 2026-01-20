import { NextRequest, NextResponse } from "next/server";
import { getTaskById, updateTask, deleteTask } from "@/lib/tasks/utils";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const task = await getTaskById(params.id);
  if (!task) return NextResponse.json({ error: "Niet gevonden" }, { status: 404 });
  return NextResponse.json(task);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json();
  const updated = await updateTask(params.id, data);
  if (!updated) return NextResponse.json({ error: "Niet gevonden" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const deleted = await deleteTask(params.id);
  if (!deleted) return NextResponse.json({ error: "Niet gevonden" }, { status: 404 });
  return NextResponse.json({ success: true });
}
