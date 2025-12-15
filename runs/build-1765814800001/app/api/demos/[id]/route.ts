import { NextRequest, NextResponse } from 'next/server';
import { demos } from '../../../../lib/store';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const demo = demos.find(d => d.id === params.id);
  if (!demo) return NextResponse.json({ error: 'Niet gevonden' }, { status: 404 });
  return NextResponse.json(demo);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const idx = demos.findIndex(d => d.id === params.id);
  if (idx === -1) return NextResponse.json({ error: 'Niet gevonden' }, { status: 404 });
  const { title, featureId, content } = await req.json();
  demos[idx] = {
    ...demos[idx],
    title: title ?? demos[idx].title,
    featureId: featureId ?? demos[idx].featureId,
    content: content ?? demos[idx].content
  };
  return NextResponse.json(demos[idx]);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const idx = demos.findIndex(d => d.id === params.id);
  if (idx === -1) return NextResponse.json({ error: 'Niet gevonden' }, { status: 404 });
  demos.splice(idx, 1);
  return NextResponse.json({ success: true });
}

