import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth/utils";
import { tasksStore } from "@/lib/tasks/store";
import { nanoid } from "nanoid";

export async function GET(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "Niet geauthenticeerd" }, { status: 401 });
  const tasks = tasksStore.getTasksByUser(user.id);
  return NextResponse.json({ tasks });
}

export async function POST(req: NextRequest) {
  const user = getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "Niet geauthenticeerd" }, { status: 401 });
  const body = await req.json();
  if (!body.title || typeof body.title !== "string") {
    return NextResponse.json({ error: "Titel is verplicht." }, { status: 400 });
  }
  const newTask = {
    id: nanoid(),
    userId: user.id,
    title: body.title,
    description: body.description || "",
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  tasksStore.addTask(newTask);
  return NextResponse.json({ task: newTask }, { status: 201 });
}
