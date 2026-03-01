import { NextResponse } from 'next/server'
import { createServiceSupabase } from '@/lib/supabase/server'

/**
 * GET /api/content/dashboard
 * Returns content pipeline stats: recent posts, performance metrics,
 * top hooks, and scheduled queue.
 * Protected: requires service role (admin only).
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  const adminKey = process.env.CONTENT_ADMIN_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!authHeader || authHeader !== `Bearer ${adminKey}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServiceSupabase()

  // Parallel queries for dashboard data
  const [
    recentPostsResult,
    scheduledResult,
    topHooksResult,
    performanceResult,
    totalsResult,
  ] = await Promise.all([
    // Recent published posts (last 7 days)
    supabase
      .from('content_posts')
      .select('*')
      .eq('status', 'published')
      .gte('published_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      .order('published_at', { ascending: false })
      .limit(50),

    // Upcoming scheduled posts
    supabase
      .from('content_posts')
      .select('*')
      .eq('status', 'scheduled')
      .gte('scheduled_at', new Date().toISOString())
      .order('scheduled_at', { ascending: true })
      .limit(20),

    // Top performing hooks (by weight)
    supabase
      .from('content_topics')
      .select('*')
      .eq('is_active', true)
      .order('weight', { ascending: false })
      .limit(10),

    // Recent performance metrics
    supabase
      .from('content_performance')
      .select('*')
      .gte('measured_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      .order('measured_at', { ascending: false })
      .limit(100),

    // Totals
    supabase
      .from('content_posts')
      .select('status', { count: 'exact', head: true })
      .eq('status', 'published'),
  ])

  // Aggregate metrics
  const performance = performanceResult.data || []
  const totalViews = performance.reduce((s, p) => s + (p.views || 0), 0)
  const totalLikes = performance.reduce((s, p) => s + (p.likes || 0), 0)
  const totalComments = performance.reduce((s, p) => s + (p.comments || 0), 0)
  const totalShares = performance.reduce((s, p) => s + (p.shares || 0), 0)
  const avgEngagement = performance.length > 0
    ? performance.reduce((s, p) => {
        const eng = (p.views || 0) > 0
          ? ((p.likes + p.comments + p.shares + (p.saves || 0)) / p.views) * 100
          : 0
        return s + eng
      }, 0) / performance.length
    : 0

  // Platform breakdown
  const byPlatform: Record<string, { posts: number; views: number; engagement: number }> = {}
  for (const p of performance) {
    if (!byPlatform[p.platform]) {
      byPlatform[p.platform] = { posts: 0, views: 0, engagement: 0 }
    }
    byPlatform[p.platform].posts++
    byPlatform[p.platform].views += p.views || 0
    const eng = (p.views || 0) > 0
      ? ((p.likes + p.comments + p.shares + (p.saves || 0)) / p.views) * 100
      : 0
    byPlatform[p.platform].engagement += eng
  }
  for (const key of Object.keys(byPlatform)) {
    if (byPlatform[key].posts > 0) {
      byPlatform[key].engagement = byPlatform[key].engagement / byPlatform[key].posts
    }
  }

  return NextResponse.json({
    summary: {
      total_published: totalsResult.count || 0,
      week_views: totalViews,
      week_likes: totalLikes,
      week_comments: totalComments,
      week_shares: totalShares,
      avg_engagement_rate: Math.round(avgEngagement * 100) / 100,
      scheduled_count: (scheduledResult.data || []).length,
    },
    by_platform: byPlatform,
    recent_posts: recentPostsResult.data || [],
    scheduled: scheduledResult.data || [],
    top_hooks: (topHooksResult.data || []).map(h => ({
      id: h.id,
      hook: h.hook,
      angle: h.angle,
      weight: h.weight,
      times_used: h.times_used,
      avg_views: h.avg_views,
      avg_engagement: h.avg_engagement,
    })),
  })
}
