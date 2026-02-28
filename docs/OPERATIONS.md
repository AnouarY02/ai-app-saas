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

## 8. Rollback Procedure

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

## 10. Cost Monitoring

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
