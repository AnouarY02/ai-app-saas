# VOLT Sleep — Deployment Guide

> Production deployment: Supabase + Stripe + Vercel

---

## Prerequisites

- Node.js 18+
- Supabase account (https://supabase.com)
- Stripe account (https://stripe.com)
- Anthropic API key (https://console.anthropic.com)
- Vercel account (https://vercel.com)
- Domain name (optional, recommended)

---

## 1. Supabase Setup (Option A: Dedicated Project — Recommended)

### 1.1 Create Project

1. Go to https://supabase.com/dashboard
2. Click **New Project**
3. Name: `volt-sleep-prod`
4. Region: **EU (Frankfurt)** — closest to NL users
5. Database password: generate strong, store securely
6. Wait for project to provision

### 1.2 Run Database Schema

1. Go to **SQL Editor** in Supabase dashboard
2. Copy the contents of `supabase/schema.sql`
3. Run the entire script
4. Verify in **Table Editor**: 7 tables created

### 1.3 Configure Auth

1. Go to **Authentication → Providers**
2. Enable **Email** (magic link only — disable password signups for low friction)
3. Go to **Authentication → URL Configuration**
4. Set **Site URL**: `https://your-domain.com`
5. Add **Redirect URLs**:
   - `https://your-domain.com/auth/callback`
   - `http://localhost:3000/auth/callback` (dev)
6. Go to **Authentication → Email Templates**
7. Customize magic link email (optional, add VOLT Sleep branding)

### 1.4 Verify RLS Policies

Run this in SQL Editor to verify RLS is active:

```sql
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('users', 'onboarding_profiles', 'daily_logs',
                  'actions', 'weekly_reports', 'subscriptions',
                  'analytics_events');
```

All rows should show `rowsecurity = true`.

### 1.5 RLS Cross-User Isolation Test

```sql
-- Test: user A should NOT see user B's data
-- Run as anon role with user A's JWT
SELECT * FROM daily_logs WHERE user_id = '<user_b_id>';
-- Expected: 0 rows (RLS blocks)
```

### 1.6 Get API Keys

1. Go to **Project Settings → API**
2. Copy:
   - **URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

> **CRITICAL**: The service_role key bypasses RLS. Never expose it client-side.

---

## 1-ALT. Supabase Setup (Option B: Shared Project, Separate Schema)

If you must share a Supabase project with other apps:

```sql
-- Create dedicated schema
CREATE SCHEMA IF NOT EXISTS volt_sleep;

-- Move all tables to volt_sleep schema
-- (modify schema.sql: replace all 'public.' with 'volt_sleep.')
-- Then run the modified schema.sql
```

Update all Supabase queries in the app to use the schema prefix:
```typescript
supabase.schema('volt_sleep').from('daily_logs')...
```

---

## 2. Stripe Setup

### 2.1 Create Product

1. Go to https://dashboard.stripe.com/products
2. Click **Add Product**
3. Name: `VOLT Sleep Premium`
4. Description: `Adaptive energy coaching met weekly reports, cognitive switch, en meer.`

### 2.2 Create Prices

Add 2 prices to the product:

| Price | Amount | Interval | Trial |
|-------|--------|----------|-------|
| Monthly | €9.99 | Monthly | 7 days |
| Yearly | €69.00 | Yearly | 7 days |

Copy the price IDs:
- Monthly → `STRIPE_PRICE_MONTHLY`
- Yearly → `STRIPE_PRICE_YEARLY`

### 2.3 Configure Webhook

1. Go to **Developers → Webhooks**
2. Click **Add Endpoint**
3. URL: `https://your-domain.com/api/stripe/webhook`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
5. Copy **Signing secret** → `STRIPE_WEBHOOK_SECRET`

### 2.4 Payment Methods

Enable in **Settings → Payment Methods**:
- Card (default)
- iDEAL (Netherlands — critical for NL market)

### 2.5 Test Mode

Use Stripe test mode first:
- Test card: `4242 4242 4242 4242`, any future date, any CVC
- Test iDEAL: Stripe test bank accounts

---

## 3. Vercel Deploy

### 3.1 Import Project

1. Go to https://vercel.com/new
2. Import from GitHub: `AnouarY02/ai-app-saas`
3. Project name: `volt-sleep`
4. Framework: **Next.js** (auto-detected)
5. Root directory: leave as `.` (root)

### 3.2 Set Environment Variables

In Vercel project settings → **Environment Variables**, add ALL of these:

| Variable | Scope | Source | Notes |
|----------|-------|--------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Production + Preview | Supabase → Settings → API → URL | Public |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Production + Preview | Supabase → Settings → API → anon key | Public |
| `SUPABASE_SERVICE_ROLE_KEY` | Production + Preview | Supabase → Settings → API → service_role | **Server only** |
| `STRIPE_SECRET_KEY` | Production + Preview | Stripe → Developers → API keys → Secret key | Server only |
| `STRIPE_WEBHOOK_SECRET` | Production only | Stripe → Developers → Webhooks → Signing secret | Server only |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Production + Preview | Stripe → Developers → API keys → Publishable key | Public |
| `STRIPE_PRICE_MONTHLY` | Production + Preview | Stripe → Products → Price ID (monthly) | Server only |
| `STRIPE_PRICE_YEARLY` | Production + Preview | Stripe → Products → Price ID (yearly) | Server only |
| `ANTHROPIC_API_KEY` | Production + Preview | Anthropic → Console → API keys | Server only |
| `NEXT_PUBLIC_APP_URL` | Production | Your production URL | `https://voltsleep.nl` |
| `LLM_MODE` | Production + Preview | Set to `full`, `reduced`, or `rules-only` | Server only, default: `full` |
| `APPLE_SHARED_SECRET` | Production | App Store Connect → Shared Secret | Server only (iOS IAP) |
| `GOOGLE_PLAY_SERVICE_ACCOUNT_KEY` | Production | Google Cloud Console → Service Account JSON | Server only (Android IAP) |
| `NEXT_PUBLIC_TIKTOK_PIXEL_ID` | Production only | TikTok Ads → Events → Pixel ID | Optional, marketing |
| `NEXT_PUBLIC_META_PIXEL_ID` | Production only | Meta Events Manager → Pixel ID | Optional, marketing |

**Environment Variable Mapping:**

If your local `.env` uses different key names, see the mapping table in `.env.example`.

**CLI alternative (faster):**
```bash
# Set multiple vars at once via Vercel CLI
npx vercel env add NEXT_PUBLIC_SUPABASE_URL production preview
npx vercel env add SUPABASE_SERVICE_ROLE_KEY production preview
# Repeat for each variable
```

> **Security rule:** Variables without `NEXT_PUBLIC_` prefix are server-only and never exposed to the browser. Double-check by searching the production JS bundle: `curl -s https://your-domain.com | grep -i "service_role"` → must return nothing.

### 3.3 Deploy

```bash
# Option A: Auto-deploy via git push
git push origin main

# Option B: Manual
npx vercel --prod
```

### 3.4 Custom Domain (Optional)

1. In Vercel → **Domains** → Add domain
2. Set DNS records as instructed
3. SSL is automatic
4. Update `NEXT_PUBLIC_APP_URL` to the custom domain
5. Update Supabase redirect URLs
6. Update Stripe webhook endpoint URL

---

## 4. Post-Deploy Verification

### 4.1 Smoke Test Checklist

```
CORE FLOW:
[ ] Landing page loads at /
[ ] Signup with magic link works
[ ] Magic link email received
[ ] Auth callback redirects to /onboarding
[ ] Onboarding 5 steps complete
[ ] Dashboard shows Daily Energy Card
[ ] Morning check-in saves data
[ ] Night check-in saves data
[ ] Progress page loads (free: 7 days)

PAYMENTS (Web):
[ ] Paywall page loads with correct prices
[ ] Stripe checkout opens (test mode)
[ ] After payment: user.plan = 'premium'
[ ] Webhook fires: subscription created in DB

PREMIUM FEATURES:
[ ] Weekly report generates (premium only)
[ ] Cognitive Switch works (premium only)
[ ] Free users see paywall when accessing premium features

GDPR / ACCOUNT:
[ ] Settings: logout works
[ ] Settings: data export downloads JSON (GET /api/account/export)
[ ] Settings: account deletion cancels subscription + deletes all data
[ ] Deleted user cannot login

LEGAL PAGES:
[ ] /privacy loads with AI processing section
[ ] /terms loads with medical disclaimer

SECURITY:
[ ] No service_role key in client JS bundle
[ ] Rate limiting returns 429 after threshold
[ ] CSP headers present on all pages
```

### 4.2 Security Verification

```bash
# Check that SUPABASE_SERVICE_ROLE_KEY is NOT in client bundle:
curl -s https://your-domain.com/_next/static/chunks/*.js | grep -i "service_role"
# Expected: no matches

# Check rate limiting works:
for i in {1..15}; do
  curl -s -o /dev/null -w "%{http_code}\n" -X POST https://your-domain.com/api/engine/daily-card
done
# Expected: 429 after 10 requests
```

### 4.3 Analytics Verification

```sql
-- In Supabase SQL Editor:
SELECT event, COUNT(*) as count
FROM analytics_events
WHERE created_at > NOW() - INTERVAL '1 day'
GROUP BY event
ORDER BY count DESC;
```

---

## 5. Environment Separation

| Environment | Supabase | Stripe | Domain |
|-------------|----------|--------|--------|
| Development | `volt-sleep-dev` | Test mode | localhost:3000 |
| Staging | `volt-sleep-dev` | Test mode | preview URLs |
| Production | `volt-sleep-prod` | Live mode | voltsleep.nl |

---

## 6. Backup & Recovery

### Supabase
- Enable **Point-in-Time Recovery** (PITR) in project settings
- Daily backups are automatic on Pro plan
- Test restore procedure quarterly

### Stripe
- All payment data is in Stripe (single source of truth)
- Local subscription table is a cache — can be rebuilt from Stripe

### Code
- All code in GitHub with branch protection
- Vercel keeps deployment history (instant rollback)
