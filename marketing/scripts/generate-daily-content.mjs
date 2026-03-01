#!/usr/bin/env node
// ============================================================
// VOLT Sleep — Daily Content Generator (Manual Mode)
// ============================================================
// Generates 3 video scripts per day using Claude AI.
// Output: ready-to-film scripts + captions + SRT subtitles
//
// Usage:
//   node marketing/scripts/generate-daily-content.mjs --day=1
//   node marketing/scripts/generate-daily-content.mjs --day=1 --locale=nl
//   node marketing/scripts/generate-daily-content.mjs --day=1 --dry-run
// ============================================================

import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..', '..')

// ── Config ──────────────────────────────────────────────────
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages'
const MODEL = 'claude-haiku-4-5-20251001'
const MAX_TOKENS = 1500
const POSTS_PER_DAY = 3
const SCHEDULE_TIMES = ['09:00', '13:00', '19:00']
const CTA_VARIANTS = ['direct', 'soft', 'urgency']
const PLATFORMS = ['tiktok', 'instagram', 'youtube', 'facebook']

// ── CLI Args ────────────────────────────────────────────────
const args = Object.fromEntries(
  process.argv.slice(2).map(a => {
    const [k, v] = a.replace(/^--/, '').split('=')
    return [k, v ?? 'true']
  })
)

const dayNumber = parseInt(args.day || '1', 10)
const locale = args.locale || 'en'
const dryRun = args['dry-run'] === 'true'

if (!args.day) {
  console.error('Usage: node generate-daily-content.mjs --day=<number> [--locale=en] [--dry-run]')
  process.exit(1)
}

// ── Hook Library ────────────────────────────────────────────
const HOOKS = loadHooks()

function loadHooks() {
  const hooksPath = join(ROOT, 'marketing', 'hooks-library.md')
  if (!existsSync(hooksPath)) {
    console.error('hooks-library.md not found. Using built-in hooks.')
    return getBuiltInHooks()
  }

  const content = readFileSync(hooksPath, 'utf-8')
  const hooks = []
  const lines = content.split('\n')

  for (const line of lines) {
    const match = line.match(/^\|\s*(\d+)\s*\|\s*(.+?)\s*\|\s*(\w+)\s*\|$/)
    if (match) {
      hooks.push({
        id: parseInt(match[1], 10),
        hook: match[2].trim(),
        format: match[3].trim(),
      })
    }
  }

  return hooks.length > 0 ? hooks : getBuiltInHooks()
}

function getBuiltInHooks() {
  return [
    { id: 1, hook: 'Your coffee after 2 PM is stealing tomorrow\'s energy.', format: 'Statement' },
    { id: 11, hook: 'Your 3 PM crash is not about food.', format: 'Contrarian' },
    { id: 21, hook: 'Sleeping in on weekends is sabotaging your Monday.', format: 'Statement' },
    { id: 31, hook: 'The #1 focus hack is free and takes 0 minutes.', format: 'Curiosity' },
    { id: 41, hook: '12 minutes of morning light changed my entire day.', format: 'Story' },
    { id: 2, hook: 'Stop drinking coffee when you\'re tired. Here\'s why.', format: 'Command' },
    { id: 12, hook: 'I fixed my afternoon crash in 4 days. No supplements.', format: 'Story' },
    { id: 22, hook: 'Social jetlag is why your Mondays suck.', format: 'Statement' },
    { id: 32, hook: 'Your focus isn\'t broken. Your rhythm is.', format: 'Reframe' },
    { id: 42, hook: 'The free hack that beats every supplement for energy.', format: 'Curiosity' },
  ]
}

// ── Topic Selection (rotate through hooks by day) ───────────
function selectTopics(day) {
  const totalHooks = HOOKS.length
  const startIndex = ((day - 1) * POSTS_PER_DAY) % totalHooks
  const selected = []
  for (let i = 0; i < POSTS_PER_DAY; i++) {
    selected.push(HOOKS[(startIndex + i) % totalHooks])
  }
  return selected
}

// ── Prompt Builder ──────────────────────────────────────────
function buildPrompt(hook, ctaVariant, postIndex) {
  const ctaTexts = {
    soft: 'Link in bio — free energy profile in 30 seconds.',
    direct: 'VOLT Sleep gives you 1 action per day to fix this. Free. Link in bio.',
    urgency: 'I built an app that does this for you. 30 seconds to start. Free.',
  }

  const localeInstruction = locale !== 'en'
    ? `\nIMPORTANT: Write the ENTIRE script in ${locale.toUpperCase()} language. All text must be in ${locale.toUpperCase()}.`
    : ''

  return `You are a short-form video scriptwriter for VOLT Sleep, an energy optimization app.
Write a 15-30 second video script.${localeInstruction}

Hook: ${hook.hook}
Hook format: ${hook.format}
CTA variant: ${ctaVariant}
CTA text: ${ctaTexts[ctaVariant]}

Rules:
- NO medical claims (no "cure", "treat", "diagnose", "insomnia", "disorder")
- Performance/energy framing ONLY
- Simple, sharp language
- No shame
- Include exactly one actionable tip
- Keep under 35 seconds when read aloud

Format your response EXACTLY like this:

[HOOK 0-2s]
(the hook line)

[PROBLEM 2-8s]
(2-3 sentences naming the pain)

[REFRAME 8-18s]
(behavioral science insight, 1-2 sentences)

[TIP 18-25s]
(concrete actionable tip)

[CTA 25-30s]
${ctaTexts[ctaVariant]}

---
Caption: (under 150 chars, include 1 question)
Hashtags: (5 hashtags starting with #)
Thumbnail: (5 words max for thumbnail text)
Overlay 1 [0-2s]: (on-screen text for hook)
Overlay 2 [8-18s]: (key stat or insight)
Overlay 3 [18-25s]: (the tip summarized in 5 words)`
}

// ── Claude API Call ─────────────────────────────────────────
async function generateScript(prompt) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('Error: ANTHROPIC_API_KEY not set.')
    console.error('Set it: export ANTHROPIC_API_KEY=sk-ant-...')
    process.exit(1)
  }

  const res = await fetch(ANTHROPIC_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Anthropic API error (${res.status}): ${err}`)
  }

  const data = await res.json()
  return data.content?.[0]?.text || ''
}

// ── Script Parser ───────────────────────────────────────────
function parseScript(raw) {
  const captionMatch = raw.match(/Caption:\s*(.+)/i)
  const hashtagMatch = raw.match(/Hashtags?:\s*(.+)/i)
  const thumbMatch = raw.match(/Thumbnail:\s*(.+)/i)
  const overlay1 = raw.match(/Overlay 1[^:]*:\s*(.+)/i)
  const overlay2 = raw.match(/Overlay 2[^:]*:\s*(.+)/i)
  const overlay3 = raw.match(/Overlay 3[^:]*:\s*(.+)/i)

  return {
    script: raw,
    caption: captionMatch?.[1]?.trim() || '',
    hashtags: hashtagMatch?.[1]?.trim() || '#energy #sleep #focus #productivity #voltsleep',
    thumbnail: thumbMatch?.[1]?.trim() || '',
    overlays: [
      overlay1?.[1]?.trim(),
      overlay2?.[1]?.trim(),
      overlay3?.[1]?.trim(),
    ].filter(Boolean),
  }
}

// ── SRT Generator ───────────────────────────────────────────
function generateSRT(scriptText) {
  const sections = scriptText.match(/\[([^\]]+)\]\s*\n([\s\S]*?)(?=\n\[|---|\n$)/g) || []
  let srt = ''
  let counter = 1

  for (const section of sections) {
    const timeMatch = section.match(/\[.*?(\d+)-(\d+)s\]/)
    const textMatch = section.match(/\]\s*\n([\s\S]*)/)
    if (!timeMatch || !textMatch) continue

    const startSec = parseInt(timeMatch[1], 10)
    const endSec = parseInt(timeMatch[2], 10)
    const text = textMatch[1].trim().replace(/\n/g, ' ')

    if (!text || text.length < 3) continue

    // Split into 2-line chunks for readability
    const words = text.split(' ')
    const mid = Math.ceil(words.length / 2)
    const line1 = words.slice(0, mid).join(' ')
    const line2 = words.slice(mid).join(' ')

    srt += `${counter}\n`
    srt += `${formatSRTTime(startSec)} --> ${formatSRTTime(endSec)}\n`
    srt += line2 ? `${line1}\n${line2}\n\n` : `${line1}\n\n`
    counter++
  }

  return srt
}

function formatSRTTime(seconds) {
  const h = String(Math.floor(seconds / 3600)).padStart(2, '0')
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
  const s = String(seconds % 60).padStart(2, '0')
  return `${h}:${m}:${s},000`
}

// ── Platform Formatter ──────────────────────────────────────
function formatForPlatform(parsed, platform, postIndex, day) {
  const baseUrl = 'https://voltsleep.nl'
  const dateStr = new Date().toISOString().split('T')[0]
  const utm = `${baseUrl}?utm_source=${platform}&utm_medium=organic&utm_campaign=daily_${dateStr}&utm_content=hook_${postIndex}`

  let caption = parsed.caption
  if (platform === 'tiktok') {
    caption = `${parsed.caption}\n\n${parsed.hashtags}\n\nLink in bio`
  } else if (platform === 'instagram') {
    caption = `${parsed.caption}\n\n${parsed.hashtags}\n\nLink in bio for free energy profile`
  } else if (platform === 'youtube') {
    caption = `${parsed.caption} #shorts ${parsed.hashtags}`
  } else if (platform === 'facebook') {
    caption = `${parsed.caption}\n\n${parsed.hashtags}`
  }

  return {
    platform,
    day_number: day,
    post_index: postIndex,
    caption,
    hashtags: parsed.hashtags,
    thumbnail_text: parsed.thumbnail,
    overlays: parsed.overlays,
    utm_link: utm,
    scheduled_at: `${dateStr}T${SCHEDULE_TIMES[postIndex - 1]}:00Z`,
  }
}

// ── Output Writers ──────────────────────────────────────────
function writeOutputs(day, scripts) {
  const outDir = join(ROOT, 'marketing', 'content-packs', `day-${day}`)
  mkdirSync(outDir, { recursive: true })

  // Individual scripts
  for (let i = 0; i < scripts.length; i++) {
    const { raw, parsed, srt, platformFormats } = scripts[i]

    // Script markdown
    writeFileSync(
      join(outDir, `script-${i + 1}.md`),
      `# Script ${day}.${i + 1} — ${SCHEDULE_TIMES[i]} Post\n\n${raw}\n`
    )

    // SRT subtitles
    writeFileSync(join(outDir, `subtitles-${i + 1}.srt`), srt)

    // Platform captions
    const capsContent = PLATFORMS.map(p => {
      const fmt = platformFormats.find(f => f.platform === p)
      return `## ${p.toUpperCase()}\n\n**Caption:**\n${fmt.caption}\n\n**UTM Link:** ${fmt.utm_link}\n`
    }).join('\n---\n\n')

    writeFileSync(
      join(outDir, `captions-${i + 1}.md`),
      `# Captions for Script ${day}.${i + 1}\n\n${capsContent}`
    )
  }

  // Combined captions file
  const allCaptions = scripts.map((s, i) =>
    `## Script ${i + 1} (${SCHEDULE_TIMES[i]})\n\n` +
    `**Caption:** ${s.parsed.caption}\n` +
    `**Hashtags:** ${s.parsed.hashtags}\n` +
    `**Thumbnail:** ${s.parsed.thumbnail}\n` +
    `**Overlays:**\n${s.parsed.overlays.map((o, j) => `  ${j + 1}. ${o}`).join('\n')}\n`
  ).join('\n---\n\n')

  writeFileSync(
    join(outDir, 'captions.md'),
    `# Day ${day} — All Captions\n\n${allCaptions}`
  )

  // Publish queue JSON
  const queue = scripts.flatMap(s => s.platformFormats.map(f => ({
    ...f,
    script: s.raw,
    srt_available: true,
    status: 'scheduled',
  })))

  writeFileSync(
    join(outDir, 'publish-queue.json'),
    JSON.stringify(queue, null, 2)
  )

  // CapCut edit instructions
  const capcut = scripts.map((s, i) =>
    `## Script ${i + 1}\n\n` +
    `**Duration:** 25-30 seconds\n` +
    `**Format:** 9:16 vertical\n` +
    `**Thumbnail text:** "${s.parsed.thumbnail}"\n\n` +
    `### On-screen overlays:\n` +
    s.parsed.overlays.map((o, j) => `${j + 1}. "${o}"`).join('\n') +
    `\n\n### Subtitle file: subtitles-${i + 1}.srt\n` +
    `Import into CapCut → Auto Captions → Replace with SRT file\n` +
    `Style: Bold, white text, dark background, centered bottom\n`
  ).join('\n---\n\n')

  writeFileSync(
    join(outDir, 'capcut-instructions.md'),
    `# CapCut Edit Instructions — Day ${day}\n\n${capcut}`
  )

  return outDir
}

// ── Main ────────────────────────────────────────────────────
async function main() {
  console.log(`\n⚡ VOLT Sleep — Content Generator`)
  console.log(`   Day: ${dayNumber} | Locale: ${locale} | Dry run: ${dryRun}\n`)

  const topics = selectTopics(dayNumber)
  console.log(`Selected hooks:`)
  topics.forEach((t, i) => console.log(`  ${i + 1}. "${t.hook}" (${t.format})`))
  console.log()

  const scripts = []

  for (let i = 0; i < topics.length; i++) {
    const topic = topics[i]
    const ctaVariant = CTA_VARIANTS[i]
    const postIndex = i + 1

    console.log(`Generating script ${postIndex}/3...`)

    const prompt = buildPrompt(topic, ctaVariant, postIndex)

    let raw
    if (dryRun) {
      raw = `[HOOK 0-2s]\n${topic.hook}\n\n[PROBLEM 2-8s]\nThis is a dry run placeholder.\n\n[REFRAME 8-18s]\nDry run — no API call made.\n\n[TIP 18-25s]\nRun without --dry-run to generate real content.\n\n[CTA 25-30s]\nVOLT Sleep gives you 1 action per day. Free. Link in bio.\n\n---\nCaption: This is a dry run test. Did it work?\nHashtags: #voltsleep #energy #test #dryrun #content\nThumbnail: DRY RUN TEST\nOverlay 1 [0-2s]: ${topic.hook}\nOverlay 2 [8-18s]: Dry run mode\nOverlay 3 [18-25s]: No API call made`
    } else {
      raw = await generateScript(prompt)
    }

    const parsed = parseScript(raw)
    const srt = generateSRT(raw)
    const platformFormats = PLATFORMS.map(p =>
      formatForPlatform(parsed, p, postIndex, dayNumber)
    )

    scripts.push({ raw, parsed, srt, platformFormats })
    console.log(`  Done. Caption: "${parsed.caption.slice(0, 60)}..."`)
  }

  // Write outputs
  const outDir = writeOutputs(dayNumber, scripts)

  console.log(`\nOutput written to: ${outDir}/`)
  console.log(`  - script-1.md, script-2.md, script-3.md`)
  console.log(`  - subtitles-1.srt, subtitles-2.srt, subtitles-3.srt`)
  console.log(`  - captions.md (combined)`)
  console.log(`  - captions-1.md, captions-2.md, captions-3.md (per-platform)`)
  console.log(`  - capcut-instructions.md`)
  console.log(`  - publish-queue.json`)
  console.log(`\nNext steps:`)
  console.log(`  1. Film each script (face-to-camera or voiceover + b-roll)`)
  console.log(`  2. Edit in CapCut using capcut-instructions.md`)
  console.log(`  3. Import subtitles-N.srt into CapCut`)
  console.log(`  4. Post to TikTok, IG Reels, YT Shorts, FB Reels`)
  console.log(`  5. Copy captions from captions-N.md for each platform`)
  console.log()
}

main().catch(err => {
  console.error('Error:', err.message)
  process.exit(1)
})
