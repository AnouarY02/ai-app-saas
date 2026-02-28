-- ============================================================
-- VOLT Sleep — Database Schema (Supabase / PostgreSQL)
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- USERS (extends Supabase auth.users)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'premium')),
  timezone TEXT NOT NULL DEFAULT 'Europe/Amsterdam',
  onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE,
  notification_preferences JSONB DEFAULT '{"max_per_day": 2, "preferred_times": [], "enabled": true}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ONBOARDING PROFILES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.onboarding_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
  wake_target_weekday TIME NOT NULL,
  wake_target_weekend TIME NOT NULL,
  current_bedtime_early TIME NOT NULL,
  current_bedtime_late TIME NOT NULL,
  baseline_energy SMALLINT NOT NULL CHECK (baseline_energy BETWEEN 1 AND 10),
  has_afternoon_dip BOOLEAN NOT NULL DEFAULT FALSE,
  dip_time TIME,
  caffeine_cups SMALLINT NOT NULL DEFAULT 0,
  caffeine_last_time TIME NOT NULL,
  screen_after_21 BOOLEAN NOT NULL DEFAULT FALSE,
  screen_minutes_late SMALLINT NOT NULL DEFAULT 0,
  stress_level SMALLINT NOT NULL CHECK (stress_level BETWEEN 1 AND 10),
  chronotype TEXT NOT NULL CHECK (chronotype IN ('morning', 'middle', 'evening')),
  primary_goal TEXT NOT NULL CHECK (primary_goal IN ('focus', 'less-dip', 'stable', 'sport')),
  start_route TEXT NOT NULL CHECK (start_route IN ('light', 'standard', 'focus')),
  energy_profile TEXT NOT NULL CHECK (energy_profile IN ('stabilizer', 'crash-prone', 'night-owl-drift', 'overcaffeinated')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- DAILY LOGS (night + morning check-ins)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.daily_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  -- Morning check
  wake_time TIME,
  energy_morning SMALLINT CHECK (energy_morning IS NULL OR energy_morning BETWEEN 1 AND 10),
  had_dip_yesterday BOOLEAN,
  -- Night check
  bedtime_time TIME,
  stress_evening SMALLINT CHECK (stress_evening IS NULL OR stress_evening BETWEEN 1 AND 10),
  caffeine_last_time TIME,
  caffeine_cups SMALLINT,
  screen_minutes_late SMALLINT,
  last_screen_time TIME,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- ============================================================
-- ACTIONS (daily energy cards)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.actions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  primary_action_json JSONB NOT NULL,
  secondary_actions_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  micro_education TEXT,
  tone TEXT NOT NULL DEFAULT 'neutral' CHECK (tone IN ('neutral', 'coach', 'strict')),
  generated_by_version TEXT NOT NULL DEFAULT 'rules-v1',
  completed_primary BOOLEAN NOT NULL DEFAULT FALSE,
  completed_secondary_count SMALLINT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- ============================================================
-- WEEKLY REPORTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.weekly_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  week_start DATE NOT NULL,
  insights_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  avg_energy NUMERIC(3,1),
  regularity_score SMALLINT CHECK (regularity_score IS NULL OR regularity_score BETWEEN 0 AND 100),
  generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, week_start)
);

-- ============================================================
-- SUBSCRIPTIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
  stripe_customer_id TEXT NOT NULL,
  stripe_subscription_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'trialing')),
  plan TEXT NOT NULL DEFAULT 'premium',
  current_period_end TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ANALYTICS EVENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  event TEXT NOT NULL,
  properties JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.onboarding_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Users can only read/write their own data
CREATE POLICY "Users can view own data" ON public.users
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can manage own profile" ON public.onboarding_profiles
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own logs" ON public.daily_logs
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own actions" ON public.actions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own reports" ON public.weekly_reports
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own subscription" ON public.subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own events" ON public.analytics_events
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_daily_logs_user_date ON public.daily_logs(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_actions_user_date ON public.actions(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_weekly_reports_user_week ON public.weekly_reports(user_id, week_start DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_event ON public.analytics_events(event, created_at DESC);

-- ============================================================
-- FUNCTIONS
-- ============================================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_users
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_onboarding
  BEFORE UPDATE ON public.onboarding_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_daily_logs
  BEFORE UPDATE ON public.daily_logs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_subscriptions
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
