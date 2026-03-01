# VOLT Sleep — Manual Setup Checklist

> Steps that require manual action — accounts, API keys, dashboard clicks.
> Everything else is automated in the codebase.

---

## PART 1: VERCEL DEPLOYMENT

### 1.1 Accounts Needed

| Account | URL | What You Need |
|---------|-----|---------------|
| Vercel | https://vercel.com | Free plan is fine. Connect to GitHub. |
| Supabase | https://supabase.com | Free plan to start. EU (Frankfurt) region. |
| Stripe | https://stripe.com | Activate account for live payments (requires business verification). |
| Anthropic | https://console.anthropic.com | API key for Claude LLM features. |

### 1.2 Vercel Project Setup

```bash
# From repo root:
npx vercel login
npx vercel           # Links project, creates preview
npx vercel --prod    # Deploys to production
```

After first deploy, note your production URL (e.g., `volt-sleep.vercel.app` or custom domain).

### 1.3 Set Vercel Environment Variables

Go to: **Vercel Dashboard → Project → Settings → Environment Variables**

Add these (values from your `C:/AI-Factory/.env` or equivalent):

| Variable | Scope | Where to Find |
|----------|-------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | All | Supabase → Settings → API → URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | All | Supabase → Settings → API → anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | All | Supabase → Settings → API → service_role key |
| `STRIPE_SECRET_KEY` | All | Stripe → Developers → API keys → Secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | All | Stripe → Developers → API keys → Publishable key |
| `STRIPE_WEBHOOK_SECRET` | Production | Stripe → Developers → Webhooks → Signing secret |
| `STRIPE_PRICE_MONTHLY` | All | Stripe → Products → Price ID (monthly) |
| `STRIPE_PRICE_YEARLY` | All | Stripe → Products → Price ID (yearly) |
| `ANTHROPIC_API_KEY` | All | Anthropic → Console → API keys |
| `NEXT_PUBLIC_APP_URL` | Production | Your production URL |
| `LLM_MODE` | All | `full` (default) |

### 1.4 Supabase Configuration

**Database:**
1. Go to SQL Editor
2. Run `supabase/schema.sql`
3. Run `supabase/migrations/004_content_ops.sql` (content marketing tables)
4. Run `supabase/migrations/005_seed_content_hooks.sql` (50 hooks)
5. Verify: Table Editor shows all tables

**Auth:**
1. Go to Authentication → Providers → Enable Email (magic link)
2. Go to Authentication → URL Configuration:
   - **Site URL:** `https://your-production-url.com`
   - **Redirect URLs:**
     - `https://your-production-url.com/auth/callback`
     - `https://*.vercel.app/auth/callback` (preview deploys)
     - `http://localhost:3000/auth/callback` (local dev)
3. Go to Authentication → Email Templates → Customize magic link email (optional)

### 1.5 Stripe Configuration

**Product:**
1. Stripe Dashboard → Products → Add Product
2. Name: "VOLT Sleep Premium"
3. Add two prices:
   - Monthly: €9.99/month, 7-day trial
   - Yearly: €69/year, 7-day trial
4. Copy Price IDs → set in Vercel

**Webhook:**
1. Stripe Dashboard → Developers → Webhooks → Add Endpoint
2. URL: `https://your-production-url.com/api/stripe/webhook`
3. Events to subscribe:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
4. Copy Signing Secret → set in Vercel as `STRIPE_WEBHOOK_SECRET`

**Payment Methods:**
1. Settings → Payment Methods
2. Enable: Card + iDEAL (Netherlands)

### 1.6 Post-Deploy Verification

After deploying:
1. Visit production URL — landing page should load
2. Sign up with a real email — magic link should arrive
3. Complete onboarding — daily card should generate
4. Test Stripe checkout in test mode (`4242 4242 4242 4242`)
5. Verify webhook fires (check Stripe → Webhooks → Recent deliveries)
6. Test data export: `GET /api/account/export` (while logged in)
7. Test account deletion: Settings → Delete Account

---

## PART 2: MARKETING AUTOMATION

### 2.1 Accounts Needed

| Account | URL | What You Need | Required? |
|---------|-----|---------------|-----------|
| TikTok | https://www.tiktok.com | Creator account | Yes |
| TikTok for Developers | https://developers.tiktok.com | Content API key (for auto-posting) | No (manual post works) |
| Instagram | https://www.instagram.com | Professional/Creator account | Yes |
| Meta for Developers | https://developers.facebook.com | Graph API token (for auto-posting) | No |
| YouTube | https://www.youtube.com | Channel (Shorts enabled) | Yes |
| Google Cloud Console | https://console.cloud.google.com | YouTube Data API key | No |
| Facebook | https://www.facebook.com | Page for Reels | Optional |
| X (Twitter) | https://x.com | Account for threads | Optional |
| n8n | https://n8n.cloud or self-host | Workflow automation | Recommended |

### 2.2 Content Setup

**Option A: n8n (automated)**
1. Sign up for n8n.cloud (or self-host)
2. Import `marketing/workflows/content-factory.json`
3. Connect Supabase credentials (URL + service role key)
4. Connect Anthropic API key
5. Activate workflow — runs daily at 06:00 UTC

**Option B: Manual**
1. Open `marketing/content-packs/day-1-to-7.md`
2. Film scripts (face to camera or voiceover + b-roll)
3. Edit in CapCut (follow overlay instructions)
4. Post at scheduled times: 09:00, 13:00, 19:00 local time
5. Add captions and hashtags from the script

### 2.3 Platform Setup

**TikTok:**
- Switch to Creator account
- Bio: "Energy coach for ambitious people"
- Link in bio: `https://voltsleep.nl?utm_source=tiktok&utm_medium=bio`
- Post 3x/day from content pack

**Instagram:**
- Switch to Professional/Creator account
- Bio: "1 action/day for better energy | Free app"
- Link in bio: `https://voltsleep.nl?utm_source=instagram&utm_medium=bio`
- Use Reels (not Stories) for maximum reach

**YouTube:**
- Create channel or use existing
- Shorts: upload vertical videos (<60s)
- Description: include UTM link
- Tags: energy, sleep, focus, caffeine, productivity

**Facebook (optional):**
- Create or use existing Page
- Post as Reels
- Similar captions, different hashtag style

### 2.4 Tracking Pixels (Optional)

**TikTok Pixel:**
1. TikTok Ads Manager → Events → Create Pixel
2. Copy Pixel ID → set as `NEXT_PUBLIC_TIKTOK_PIXEL_ID` in Vercel
3. Pixel fires only with user's marketing consent (GDPR)

**Meta Pixel:**
1. Meta Events Manager → Create Pixel
2. Copy Pixel ID → set as `NEXT_PUBLIC_META_PIXEL_ID` in Vercel
3. Same GDPR consent requirement

---

## PART 3: MOBILE APP (Future — When Ready)

### 3.1 Accounts Needed

| Account | URL | Cost | What You Need |
|---------|-----|------|---------------|
| Apple Developer | https://developer.apple.com | $99/year | For App Store submission |
| Google Play Console | https://play.google.com/console | $25 one-time | For Play Store submission |

### 3.2 Apple App Store

1. Enroll in Apple Developer Program ($99/year)
2. Create App ID: `nl.voltsleep.app`
3. Create In-App Purchase products:
   - `nl.voltsleep.premium.monthly` — €9.99/mo
   - `nl.voltsleep.premium.yearly` — €69/yr
4. Generate Shared Secret → set as `APPLE_SHARED_SECRET` in Vercel
5. Build iOS: `npx cap sync ios && npx cap open ios`
6. Archive and upload via Xcode

### 3.3 Google Play Store

1. Create developer account ($25 one-time)
2. Create app: "VOLT Sleep"
3. Create subscription products (same IDs as Apple)
4. Create service account for receipt validation
5. Download JSON key → set as `GOOGLE_PLAY_SERVICE_ACCOUNT_KEY` in Vercel
6. Build Android: `npx cap sync android && npx cap open android`
7. Generate signed AAB and upload

---

## PART 4: Quick Reference — What Goes Where

```
YOUR .env FILE (C:/AI-Factory/.env or equivalent)
  ↓ values read from here
  ↓
VERCEL ENV VARS
  ↓ set via dashboard or CLI
  ↓
RUNNING APP
  ↓ reads env vars at runtime
  ↓
USERS SEE THE APP
```

**Files to NEVER commit:**
- `.env`
- `.env.local`
- `C:/AI-Factory/.env`

**Files safe to commit:**
- `.env.example` (empty placeholders only)
- All code, docs, marketing content
