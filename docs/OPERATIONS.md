# VOLT Sleep — Operations Runbook

> Troubleshooting, monitoring, and maintenance procedures.

---

## 1. Webhook Troubleshooting

### Stripe webhook not firing

**Symptoms:** Payments succeed in Stripe but `subscriptions` table not updated.

**Diagnosis:**
```bash
# Check Stripe webhook logs
# Dashboard → Developers → Webhooks → Select endpoint → Recent deliveries
```

**Common causes:**

| Cause | Fix |
|-------|-----|
| Wrong endpoint URL | Update webhook URL to `https://your-domain.com/api/stripe/webhook` |
| Wrong signing secret | Re-copy STRIPE_WEBHOOK_SECRET from Stripe dashboard |
| Missing events | Ensure all 5 events are subscribed (see DEPLOYMENT.md) |
| 400 response | Check Vercel function logs for signature verification errors |
| 500 response | Check Vercel function logs for DB errors |
| Timeout (>10s) | Optimize DB queries, check Supabase status |

**Manual fix for missed webhook:**
```sql
-- If a user paid but plan is still 'free':
UPDATE users SET plan = 'premium' WHERE id = '<user_id>';
INSERT INTO subscriptions (user_id, stripe_customer_id, stripe_subscription_id, status, plan, current_period_end)
VALUES ('<user_id>', '<cus_xxx>', '<sub_xxx>', 'active', 'premium', '<end_date>');
```

### Webhook signature verification failing

1. Ensure `STRIPE_WEBHOOK_SECRET` starts with `whsec_`
2. Ensure the webhook endpoint reads raw body (not JSON-parsed)
3. Check that the Vercel env var matches the Stripe signing secret exactly

---

## 2. RLS Checks

### Verify RLS is enabled

```sql
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('users', 'onboarding_profiles', 'daily_logs',
                  'actions', 'weekly_reports', 'subscriptions', 'analytics_events');
```

**Expected:** All `rowsecurity = true`.

### Verify policies exist

```sql
SELECT tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE schemaname = 'public';
```

### Cross-user isolation test

```sql
-- As user A, try to read user B's data:
-- (use Supabase client with user A's JWT)
-- Expected: 0 rows returned

-- Service role (admin) should see all data:
-- (use SUPABASE_SERVICE_ROLE_KEY)
SELECT COUNT(*) FROM daily_logs; -- should return total count
```

---

## 3. Premium Gating Verification

### Server-side check (API routes)

All premium features check `users.plan = 'premium'`:
- `/api/engine/weekly-report` → returns 403 for free users
- Daily card LLM enhancement → disabled for free users

### Client-side check (UI)

- Progress page: weekly report section hidden for free
- Cognitive Switch: redirects to paywall for free
- Paywall: shows upgrade options

### Test premium flow

```
1. Create test user (free)
2. Verify weekly report returns 403
3. Subscribe via Stripe test mode
4. Verify webhook fires → user.plan = 'premium'
5. Verify weekly report returns 200
6. Cancel subscription in Stripe
7. Verify user.plan = 'free' after webhook
8. Verify weekly report returns 403 again
```

---

## 4. GDPR Compliance

### Data deletion flow

`POST /api/account/delete` performs:
1. Cancel active Stripe subscription
2. Delete `analytics_events` for user
3. Delete `weekly_reports` for user
4. Delete `actions` for user
5. Delete `daily_logs` for user
6. Delete `subscriptions` for user
7. Delete `onboarding_profiles` for user
8. Delete `users` record
9. Delete Supabase auth user

### Verify deletion

```sql
-- After deletion, verify NO data remains:
SELECT * FROM users WHERE id = '<deleted_user_id>';
SELECT * FROM daily_logs WHERE user_id = '<deleted_user_id>';
SELECT * FROM onboarding_profiles WHERE user_id = '<deleted_user_id>';
-- All should return 0 rows
```

### Data export (manual, for GDPR request)

```sql
-- Export all user data as JSON:
SELECT json_build_object(
  'user', (SELECT row_to_json(u) FROM users u WHERE u.id = '<user_id>'),
  'profile', (SELECT row_to_json(p) FROM onboarding_profiles p WHERE p.user_id = '<user_id>'),
  'logs', (SELECT json_agg(row_to_json(l)) FROM daily_logs l WHERE l.user_id = '<user_id>'),
  'actions', (SELECT json_agg(row_to_json(a)) FROM actions a WHERE a.user_id = '<user_id>'),
  'reports', (SELECT json_agg(row_to_json(r)) FROM weekly_reports r WHERE r.user_id = '<user_id>')
);
```

---

## 5. Decision Engine Monitoring

### LLM failures

Check Vercel function logs for:
```
[VOLT LLM] API error: 429     → Rate limited by Anthropic
[VOLT LLM] API error: 500     → Anthropic service issue
[VOLT LLM] Request timed out  → Network or Anthropic latency
[VOLT LLM] Output validation  → Model output doesn't match schema
[VOLT LLM] Medical language   → Output contained medical terms
[VOLT LLM] Prompt injection   → User data contained injection attempt
```

**All LLM failures fall back to rules-only output.** Users always get a card.

### Rules engine fallback verification

```sql
-- Count cards by generation method:
SELECT generated_by_version, COUNT(*)
FROM actions
WHERE date > CURRENT_DATE - INTERVAL '7 days'
GROUP BY generated_by_version;
```

**Expected:** Mix of `rules-v1` (free users, LLM failures) and `llm-v1` (premium, success).

---

## 6. Rate Limiting

### Current limits (in-memory)

| Bucket | Limit | Window |
|--------|-------|--------|
| api (general) | 60 req | 60s |
| engine | 10 req | 60s |
| checkout | 5 req | 60s |
| analytics | 100 req | 60s |
| auth | 10 req | 300s |

### Production upgrade

For production with multiple Vercel instances, replace in-memory rate limiter with Upstash Redis:

```bash
npm install @upstash/ratelimit @upstash/redis
```

```typescript
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '60 s'),
})
```

---

## 7. Analytics Funnel

### Key queries

```sql
-- D1 retention (users who came back day after signup)
WITH signups AS (
  SELECT DISTINCT user_id, DATE(created_at) as signup_date
  FROM analytics_events WHERE event = 'signup_completed'
),
day1 AS (
  SELECT DISTINCT user_id, DATE(created_at) as activity_date
  FROM analytics_events WHERE event = 'daily_card_viewed'
)
SELECT
  s.signup_date,
  COUNT(DISTINCT s.user_id) as signups,
  COUNT(DISTINCT d.user_id) as returned_d1,
  ROUND(COUNT(DISTINCT d.user_id)::numeric / NULLIF(COUNT(DISTINCT s.user_id), 0) * 100, 1) as d1_retention_pct
FROM signups s
LEFT JOIN day1 d ON s.user_id = d.user_id AND d.activity_date = s.signup_date + 1
GROUP BY s.signup_date
ORDER BY s.signup_date DESC;

-- Conversion funnel
SELECT event, COUNT(DISTINCT user_id) as unique_users
FROM analytics_events
WHERE event IN ('signup_completed', 'onboarding_completed', 'daily_card_viewed',
                'primary_action_completed', 'paywall_viewed', 'subscription_started')
GROUP BY event;

-- Primary action completion rate
SELECT
  COUNT(*) FILTER (WHERE completed_primary) as completed,
  COUNT(*) as total,
  ROUND(COUNT(*) FILTER (WHERE completed_primary)::numeric / NULLIF(COUNT(*), 0) * 100, 1) as rate_pct
FROM actions
WHERE date > CURRENT_DATE - INTERVAL '7 days';
```

---

## 8. Retention & Growth Queries

### D1 / D7 retention

```sql
-- D1 retention (% of users who return 1 day after signup)
WITH signups AS (
  SELECT DISTINCT user_id, DATE(created_at) as signup_date
  FROM analytics_events WHERE event = 'signup_completed'
),
d1 AS (
  SELECT DISTINCT user_id, DATE(created_at) as activity_date
  FROM analytics_events WHERE event = 'daily_card_viewed'
)
SELECT
  s.signup_date,
  COUNT(DISTINCT s.user_id) as signups,
  COUNT(DISTINCT d.user_id) as returned_d1,
  ROUND(COUNT(DISTINCT d.user_id)::numeric / NULLIF(COUNT(DISTINCT s.user_id), 0) * 100, 1) as d1_retention_pct
FROM signups s
LEFT JOIN d1 d ON s.user_id = d.user_id AND d.activity_date = s.signup_date + 1
GROUP BY s.signup_date
ORDER BY s.signup_date DESC
LIMIT 30;

-- D7 retention (% of users active 7 days after signup)
WITH signups AS (
  SELECT DISTINCT user_id, DATE(created_at) as signup_date
  FROM analytics_events WHERE event = 'signup_completed'
),
d7 AS (
  SELECT DISTINCT user_id, DATE(created_at) as activity_date
  FROM analytics_events WHERE event = 'daily_card_viewed'
)
SELECT
  s.signup_date,
  COUNT(DISTINCT s.user_id) as signups,
  COUNT(DISTINCT d.user_id) as returned_d7,
  ROUND(COUNT(DISTINCT d.user_id)::numeric / NULLIF(COUNT(DISTINCT s.user_id), 0) * 100, 1) as d7_retention_pct
FROM signups s
LEFT JOIN d7 d ON s.user_id = d.user_id AND d.activity_date = s.signup_date + 7
GROUP BY s.signup_date
ORDER BY s.signup_date DESC
LIMIT 30;
```

### Conversion rate (free → premium)

```sql
-- Free-to-premium conversion rate
SELECT
  COUNT(*) FILTER (WHERE plan = 'premium') as premium_users,
  COUNT(*) as total_users,
  ROUND(COUNT(*) FILTER (WHERE plan = 'premium')::numeric / NULLIF(COUNT(*), 0) * 100, 1) as conversion_pct
FROM users
WHERE onboarding_completed = true;

-- Conversion by energy profile (which profiles convert best?)
SELECT
  op.energy_profile,
  COUNT(*) FILTER (WHERE u.plan = 'premium') as premium,
  COUNT(*) as total,
  ROUND(COUNT(*) FILTER (WHERE u.plan = 'premium')::numeric / NULLIF(COUNT(*), 0) * 100, 1) as pct
FROM users u
JOIN onboarding_profiles op ON u.id = op.user_id
GROUP BY op.energy_profile
ORDER BY pct DESC;
```

### Daily Active Users (DAU)

```sql
-- DAU for last 30 days
SELECT
  DATE(created_at) as date,
  COUNT(DISTINCT user_id) as dau
FROM analytics_events
WHERE event IN ('daily_card_viewed', 'checkin_completed_morning', 'checkin_completed_night')
  AND created_at > CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- WAU (Weekly Active Users)
SELECT
  DATE_TRUNC('week', created_at) as week,
  COUNT(DISTINCT user_id) as wau
FROM analytics_events
WHERE event IN ('daily_card_viewed', 'checkin_completed_morning')
  AND created_at > CURRENT_DATE - INTERVAL '12 weeks'
GROUP BY week
ORDER BY week DESC;
```

### Referral tracking

```sql
-- Referral funnel
SELECT
  status,
  COUNT(*) as count
FROM referrals
GROUP BY status;

-- Top referrers
SELECT
  r.referrer_id,
  u.email,
  COUNT(*) as referrals,
  COUNT(*) FILTER (WHERE r.status = 'converted') as converted
FROM referrals r
JOIN users u ON r.referrer_id = u.id
GROUP BY r.referrer_id, u.email
ORDER BY referrals DESC
LIMIT 20;
```

### Demo mode analytics

```sql
-- Demo card generations (growth signal)
SELECT
  DATE(created_at) as date,
  COUNT(*) as demo_cards
FROM analytics_events
WHERE event = 'demo_card_generated'
  AND created_at > CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

### i18n locale distribution

```sql
-- Users by locale
SELECT locale, COUNT(*) as users
FROM users
GROUP BY locale
ORDER BY users DESC;
```

---

## 9. Rollback Procedure

### Vercel

1. Go to Vercel dashboard → Deployments
2. Find the last working deployment
3. Click "..." → **Promote to Production**
4. Instant rollback, no downtime

### Database

If a schema migration breaks:

```sql
-- Check current state
SELECT * FROM pg_tables WHERE schemaname = 'public';

-- Supabase has automatic backups
-- Go to Database → Backups → Restore to point-in-time
```

### Stripe

Stripe webhooks have automatic retry (up to 3 days). If webhook endpoint was down:
1. Fix the endpoint
2. Stripe will retry failed deliveries automatically
3. Or manually replay events in Stripe dashboard

---

## 9. Health Check Endpoints

Add a simple health check (optional):

```
GET /api/health → { status: 'ok', timestamp: '...' }
```

Monitor with: Vercel Analytics, UptimeRobot, or Better Uptime.

---

## 11. Cost Monitoring

### Supabase
- Free tier: 50MB DB, 1GB bandwidth, 50K auth users
- Pro ($25/mo): 8GB DB, 250GB bandwidth

### Stripe
- 1.4% + €0.25 per EU card transaction
- No monthly fee

### Anthropic (LLM)
- Claude Haiku: ~$0.001 per daily card generation
- Only for premium users
- ~€1/month per daily active premium user
- Monitor in Anthropic Console → Usage

### Vercel
- Free tier: 100GB bandwidth, serverless functions
- Pro ($20/mo): 1TB bandwidth

---

## 12. Revenue Analytics Dashboard

### Activation Rate

```sql
-- Activation rate (users who completed onboarding + viewed card + checked in within 48h)
SELECT
  DATE_TRUNC('week', u.created_at) as cohort_week,
  COUNT(*) as total_users,
  COUNT(*) FILTER (WHERE u.activated_at IS NOT NULL) as activated,
  ROUND(
    COUNT(*) FILTER (WHERE u.activated_at IS NOT NULL)::numeric
    / NULLIF(COUNT(*), 0) * 100, 1
  ) as activation_rate_pct
FROM users u
WHERE u.onboarding_completed = true
GROUP BY cohort_week
ORDER BY cohort_week DESC
LIMIT 12;
```

### D1 / D7 Retention

```sql
-- D1 retention by cohort
WITH cohorts AS (
  SELECT user_id, DATE(MIN(created_at)) as signup_date
  FROM analytics_events WHERE event = 'signup_completed'
  GROUP BY user_id
),
activity AS (
  SELECT DISTINCT user_id, DATE(created_at) as active_date
  FROM analytics_events
  WHERE event IN ('daily_card_viewed', 'checkin_completed_morning', 'checkin_completed_night')
)
SELECT
  c.signup_date,
  COUNT(DISTINCT c.user_id) as cohort_size,
  COUNT(DISTINCT CASE WHEN a.active_date = c.signup_date + 1 THEN c.user_id END) as d1_retained,
  COUNT(DISTINCT CASE WHEN a.active_date = c.signup_date + 7 THEN c.user_id END) as d7_retained,
  ROUND(COUNT(DISTINCT CASE WHEN a.active_date = c.signup_date + 1 THEN c.user_id END)::numeric
    / NULLIF(COUNT(DISTINCT c.user_id), 0) * 100, 1) as d1_pct,
  ROUND(COUNT(DISTINCT CASE WHEN a.active_date = c.signup_date + 7 THEN c.user_id END)::numeric
    / NULLIF(COUNT(DISTINCT c.user_id), 0) * 100, 1) as d7_pct
FROM cohorts c
LEFT JOIN activity a ON c.user_id = a.user_id
GROUP BY c.signup_date
ORDER BY c.signup_date DESC
LIMIT 30;
```

### Free → Premium Conversion

```sql
-- Conversion rate with experiment variant breakdown
SELECT
  COALESCE(ea.variant, 'no_experiment') as pricing_variant,
  COUNT(DISTINCT u.id) as total_users,
  COUNT(DISTINCT u.id) FILTER (WHERE u.plan = 'premium') as premium_users,
  ROUND(
    COUNT(DISTINCT u.id) FILTER (WHERE u.plan = 'premium')::numeric
    / NULLIF(COUNT(DISTINCT u.id), 0) * 100, 1
  ) as conversion_pct
FROM users u
LEFT JOIN experiment_assignments ea
  ON u.id = ea.user_id AND ea.experiment_id = 'pricing_test'
WHERE u.onboarding_completed = true
GROUP BY COALESCE(ea.variant, 'no_experiment')
ORDER BY conversion_pct DESC;
```

### ARPU (Average Revenue Per User)

```sql
-- Monthly ARPU (active users only)
WITH monthly_revenue AS (
  SELECT
    DATE_TRUNC('month', s.created_at) as month,
    SUM(CASE
      WHEN s.plan = 'premium' AND s.status = 'active' THEN 9.99
      ELSE 0
    END) as revenue
  FROM subscriptions s
  GROUP BY month
),
monthly_active AS (
  SELECT
    DATE_TRUNC('month', created_at) as month,
    COUNT(DISTINCT user_id) as active_users
  FROM analytics_events
  WHERE event = 'daily_card_viewed'
  GROUP BY month
)
SELECT
  r.month,
  r.revenue,
  a.active_users,
  ROUND(r.revenue / NULLIF(a.active_users, 0), 2) as arpu
FROM monthly_revenue r
JOIN monthly_active a ON r.month = a.month
ORDER BY r.month DESC
LIMIT 12;
```

### LTV Estimate

```sql
-- LTV = ARPU × Average Lifetime (months)
WITH user_lifetimes AS (
  SELECT
    user_id,
    EXTRACT(EPOCH FROM (
      COALESCE(MAX(created_at), NOW()) - MIN(created_at)
    )) / (30 * 86400) as lifetime_months
  FROM analytics_events
  GROUP BY user_id
  HAVING COUNT(*) > 1
)
SELECT
  ROUND(AVG(lifetime_months), 1) as avg_lifetime_months,
  ROUND(AVG(lifetime_months) * 9.99, 2) as estimated_ltv
FROM user_lifetimes;
```

### Churn Rate

```sql
-- Monthly churn rate
WITH monthly_active AS (
  SELECT
    DATE_TRUNC('month', created_at) as month,
    user_id
  FROM analytics_events
  WHERE event IN ('daily_card_viewed', 'checkin_completed_morning')
  GROUP BY month, user_id
)
SELECT
  a.month,
  COUNT(DISTINCT a.user_id) as active_users,
  COUNT(DISTINCT a.user_id) FILTER (
    WHERE a.user_id NOT IN (
      SELECT user_id FROM monthly_active
      WHERE month = a.month + INTERVAL '1 month'
    )
  ) as churned,
  ROUND(
    COUNT(DISTINCT a.user_id) FILTER (
      WHERE a.user_id NOT IN (
        SELECT user_id FROM monthly_active
        WHERE month = a.month + INTERVAL '1 month'
      )
    )::numeric / NULLIF(COUNT(DISTINCT a.user_id), 0) * 100, 1
  ) as churn_rate_pct
FROM monthly_active a
GROUP BY a.month
ORDER BY a.month DESC
LIMIT 12;
```

### Referral Conversion

```sql
-- Referral funnel + conversion
SELECT
  COUNT(*) as total_referrals,
  COUNT(*) FILTER (WHERE status = 'signed_up') as signed_up,
  COUNT(*) FILTER (WHERE status = 'converted') as converted,
  ROUND(
    COUNT(*) FILTER (WHERE status = 'converted')::numeric
    / NULLIF(COUNT(*), 0) * 100, 1
  ) as referral_conversion_pct,
  SUM(reward_days_granted) as total_reward_days
FROM referrals;

-- Top referrers with reward tracking
SELECT
  u.email,
  COUNT(r.*) as referrals,
  COUNT(r.*) FILTER (WHERE r.status = 'converted') as converted,
  SUM(r.reward_days_granted) as days_earned
FROM referrals r
JOIN users u ON r.referrer_id = u.id
GROUP BY u.email
ORDER BY referrals DESC
LIMIT 20;
```

### Onboarding Funnel (Friction Audit)

```sql
-- Drop-off per onboarding step
SELECT
  (properties->>'step')::int as step,
  COUNT(DISTINCT user_id) as users_reached,
  AVG((properties->>'time_on_step_ms')::numeric / 1000) as avg_seconds_on_step
FROM analytics_events
WHERE event = 'onboarding_step_completed'
GROUP BY step
ORDER BY step;

-- Abandonment events
SELECT
  (properties->>'last_step')::int as abandoned_at_step,
  COUNT(*) as abandonments
FROM analytics_events
WHERE event = 'onboarding_abandoned'
GROUP BY abandoned_at_step
ORDER BY abandoned_at_step;
```

### Experiment Results

```sql
-- A/B test results (pricing)
SELECT
  ea.variant,
  COUNT(DISTINCT ea.user_id) as users,
  COUNT(DISTINCT ea.user_id) FILTER (WHERE ea.converted) as conversions,
  ROUND(
    COUNT(DISTINCT ea.user_id) FILTER (WHERE ea.converted)::numeric
    / NULLIF(COUNT(DISTINCT ea.user_id), 0) * 100, 1
  ) as conversion_rate_pct
FROM experiment_assignments ea
WHERE ea.experiment_id = 'pricing_test'
GROUP BY ea.variant
ORDER BY conversion_rate_pct DESC;
```

---

## 13. Weekly Growth Report

Run these queries weekly (via Supabase Edge Function or manual SQL) and review:

```sql
-- VOLT Sleep Weekly Growth Report
-- Run: Every Monday, covers previous 7 days
-- ================================================

-- 1. USER METRICS
SELECT
  'Users' as metric,
  COUNT(*) as total,
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '7 days') as new_this_week,
  COUNT(*) FILTER (WHERE onboarding_completed = true) as onboarded,
  COUNT(*) FILTER (WHERE activated_at IS NOT NULL) as activated,
  COUNT(*) FILTER (WHERE plan = 'premium') as premium
FROM users;

-- 2. ACTIVE USERS
SELECT
  'DAU (avg)' as metric,
  ROUND(AVG(dau)) as value
FROM (
  SELECT DATE(created_at), COUNT(DISTINCT user_id) as dau
  FROM analytics_events
  WHERE event IN ('daily_card_viewed', 'checkin_completed_morning')
    AND created_at > NOW() - INTERVAL '7 days'
  GROUP BY DATE(created_at)
) daily;

-- 3. REVENUE (estimated)
SELECT
  'Revenue' as metric,
  COUNT(*) FILTER (WHERE status = 'active' AND plan = 'premium') as paying_users,
  ROUND(
    COUNT(*) FILTER (WHERE status = 'active' AND plan = 'premium') * 9.99, 2
  ) as estimated_mrr
FROM subscriptions;

-- 4. CONVERSION
SELECT
  'Conversion' as metric,
  ROUND(
    COUNT(*) FILTER (WHERE plan = 'premium')::numeric
    / NULLIF(COUNT(*), 0) * 100, 1
  ) as free_to_premium_pct
FROM users WHERE onboarding_completed = true;

-- 5. RETENTION (D7 for last week's cohort)
WITH last_week_signups AS (
  SELECT DISTINCT user_id
  FROM analytics_events
  WHERE event = 'signup_completed'
    AND created_at BETWEEN NOW() - INTERVAL '14 days' AND NOW() - INTERVAL '7 days'
),
d7_activity AS (
  SELECT DISTINCT user_id
  FROM analytics_events
  WHERE event = 'daily_card_viewed'
    AND created_at > NOW() - INTERVAL '7 days'
)
SELECT
  'D7 Retention' as metric,
  COUNT(DISTINCT s.user_id) as cohort_size,
  COUNT(DISTINCT d.user_id) as retained,
  ROUND(
    COUNT(DISTINCT d.user_id)::numeric
    / NULLIF(COUNT(DISTINCT s.user_id), 0) * 100, 1
  ) as d7_pct
FROM last_week_signups s
LEFT JOIN d7_activity d ON s.user_id = d.user_id;

-- 6. LLM COST (from cost_telemetry — check application logs)
-- Use getDailyCostSummary() from src/lib/cost-telemetry.ts
-- Estimated: ~€0.001 per card × premium DAU × 7 days

-- 7. MARGIN ESTIMATE
-- Revenue - (Supabase + Vercel + LLM cost) / Revenue × 100
-- At scale: ~85-90% margin (LLM cost is primary variable)
```

### Report Format

```
VOLT Sleep Weekly Report — Week of [DATE]
==========================================
Users:      [total] (+[new] this week)
Activated:  [count] ([pct]% activation rate)
DAU:        [avg daily]
Premium:    [count] ([pct]% conversion)
MRR:        €[amount]
D7 Ret:     [pct]%
LLM Cost:   €[amount] (margin: [pct]%)
Referrals:  [new] this week ([converted] converted)
==========================================
Top action: [focus area for next week]
```
