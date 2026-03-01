# VOLT Sleep — Content Factory System

## Overview

Automated daily content production for TikTok, Instagram Reels, YouTube Shorts, and Facebook Reels.

**Output:** 3 short-form videos/day + 1 optional carousel + 1 optional tweet
**Runtime:** n8n self-hosted or n8n.cloud
**Cadence:** Runs daily at 06:00 UTC

---

## Architecture

```
┌──────────────────────────────────────────────────────┐
│                 DAILY CONTENT PIPELINE                 │
│                    (n8n workflow)                       │
├──────────────────────────────────────────────────────┤
│                                                        │
│  06:00 UTC ──► IDEA GENERATOR                         │
│                │                                       │
│                ├─ Check 14-day memory (no repeats)     │
│                ├─ Select 3 topics from hook library    │
│                ├─ Weight toward winning hooks (2×)     │
│                │                                       │
│                ▼                                       │
│             SCRIPT WRITER (per topic)                  │
│                │                                       │
│                ├─ Generate 15-35s script               │
│                ├─ Hook (0-2s)                          │
│                ├─ Explanation (2-12s)                  │
│                ├─ Actionable tip (12-25s)              │
│                ├─ CTA (last 3s)                        │
│                │                                       │
│                ▼                                       │
│             ASSET GENERATOR                            │
│                │                                       │
│                ├─ SRT subtitle file                    │
│                ├─ On-screen text overlays              │
│                ├─ CapCut edit instructions              │
│                ├─ Thumbnail text                       │
│                ├─ Caption + hashtags (per platform)    │
│                │                                       │
│                ▼                                       │
│             PUBLISH QUEUE                              │
│                │                                       │
│                ├─ Schedule: 09:00, 13:00, 19:00 local │
│                ├─ Platform-specific formatting         │
│                ├─ UTM links appended                   │
│                ├─ Logged to content_posts table        │
│                │                                       │
│                ▼                                       │
│             PERFORMANCE TRACKER (next day)             │
│                │                                       │
│                ├─ Pull metrics from platforms          │
│                ├─ Identify top hooks                   │
│                ├─ Update hook weights                  │
│                └─ Feed back into idea generator        │
└──────────────────────────────────────────────────────┘
```

---

## Required API Keys

| Service | Key Name | Where to Get | Required? |
|---------|----------|--------------|-----------|
| n8n | — | Self-host or n8n.cloud | Yes |
| TikTok | TikTok Content API key | TikTok for Developers | No (manual post fallback) |
| Instagram | Meta Graph API token | Meta for Developers | No (manual post fallback) |
| YouTube | YouTube Data API key | Google Cloud Console | No (manual post fallback) |
| Facebook | Meta Graph API token | Meta for Developers | No (manual post fallback) |
| Anthropic | ANTHROPIC_API_KEY | console.anthropic.com | Yes (script generation) |

> **Note:** Direct posting APIs for TikTok/Instagram require approved developer accounts. The system produces a ready-to-post "Publish Queue" as the default mode, with direct API posting as an optional upgrade.

---

## Setup Instructions

### Option A: n8n.cloud (Fastest)

1. Sign up at https://n8n.cloud
2. Import the workflow file: `marketing/workflows/content-factory.json`
3. Set credentials:
   - Anthropic API key (for script generation)
   - Supabase API (for content_posts storage)
4. Activate the workflow
5. The workflow runs daily at 06:00 UTC

### Option B: Self-hosted n8n

```bash
# Docker
docker run -d --name n8n -p 5678:5678 \
  -v n8n_data:/home/node/.n8n \
  -e N8N_BASIC_AUTH_ACTIVE=true \
  -e N8N_BASIC_AUTH_USER=admin \
  -e N8N_BASIC_AUTH_PASSWORD=<your-password> \
  n8nio/n8n

# Then import workflow at http://localhost:5678
```

### Option C: Manual Mode (No n8n)

Run the content generation script directly:

```bash
# Generate Day N content pack
node marketing/scripts/generate-daily-content.mjs --day=1

# Output: marketing/content-packs/day-N/
#   ├── script-1.md
#   ├── script-2.md
#   ├── script-3.md
#   ├── captions.md
#   ├── subtitles-1.srt
#   ├── subtitles-2.srt
#   ├── subtitles-3.srt
#   └── publish-queue.json
```

---

## Safety Rules & Claim Filters

Every generated script is checked against these rules before publishing:

### BLOCKED phrases (auto-reject if present):
```
- "cure" / "treat" / "diagnose" / "medical"
- "insomnia" / "disorder" / "condition"
- "clinically proven" / "scientifically proven"
- "guaranteed results"
- "replace your doctor"
- "prescription" / "medication"
- "FDA" / "CE marked" / "medical device"
```

### REQUIRED elements:
```
- Performance/energy framing (not clinical)
- One actionable tip per video
- CTA with link reference
- No shame language
- Under 35 seconds
```

### DISCLAIMER (add to video description when applicable):
```
VOLT Sleep is not a medical device and does not provide diagnosis or treatment.
For serious sleep problems, consult your doctor.
```
