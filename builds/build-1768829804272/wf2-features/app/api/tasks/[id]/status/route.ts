import { NextRequest, NextResponse } from "next/server";
import { getTaskById, updateTaskStatus } from "lib/tasks/utils";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { status } = await req.json();
  if (!status) {
    return NextResponse.json({ error: "Status is required" }, { status: 400 });
  }
  const task = await getTaskById(params.id);
  if (!task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }
  const updated = await updateTaskStatus(params.id, status);
  return NextResponse.json(updated);
}
