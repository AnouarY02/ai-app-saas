import { NextRequest, NextResponse } from 'next/server';
import { features } from '../../../lib/store';
import { Feature } from '../../../lib/types';
import { randomUUID } from 'crypto';

export async function GET() {
  return NextResponse.json(features);
}

export async function POST(req: NextRequest) {
  const { name, description, enabled } = await req.json();
  const feature: Feature = {
    id: randomUUID(),
    name,
    description,
    enabled: !!enabled,
    createdAt: new Date().toISOString()
  };
  features.push(feature);
  return NextResponse.json(feature, { status: 201 });
}

