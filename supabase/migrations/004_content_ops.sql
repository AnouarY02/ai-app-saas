-- ============================================================
-- VOLT Sleep — Content Operations Tables
-- ============================================================
-- Tracks content production, publishing, and performance
-- for the marketing automation pipeline.
-- ============================================================

-- Topics / Hook Library
CREATE TABLE IF NOT EXISTS public.content_topics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  angle TEXT NOT NULL, -- e.g. 'caffeine_timing', 'energy_crash', 'weekend_rhythm'
  hook TEXT NOT NULL,
  variation_index SMALLINT NOT NULL DEFAULT 0,
  locale TEXT NOT NULL DEFAULT 'en',
  weight NUMERIC(3,2) NOT NULL DEFAULT 1.00, -- 1.0 = normal, 2.0 = boosted winner
  times_used INTEGER NOT NULL DEFAULT 0,
  last_used_at TIMESTAMPTZ,
  avg_views INTEGER DEFAULT 0,
  avg_engagement NUMERIC(5,2) DEFAULT 0.0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Published Posts
CREATE TABLE IF NOT EXISTS public.content_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  topic_id UUID REFERENCES public.content_topics(id),
  day_number INTEGER NOT NULL, -- day in the content calendar
  post_index SMALLINT NOT NULL, -- 1, 2, or 3 (3 posts per day)
  platform TEXT NOT NULL CHECK (platform IN ('tiktok', 'instagram', 'youtube', 'facebook', 'x')),
  script TEXT NOT NULL,
  caption TEXT NOT NULL,
  hashtags TEXT NOT NULL,
  cta_variant TEXT NOT NULL, -- 'soft', 'direct', 'urgency'
  srt_subtitles TEXT,
  thumbnail_text TEXT,
  overlay_instructions JSONB DEFAULT '[]'::jsonb,
  utm_link TEXT,
  scheduled_at TIMESTAMPTZ NOT NULL,
  published_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Performance Metrics
CREATE TABLE IF NOT EXISTS public.content_performance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES public.content_posts(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  saves INTEGER DEFAULT 0,
  click_through INTEGER DEFAULT 0,
  watch_time_avg_seconds NUMERIC(5,1) DEFAULT 0.0,
  measured_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Content Experiments (A/B hooks)
CREATE TABLE IF NOT EXISTS public.content_experiments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  variant_a_topic_id UUID REFERENCES public.content_topics(id),
  variant_b_topic_id UUID REFERENCES public.content_topics(id),
  start_date DATE NOT NULL,
  end_date DATE,
  winner TEXT CHECK (winner IS NULL OR winner IN ('a', 'b', 'tie')),
  metric TEXT NOT NULL DEFAULT 'views', -- 'views', 'engagement', 'ctr'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Do-not-repeat constraint: same hook cannot be used within 14 days
CREATE UNIQUE INDEX IF NOT EXISTS idx_content_no_repeat
  ON public.content_posts(topic_id, platform, (scheduled_at::date))
  WHERE status != 'failed';

-- Performance lookup
CREATE INDEX IF NOT EXISTS idx_content_perf_post ON public.content_performance(post_id);
CREATE INDEX IF NOT EXISTS idx_content_posts_schedule ON public.content_posts(scheduled_at, status);
CREATE INDEX IF NOT EXISTS idx_content_topics_angle ON public.content_topics(angle, is_active);
