import { NextRequest, NextResponse } from 'next/server';
import { demos } from '../../../lib/store';
import { DemoPage } from '../../../lib/types';
import { randomUUID } from 'crypto';

export async function GET() {
  return NextResponse.json(demos);
}

export async function POST(req: NextRequest) {
  const { title, featureId, content } = await req.json();
  const demo: DemoPage = {
    id: randomUUID(),
    title,
    featureId,
    content,
    createdAt: new Date().toISOString()
  };
  demos.push(demo);
  return NextResponse.json(demo, { status: 201 });
}

