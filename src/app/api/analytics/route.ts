import { NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const supabase = createServerSupabase()
    const { data: { user } } = await supabase.auth.getUser()

    const body = await request.json()
    const { event, properties } = body

    if (!event) {
      return NextResponse.json({ error: 'Event required' }, { status: 400 })
    }

    await supabase.from('analytics_events').insert({
      user_id: user?.id || null,
      event,
      properties: properties || {},
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[API] Analytics error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
