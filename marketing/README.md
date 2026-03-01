# VOLT Sleep — Complete Marketing Automation System

## Overview

Fully automated daily content production and publishing for TikTok, Instagram Reels, YouTube Shorts, and Facebook Reels.

**Output:** 3 short-form videos/day × 4 platforms = 12 posts/day
**Runtime:** n8n (self-hosted or cloud) OR manual CLI
**Cadence:** Daily at 06:00 UTC

---

## System Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    MARKETING PIPELINE                         │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐ │
│  │   IDEATION   │───►│  CREATION    │───►│   PUBLISHING     │ │
│  │              │    │              │    │                  │ │
│  │ content-     │    │ content-     │    │ auto-publisher   │ │
│  │ factory.json │    │ factory.json │    │ .json            │ │
│  │              │    │              │    │                  │ │
│  │ - Load hooks │    │ - Claude AI  │    │ - TikTok API     │ │
│  │ - 14-day     │    │   script gen │    │ - Instagram API  │ │
│  │   memory     │    │ - SRT subs   │    │ - YouTube API    │ │
│  │ - Weighted   │    │ - Captions   │    │ - Facebook API   │ │
│  │   selection  │    │ - Platform   │    │ - Error handling │ │
│  │              │    │   formatting │    │ - Auto-retry     │ │
│  └─────────────┘    └──────────────┘    └──────────────────┘ │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────────────────────────────────────────────────┐ │
│  │                 PERFORMANCE TRACKER                       │ │
│  │                 performance-tracker.json                   │ │
│  │                                                           │ │
│  │  - Pull metrics from all platforms (24-48h after post)    │ │
│  │  - Normalize views, likes, comments, shares, saves        │ │
│  │  - Compute engagement rates                               │ │
│  │  - Update hook weights (winners 2x, underperformers 0.5x) │ │
│  │  - Weekly email report (Sundays)                          │ │
│  │  - Feed data back into ideation (loop)                    │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                               │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │                  CONTENT DASHBOARD                        │ │
│  │                  /content-dashboard                        │ │
│  │                                                           │ │
│  │  - Live pipeline overview (published, scheduled, failed)  │ │
│  │  - Platform breakdown (views, engagement per platform)    │ │
│  │  - Top hooks ranking with auto-updated weights            │ │
│  │  - Scheduled queue with countdown                         │ │
│  │  - Auto-refresh every 60 seconds                          │ │
│  └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

---

## Files Overview

```
marketing/
├── README.md                          ← This file
├── hooks-library.md                   ← 50 hooks across 5 angles
├── content-packs/
│   └── day-1-to-7.md                 ← 21 pre-written scripts (first week)
├── scripts/
│   └── generate-daily-content.mjs    ← Manual CLI content generator
└── workflows/
    ├── content-factory.json          ← n8n: ideate + create (daily 06:00)
    ├── auto-publisher.json           ← n8n: auto-post to platforms (every 15min)
    └── performance-tracker.json      ← n8n: pull metrics + update weights (daily 08:00)
```

**In-app:**
```
src/app/api/content/dashboard/route.ts    ← API for dashboard data
src/app/[locale]/content-dashboard/page.tsx ← Admin dashboard UI
```

**Database:**
```
supabase/migrations/004_content_ops.sql    ← Tables: content_topics, content_posts,
                                              content_performance, content_experiments
supabase/migrations/005_seed_content_hooks.sql ← Seed: 50 hooks in 5 angles
```

---

## 3 Ways to Run

### Option A: Full Automation (n8n)

Everything runs automatically. You just film the videos.

1. Set up n8n (cloud or self-hosted)
2. Import all 3 workflows:
   - `content-factory.json` → generates scripts daily at 06:00
   - `auto-publisher.json` → posts to platforms every 15 min
   - `performance-tracker.json` → tracks metrics daily at 08:00
3. Set credentials in n8n:
   - Anthropic API key (script generation)
   - Supabase API (content storage)
   - TikTok API (optional, for auto-posting)
   - Meta Graph API (optional, for IG + FB)
   - YouTube OAuth2 (optional, for Shorts)
   - SMTP (for email reports)
4. Activate all 3 workflows

**Daily flow:**
- 06:00: Scripts are generated and saved to publish queue
- You film 3 videos using the generated scripts
- Upload videos to platforms (or let auto-publisher handle it)
- 08:00 next day: Performance is tracked, hook weights updated

### Option B: CLI + Manual Post (No n8n)

Generate scripts via command line, post manually.

```bash
# Generate day 1 content
node marketing/scripts/generate-daily-content.mjs --day=1

# Generate for a specific locale
node marketing/scripts/generate-daily-content.mjs --day=1 --locale=nl

# Dry run (no API call, see structure)
node marketing/scripts/generate-daily-content.mjs --day=1 --dry-run
```

Output per day:
```
marketing/content-packs/day-1/
├── script-1.md              ← Full script for 09:00 post
├── script-2.md              ← Full script for 13:00 post
├── script-3.md              ← Full script for 19:00 post
├── subtitles-1.srt          ← SRT for CapCut import
├── subtitles-2.srt
├── subtitles-3.srt
├── captions.md              ← All captions combined
├── captions-1.md            ← Per-platform captions for script 1
├── captions-2.md
├── captions-3.md
├── capcut-instructions.md   ← Edit guide for CapCut
└── publish-queue.json       ← Machine-readable schedule
```

### Option C: Pre-Written Scripts (No AI needed)

Use the 21 scripts already written for the first 7 days:

```
marketing/content-packs/day-1-to-7.md
```

No API key needed. Just film and post.

---

## Required API Keys

| Service | Key | Used By | Required? |
|---------|-----|---------|-----------|
| Anthropic | `ANTHROPIC_API_KEY` | Script generation | Yes (Option A/B) |
| Supabase | Service Role Key | Content storage | Yes (Option A) |
| TikTok | Content Posting API | Auto-posting | No (manual fallback) |
| Instagram | Meta Graph API | Auto-posting | No (manual fallback) |
| YouTube | YouTube Data API v3 | Auto-posting + metrics | No (manual fallback) |
| Facebook | Meta Graph API | Auto-posting | No (manual fallback) |
| SMTP | Email credentials | Weekly reports | No (optional) |

> **Note:** TikTok and Instagram APIs require approved developer accounts.
> The system works 100% without them — you just post manually from the publish queue.

---

## Safety Rules & Claim Filters

Every generated script is checked against these rules:

### BLOCKED phrases (auto-reject):
```
"cure" / "treat" / "diagnose" / "medical"
"insomnia" / "disorder" / "condition"
"clinically proven" / "scientifically proven"
"guaranteed results"
"replace your doctor"
"prescription" / "medication"
"FDA" / "CE marked" / "medical device"
```

### REQUIRED elements:
```
- Performance/energy framing (not clinical)
- One actionable tip per video
- CTA with link reference
- No shame language
- Under 35 seconds when spoken
```

### DISCLAIMER (auto-added to video descriptions):
```
VOLT Sleep is not a medical device and does not provide diagnosis or treatment.
For serious sleep problems, consult your doctor.
```

---

## Content Dashboard

Access the admin dashboard at `/content-dashboard` in your app.

**Features:**
- Total published count, week views, likes, comments, shares
- Average engagement rate across all platforms
- Platform-by-platform breakdown
- Top 10 hooks ranked by weight (auto-updated by performance tracker)
- Scheduled queue with publish times
- Recent posts with status indicators
- Auto-refresh every 60 seconds

**Access:** Requires admin key (set `CONTENT_ADMIN_KEY` in env, or defaults to `SUPABASE_SERVICE_ROLE_KEY`).

---

## Hook Library

50 hooks across 5 angles, each with a different format:

| Angle | Hooks | Example |
|-------|-------|---------|
| Caffeine Timing | 1-10 | "Your coffee after 2 PM is stealing tomorrow's energy." |
| Energy Crashes | 11-20 | "Your 3 PM crash is not about food." |
| Weekend Rhythm | 21-30 | "Sleeping in on weekends is sabotaging your Monday." |
| Focus & Performance | 31-40 | "The #1 focus hack is free and takes 0 minutes." |
| Light Exposure | 41-50 | "12 minutes of morning light changed my entire day." |

Hooks are weighted. Winners (high engagement) get boosted to 2x. Underperformers drop to 0.5x. The system automatically favors what works.

---

## Posting Schedule

| Time | CTA Variant | Content Type |
|------|-------------|--------------|
| 09:00 | Direct | Problem-awareness |
| 13:00 | Soft | Educational / reframe |
| 19:00 | Urgency | Personal story / challenge |

Posts go to: TikTok, Instagram Reels, YouTube Shorts, Facebook Reels.
That's **12 posts per day** across 4 platforms.

---

## Performance Tracking Loop

The system creates a feedback loop:

1. **Post** → content goes live on all platforms
2. **Wait 24-48h** → let metrics accumulate
3. **Measure** → pull views, likes, comments, shares, saves
4. **Score** → compute engagement rate per hook
5. **Update weights** → winners 2x, underperformers 0.5x
6. **Feed back** → next day's ideation favors winning hooks
7. **Repeat**

Over time, the system automatically generates more content using hooks that perform well, and phases out hooks that don't.
