'use client'

import { useState, useEffect, useCallback } from 'react'

interface DashboardData {
  summary: {
    total_published: number
    week_views: number
    week_likes: number
    week_comments: number
    week_shares: number
    avg_engagement_rate: number
    scheduled_count: number
  }
  by_platform: Record<string, { posts: number; views: number; engagement: number }>
  recent_posts: Array<{
    id: string
    platform: string
    caption: string
    status: string
    published_at: string
    day_number: number
    post_index: number
  }>
  scheduled: Array<{
    id: string
    platform: string
    caption: string
    scheduled_at: string
    day_number: number
  }>
  top_hooks: Array<{
    id: string
    hook: string
    angle: string
    weight: number
    times_used: number
    avg_views: number
    avg_engagement: number
  }>
}

const PLATFORM_COLORS: Record<string, string> = {
  tiktok: 'bg-gray-900 text-white',
  instagram: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
  youtube: 'bg-red-600 text-white',
  facebook: 'bg-blue-600 text-white',
}

const PLATFORM_LABELS: Record<string, string> = {
  tiktok: 'TikTok',
  instagram: 'Instagram',
  youtube: 'YouTube',
  facebook: 'Facebook',
}

export default function ContentDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [error, setError] = useState('')
  const [adminKey, setAdminKey] = useState('')
  const [authenticated, setAuthenticated] = useState(false)

  const fetchDashboard = useCallback(async () => {
    try {
      const res = await fetch('/api/content/dashboard', {
        headers: { Authorization: `Bearer ${adminKey}` },
      })
      if (!res.ok) {
        setError(res.status === 401 ? 'Invalid admin key' : 'Failed to load dashboard')
        return
      }
      const json = await res.json()
      setData(json)
      setError('')
      setAuthenticated(true)
    } catch {
      setError('Network error')
    }
  }, [adminKey])

  useEffect(() => {
    if (authenticated) {
      fetchDashboard()
      const interval = setInterval(fetchDashboard, 60_000)
      return () => clearInterval(interval)
    }
  }, [authenticated, fetchDashboard])

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full space-y-4">
          <h1 className="text-2xl font-bold">Content Dashboard</h1>
          <p className="text-gray-400 text-sm">Enter your admin key to access the marketing pipeline.</p>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <input
            type="password"
            placeholder="Admin key"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-volt-400"
            onKeyDown={(e) => e.key === 'Enter' && fetchDashboard()}
          />
          <button
            onClick={fetchDashboard}
            className="w-full bg-volt-500 text-black font-semibold rounded-lg py-3 hover:bg-volt-400 transition-colors"
          >
            Access Dashboard
          </button>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading dashboard...</div>
      </div>
    )
  }

  const { summary, by_platform, recent_posts, scheduled, top_hooks } = data

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Content Pipeline</h1>
            <p className="text-gray-400 mt-1">VOLT Sleep Marketing Dashboard</p>
          </div>
          <button
            onClick={fetchDashboard}
            className="bg-gray-800 text-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors"
          >
            Refresh
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <StatCard label="Published" value={summary.total_published} />
          <StatCard label="Week Views" value={summary.week_views} format="compact" />
          <StatCard label="Week Likes" value={summary.week_likes} format="compact" />
          <StatCard label="Comments" value={summary.week_comments} format="compact" />
          <StatCard label="Shares" value={summary.week_shares} format="compact" />
          <StatCard label="Engagement" value={summary.avg_engagement_rate} suffix="%" />
          <StatCard label="Scheduled" value={summary.scheduled_count} highlight />
        </div>

        {/* Platform Breakdown */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Platform Performance (7 days)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(by_platform).map(([platform, stats]) => (
              <div key={platform} className={`rounded-xl p-4 ${PLATFORM_COLORS[platform] || 'bg-gray-800'}`}>
                <p className="text-sm font-medium opacity-80">{PLATFORM_LABELS[platform] || platform}</p>
                <p className="text-2xl font-bold mt-1">{formatNumber(stats.views)} views</p>
                <p className="text-sm mt-1 opacity-80">
                  {stats.posts} posts | {Math.round(stats.engagement * 100) / 100}% eng
                </p>
              </div>
            ))}
            {Object.keys(by_platform).length === 0 && (
              <p className="text-gray-500 col-span-4">No performance data yet. Publish and track to see results.</p>
            )}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Hooks */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Top Hooks</h2>
            <div className="bg-gray-900 rounded-xl overflow-hidden">
              {top_hooks.length > 0 ? (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-400">
                      <th className="text-left p-3">Hook</th>
                      <th className="text-right p-3">Weight</th>
                      <th className="text-right p-3">Used</th>
                      <th className="text-right p-3">Avg Views</th>
                    </tr>
                  </thead>
                  <tbody>
                    {top_hooks.map((hook) => (
                      <tr key={hook.id} className="border-b border-gray-800/50 hover:bg-gray-800/50">
                        <td className="p-3">
                          <p className="text-white text-sm">{hook.hook}</p>
                          <p className="text-gray-500 text-xs mt-0.5">{hook.angle}</p>
                        </td>
                        <td className="text-right p-3">
                          <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                            hook.weight >= 2 ? 'bg-green-900 text-green-300' :
                            hook.weight >= 1.5 ? 'bg-yellow-900 text-yellow-300' :
                            hook.weight <= 0.5 ? 'bg-red-900 text-red-300' :
                            'bg-gray-800 text-gray-300'
                          }`}>
                            {hook.weight}x
                          </span>
                        </td>
                        <td className="text-right p-3 text-gray-400">{hook.times_used}</td>
                        <td className="text-right p-3 text-gray-400">{formatNumber(hook.avg_views)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500 p-4">No hooks tracked yet. Run the content factory to start.</p>
              )}
            </div>
          </section>

          {/* Scheduled Queue */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Scheduled Queue ({scheduled.length})</h2>
            <div className="bg-gray-900 rounded-xl overflow-hidden">
              {scheduled.length > 0 ? (
                <div className="divide-y divide-gray-800">
                  {scheduled.map((post) => (
                    <div key={post.id} className="p-3 flex items-center gap-3">
                      <span className={`text-xs px-2 py-1 rounded font-medium ${PLATFORM_COLORS[post.platform] || 'bg-gray-700'}`}>
                        {PLATFORM_LABELS[post.platform] || post.platform}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate">{post.caption}</p>
                        <p className="text-xs text-gray-500">Day {post.day_number}</p>
                      </div>
                      <p className="text-xs text-gray-400 whitespace-nowrap">
                        {new Date(post.scheduled_at).toLocaleString('en-GB', {
                          month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 p-4">No posts scheduled. Run the content factory workflow.</p>
              )}
            </div>
          </section>
        </div>

        {/* Recent Posts */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Recent Posts (7 days)</h2>
          <div className="bg-gray-900 rounded-xl overflow-hidden">
            {recent_posts.length > 0 ? (
              <div className="divide-y divide-gray-800">
                {recent_posts.map((post) => (
                  <div key={post.id} className="p-3 flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded font-medium shrink-0 ${PLATFORM_COLORS[post.platform] || 'bg-gray-700'}`}>
                      {PLATFORM_LABELS[post.platform] || post.platform}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{post.caption}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded shrink-0 ${
                      post.status === 'published' ? 'bg-green-900 text-green-300' :
                      post.status === 'failed' ? 'bg-red-900 text-red-300' :
                      'bg-gray-700 text-gray-300'
                    }`}>
                      {post.status}
                    </span>
                    <p className="text-xs text-gray-400 whitespace-nowrap shrink-0">
                      {post.published_at
                        ? new Date(post.published_at).toLocaleString('en-GB', {
                            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                          })
                        : '—'}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 p-4">No posts published yet.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

function StatCard({ label, value, format, suffix, highlight }: {
  label: string
  value: number
  format?: 'compact'
  suffix?: string
  highlight?: boolean
}) {
  const display = format === 'compact' ? formatNumber(value) : value
  return (
    <div className={`rounded-xl p-4 ${highlight ? 'bg-volt-500/10 border border-volt-500/30' : 'bg-gray-900'}`}>
      <p className="text-gray-400 text-xs">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${highlight ? 'text-volt-400' : 'text-white'}`}>
        {display}{suffix || ''}
      </p>
    </div>
  )
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}
