import { NextResponse } from 'next/server'
import { createServerSupabase, createServiceSupabase } from '@/lib/supabase/server'

/**
 * GDPR: Account deletion endpoint.
 * Deletes all user data from the database.
 */
export async function POST() {
  try {
    const supabase = createServerSupabase()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const serviceSupabase = createServiceSupabase()

    // Delete all user data (cascade should handle most, but be explicit)
    await serviceSupabase.from('analytics_events').delete().eq('user_id', user.id)
    await serviceSupabase.from('weekly_reports').delete().eq('user_id', user.id)
    await serviceSupabase.from('actions').delete().eq('user_id', user.id)
    await serviceSupabase.from('daily_logs').delete().eq('user_id', user.id)
    await serviceSupabase.from('subscriptions').delete().eq('user_id', user.id)
    await serviceSupabase.from('onboarding_profiles').delete().eq('user_id', user.id)
    await serviceSupabase.from('users').delete().eq('id', user.id)

    // Delete auth user
    await serviceSupabase.auth.admin.deleteUser(user.id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[API] Account deletion error:', error)
    return NextResponse.json(
      { error: 'Deletion failed' },
      { status: 500 }
    )
  }
}
