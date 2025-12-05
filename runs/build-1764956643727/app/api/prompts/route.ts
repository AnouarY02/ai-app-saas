import { NextRequest, NextResponse } from 'next/server';
import { promptsStore } from '../../../lib/store';
import { getSessionUser } from '../../../lib/auth';
import { v4 as uuidv4 } from 'uuid';

export async function GET(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) {
    return NextResponse.json({ error: 'Niet geauthenticeerd' }, { status: 401 });
  }
  const prompts = promptsStore.findByUserId(user.id);
  return NextResponse.json(prompts);
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) {
    return NextResponse.json({ error: 'Niet geauthenticeerd' }, { status: 401 });
  }
  const { input } = await req.json();
  if (!input || typeof input !== 'string') {
    return NextResponse.json({ error: 'Prompt is verplicht' }, { status: 400 });
  }
  // Simuleer AI-output
  const output = `AI antwoord op: ${input}`;
  const prompt = {
    id: uuidv4(),
    userId: user.id,
    input,
    output,
    createdAt: new Date(),
  };
  promptsStore.create(prompt);
  return NextResponse.json(prompt, { status: 201 });
}

