import { NextRequest, NextResponse } from 'next/server';
import { promptsStore } from '../../../../lib/store';
import { getSessionUser } from '../../../../lib/auth';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Niet geauthenticeerd' }, { status: 401 });
  const prompt = promptsStore.findById(params.id);
  if (!prompt || prompt.userId !== user.id) {
    return NextResponse.json({ error: 'Niet gevonden' }, { status: 404 });
  }
  return NextResponse.json(prompt);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Niet geauthenticeerd' }, { status: 401 });
  const prompt = promptsStore.findById(params.id);
  if (!prompt || prompt.userId !== user.id) {
    return NextResponse.json({ error: 'Niet gevonden' }, { status: 404 });
  }
  const { input } = await req.json();
  if (typeof input !== 'string' || !input) {
    return NextResponse.json({ error: 'Ongeldige input' }, { status: 400 });
  }
  // Simuleer AI-output
  const output = `AI antwoord op: ${input}`;
  const updated = promptsStore.update(params.id, { input, output });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: 'Niet geauthenticeerd' }, { status: 401 });
  const prompt = promptsStore.findById(params.id);
  if (!prompt || prompt.userId !== user.id) {
    return NextResponse.json({ error: 'Niet gevonden' }, { status: 404 });
  }
  promptsStore.delete(params.id);
  return NextResponse.json({ success: true });
}

