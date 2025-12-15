import { NextRequest, NextResponse } from 'next/server';
import { features } from '../../../../lib/store';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const feature = features.find(f => f.id === params.id);
  if (!feature) return NextResponse.json({ error: 'Niet gevonden' }, { status: 404 });
  return NextResponse.json(feature);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const idx = features.findIndex(f => f.id === params.id);
  if (idx === -1) return NextResponse.json({ error: 'Niet gevonden' }, { status: 404 });
  const { name, description, enabled } = await req.json();
  features[idx] = {
    ...features[idx],
    name: name ?? features[idx].name,
    description: description ?? features[idx].description,
    enabled: enabled ?? features[idx].enabled
  };
  return NextResponse.json(features[idx]);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const idx = features.findIndex(f => f.id === params.id);
  if (idx === -1) return NextResponse.json({ error: 'Niet gevonden' }, { status: 404 });
  features.splice(idx, 1);
  return NextResponse.json({ success: true });
}

