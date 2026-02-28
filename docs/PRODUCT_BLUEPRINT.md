# VOLT Sleep — Product Blueprint

> "Wakker met energie. Elke dag."

## 1. Product Blueprint (One Pager)

**Product:** VOLT Sleep — Energy Optimization via Sleep
**Tagline:** Wakker met energie. Elke dag.
**Categorie:** B2C Health & Wellness / Behavioral Coaching
**Model:** Freemium (Free + Premium €9,99/m of €69/j)

### Kernprobleem
Mensen weten dat slaap belangrijk is, maar weten niet WAT ze concreet moeten doen. Bestaande apps geven data-overload (20 grafieken) zonder actionable advies.

### Oplossing
VOLT Sleep is een **decision engine**: elke dag 1 concrete actie, gebaseerd op je persoonlijke data en gedragswetenschap. Geen tracking-overload, maar een adaptief plan dat meegroeit.

### Doelgroep
Breed: iedereen die meer energie wil (25-45, kenniswerkers, atleten). Focus op "energie" i.p.v. "slaapproblemen" om stigma te vermijden.

### Kernonderscheid
1. **Daily Energy Card** — 1 actie per dag, niet 20 metrics
2. **Adaptive Decision Engine** — leert van je check-ins
3. **Geen wearable nodig** — pure gedragsinterventie
4. **Evidence-based** — COM-B, BCT, CBT-I, SDT

### Wetenschappelijke Fundering
| Framework | Toepassing in VOLT Sleep |
|-----------|-------------------------|
| COM-B (Capability, Opportunity, Motivation) | Onboarding assessment, action matching |
| BCT Taxonomy v1 | Goal setting, action planning, prompts/cues, self-monitoring, feedback, habit formation |
| Self-Determination Theory | Autonomie (keuze startroute), Competentie (haalbare progressie), Verbondenheid (buddy) |
| CBT-I principes | Stimulus control (scherm cutoff), sleep efficiency, cognitieve reframing (Cognitive Switch) |
| Fogg Behavior Model | Acties op moment van hoge ability, lage frictie; Notification Governor |

---

## 2. UX Flows & Screen Specs

### Screen Map
```
Landing → Signup → Login → Auth Callback
  ↓
Onboarding (5 stappen)
  ↓
Dashboard (Daily Energy Card)
  ├── Morning Check-in
  ├── Night Check-in
  ├── Progress
  │   └── Weekly Report (premium)
  ├── Cognitive Switch (premium)
  ├── Paywall
  └── Settings
```

### Screens

**1. Landing (public)**
- Hero met 3 varianten (A/B testbaar)
- Social proof stats (45s/dag, 1 actie, 7 dagen)
- How it works (3 stappen)
- Value props (4 cards)
- Pricing (Free vs Premium)
- Disclaimer footer

**2. Signup/Login**
- Magic link only (geen wachtwoord = lage frictie)
- 1 input field (email) + CTA

**3. Onboarding (5 screens, ~5 min)**
1. Wake times (werkdag + weekend) + bedtijd window
2. Energie + stress + middagdip
3. Cafeïne + schermgewoontes
4. Chronotype + primair doel
5. Energy Profile reveal + startroute keuze (Light/Standard/Focus)

**4. Dashboard (Home)**
- Daily Energy Card (primaire actie + why + how + if-then)
- Morning/Night check-in prompts (contextual)
- Secondary actions (optioneel)
- Micro-educatie
- Safety messages (indien nodig)
- Quick links: Progress + Premium

**5. Check-in Modals**
- Morning: wake time + energy (1-10) + dip yesterday (y/n)
- Night: bedtime + stress (1-10) + last screen + caffeine
- Max 10 seconden per check-in

**6. Progress**
- Stats: completion rate, gem. energie, dagen actief
- Energie trend (bar chart)
- Actie geschiedenis
- Weekly Report (premium, locked for free)

**7. Paywall**
- Feature lijst met beschrijvingen
- Maandelijks/Jaarlijks toggle (-42% badge)
- 7 dagen gratis trial
- Disclaimer

**8. Settings**
- Plan info + upgrade link
- Wake targets aanpassen
- Intensiteit route
- Logout + account verwijderen (GDPR)

**9. Cognitive Switch (premium)**
- 4 stappen: thought → reframe → breathe → action
- Donker theme (nachtmodus)
- Disclaimer: geen therapie

---

## 3. Decision Engine Spec

### Architecture
```
┌─────────────────────────────────────┐
│         Decision Engine             │
├──────────────┬──────────────────────┤
│  Rules Layer │   LLM Layer          │
│  (always)    │   (premium only)     │
├──────────────┼──────────────────────┤
│  Deterministic│  Copy enhancement   │
│  Safe fallback│  Personalization    │
│  Fast         │  Coaching nuance    │
└──────────────┴──────────────────────┘
```

### Input Schema
```typescript
{
  profile: OnboardingProfile   // static from onboarding
  recentLogs: DailyLog[]       // last 7 days
  recentActions: ActionRecord[] // last 7 days
}
```

### Derived Metrics
```typescript
{
  regularity_score: 0-100      // wake time consistency
  caffeine_risk: low|med|high  // timing + quantity
  light_exposure_priority: low|med|high
  bedtime_drift: minutes       // actual vs target
  crash_risk: low|med|high     // composite score
  weekend_shift_minutes: number
}
```

### Rules (Deterministic)
| Condition | Action | Priority |
|-----------|--------|----------|
| weekend_shift > 90 min | Stabilize wake time | 1 |
| caffeine after 14:00 OR >4 cups | Earlier cutoff | 2 |
| screen_after_21 + drift > 30 | Screen cutoff 45 min before bed | 2 |
| light_priority = high | 12 min morning light | 1 |
| stress >= 7 | Wind-down routine | 3 |
| crash_risk high + dip | Midday walk 10 min | 2 |
| low energy + low caffeine risk | Bedtime window | 3 |
| (fallback) | Consistent wake time | 5 |

### LLM Output Schema
```json
{
  "daily_card": {
    "primary_action": {
      "title": "string (max 8 words)",
      "minutes": 0,
      "why": "1 sentence evidence-based",
      "how": "1-2 sentences practical",
      "if_then": { "if": "obstacle", "then": "solution" }
    },
    "secondary_actions": [
      { "title": "", "minutes": 0, "how": "" }
    ],
    "micro_education": "1 sentence fact",
    "tone": "neutral|coach|strict"
  },
  "safety": {
    "flags": [],
    "message": ""
  }
}
```

### LLM System Prompt
See `src/lib/engine/llm.ts` — VOLT Sleep Coach prompt with 12 strict rules:
- No medical claims
- Dutch language
- Concise
- Evidence-based language only
- Specific if-then plans

---

## 4. Data Model

### Tables
| Table | Purpose |
|-------|---------|
| users | Core user data, plan, timezone |
| onboarding_profiles | Assessment data, energy profile |
| daily_logs | Night + morning check-in data |
| actions | Generated daily cards + completion |
| weekly_reports | Weekly insights (premium) |
| subscriptions | Stripe subscription tracking |
| analytics_events | Event tracking |

Full schema: `supabase/schema.sql`

---

## 5. API Routes

| Method | Route | Purpose | Auth |
|--------|-------|---------|------|
| POST | /api/engine/daily-card | Generate or retrieve daily card | Yes |
| POST | /api/engine/weekly-report | Generate weekly report | Premium |
| POST | /api/stripe/checkout | Create Stripe checkout session | Yes |
| POST | /api/stripe/webhook | Handle Stripe events | Stripe sig |
| POST | /api/account/delete | GDPR account deletion | Yes |
| POST | /api/analytics | Track analytics event | Optional |
| GET | /auth/callback | Handle magic link callback | - |

---

## 6. Build Plan (Day-by-Day)

### Day 1: Foundation
- [x] Next.js project setup (App Router, TypeScript, Tailwind)
- [x] Supabase client configuration
- [x] Database schema design
- [x] Type definitions
- [x] Validators (Zod)

### Day 2: Core Engine + Auth
- [x] Decision engine rules layer
- [x] LLM integration layer
- [x] Auth pages (login/signup with magic link)
- [x] Auth callback handler
- [x] Middleware (route protection)

### Day 3: Main Screens
- [x] Onboarding flow (5 screens)
- [x] Dashboard with Daily Energy Card
- [x] Morning + Night check-in screens
- [x] Progress page

### Day 4: Premium + Monetization
- [x] Paywall page
- [x] Stripe checkout integration
- [x] Stripe webhook handler
- [x] Weekly report API + display
- [x] Cognitive Switch tool
- [x] Settings page

### Day 5: Polish + Launch
- [x] Landing page
- [x] Privacy policy + Terms
- [x] Safety/compliance (disclaimers, escalation copy)
- [x] Analytics events
- [x] Unit tests for decision rules
- [x] Marketing content pack
- [ ] Deploy to Vercel
- [ ] Configure Supabase + Stripe production

---

## 7. Launch Plan (48 uur)

### T-48h: Pre-launch
- [ ] Final QA on staging
- [ ] Supabase production setup + run schema
- [ ] Stripe products + prices configured
- [ ] Vercel deployment + custom domain
- [ ] DNS + SSL

### T-24h: Content
- [ ] Record 3 TikTok/Reels
- [ ] Schedule 2 LinkedIn posts
- [ ] Prepare Product Hunt listing
- [ ] Email list notification (if any)

### T-0: Launch
- [ ] Go live
- [ ] Post TikTok + LinkedIn
- [ ] Monitor error logs + analytics
- [ ] Respond to early feedback

### T+24h: Iterate
- [ ] Review D1 retention
- [ ] Check conversion rate
- [ ] Fix any critical bugs
- [ ] Plan A/B test for landing hero

---

## 8. Copy Pack

### Landing Page
**Hero 1:** "Wakker met energie. Elke dag."
**Hero 2:** "Stop de middagdip."
**Hero 3:** "Energie is ritme + keuzes."

**Value Props:**
1. "Geen tracking-overload" — 1 actie die ertoe doet
2. "Adaptief, niet statisch" — past zich aan op check-ins
3. "Gedragswetenschap, geen giswerk" — evidence-based
4. "Energie, niet angst" — geen scary slaapscores

### Paywall
"VOLT Premium — Ontgrendel de volledige kracht van je energieplan."
- Adaptive Decision Engine
- Weekly Energy Report
- Cognitive Switch tool
- Onbeperkte geschiedenis

### Disclaimers
"VOLT Sleep is geen medisch hulpmiddel en biedt geen diagnose of behandeling. Onze adviezen zijn gebaseerd op algemene gedragsprincipes voor energieoptimalisatie. Bij ernstige slaapproblemen raden we aan contact op te nemen met je huisarts."

### Safety Escalation
"Je energie is al meerdere dagen erg laag. Dit kan veel oorzaken hebben. We raden aan om contact op te nemen met je huisarts voor persoonlijk advies."
"Hulp nodig? Bel 113 (zelfmoordpreventie) of neem contact op met je huisarts."
