-- ============================================================
-- VOLT Sleep — Migration 002: Growth Engine
-- ============================================================
-- Adds: activation tracking, experiment assignments,
--        streak cache, referral rewards, re-engagement flags
-- ============================================================

-- 1. Activation tracking on users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS activated_at TIMESTAMPTZ DEFAULT NULL;

-- 2. Experiment assignments table
CREATE TABLE IF NOT EXISTS experiment_assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  experiment_id TEXT NOT NULL,
  variant TEXT NOT NULL,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  converted BOOLEAN DEFAULT FALSE,
  converted_at TIMESTAMPTZ DEFAULT NULL,
  UNIQUE(user_id, experiment_id)
);

-- RLS for experiment_assignments
ALTER TABLE experiment_assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own experiments"
  ON experiment_assignments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage experiments"
  ON experiment_assignments FOR ALL
  USING (auth.role() = 'service_role');

-- Index for fast lookup
CREATE INDEX IF NOT EXISTS idx_experiment_assignments_user
  ON experiment_assignments(user_id, experiment_id);

-- 3. Referral rewards tracking
ALTER TABLE referrals ADD COLUMN IF NOT EXISTS reward_days_granted INT DEFAULT 0;
ALTER TABLE referrals ADD COLUMN IF NOT EXISTS reward_granted_at TIMESTAMPTZ DEFAULT NULL;

-- 4. Re-engagement tracking
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_active_at TIMESTAMPTZ DEFAULT NULL;
ALTER TABLE users ADD COLUMN IF NOT EXISTS reengagement_sent_at TIMESTAMPTZ DEFAULT NULL;

-- 5. Update last_active_at trigger (fires on analytics event insert)
CREATE OR REPLACE FUNCTION update_last_active()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.user_id IS NOT NULL THEN
    UPDATE users SET last_active_at = NOW() WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_update_last_active ON analytics_events;
CREATE TRIGGER trg_update_last_active
  AFTER INSERT ON analytics_events
  FOR EACH ROW
  EXECUTE FUNCTION update_last_active();

-- 6. Indexes for growth queries
CREATE INDEX IF NOT EXISTS idx_analytics_events_activation
  ON analytics_events(user_id, event)
  WHERE event IN ('onboarding_completed', 'daily_card_viewed', 'checkin_completed_morning', 'checkin_completed_night');

CREATE INDEX IF NOT EXISTS idx_analytics_events_funnel
  ON analytics_events(event, created_at);

CREATE INDEX IF NOT EXISTS idx_users_activation
  ON users(activated_at)
  WHERE activated_at IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_users_reengagement
  ON users(last_active_at)
  WHERE onboarding_completed = true AND last_active_at IS NOT NULL;
