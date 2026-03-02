#!/usr/bin/env node
// ============================================================
// VOLT Sleep — Split day-1-to-7.md into individual day folders
// ============================================================
// Parses the pre-written scripts and generates:
// - Individual script markdown files
// - SRT subtitle files
// - Per-platform captions
// - CapCut edit instructions
// - Publish queue JSON
// ============================================================

import { writeFileSync, readFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..', '..')
const CONTENT_DIR = join(ROOT, 'marketing', 'content-packs')

const PLATFORMS = ['tiktok', 'instagram', 'youtube', 'facebook']
const SCHEDULE_TIMES = ['09:00', '13:00', '19:00']

// ── Read and parse the master file ──────────────────────────
const masterFile = readFileSync(join(CONTENT_DIR, 'day-1-to-7.md'), 'utf-8')

// Split by day headers
const dayBlocks = masterFile.split(/^## DAY (\d+)/m).slice(1)

const days = []
for (let i = 0; i < dayBlocks.length; i += 2) {
  const dayNum = parseInt(dayBlocks[i], 10)
  const content = dayBlocks[i + 1]
  if (!content) continue

  // Split by script headers
  const scriptBlocks = content.split(/^### Script \d+\.\d+/m).slice(1)
  const scripts = []

  for (const block of scriptBlocks) {
    // Extract time from parenthetical
    const timeMatch = block.match(/\((\d{2}:\d{2})\)/)
    const time = timeMatch?.[1] || ''

    // Extract the script (between ``` markers)
    const scriptMatch = block.match(/```\n([\s\S]*?)```/)
    const scriptText = scriptMatch?.[1]?.trim() || ''

    // Extract metadata
    const captionMatch = block.match(/\*\*Caption:\*\*\s*(.+)/i)
    const hashtagMatch = block.match(/\*\*Hashtags:\*\*\s*(.+)/i)
    const thumbMatch = block.match(/\*\*Thumbnail:\*\*\s*(.+)/i)
    const ctaMatch = block.match(/\*\*CTA variant:\*\*\s*(.+)/i)

    scripts.push({
      time,
      script: scriptText,
      caption: captionMatch?.[1]?.trim() || '',
      hashtags: hashtagMatch?.[1]?.trim() || '',
      thumbnail: thumbMatch?.[1]?.trim().replace(/^"|"$/g, '') || '',
      ctaVariant: ctaMatch?.[1]?.trim() || 'direct',
    })
  }

  days.push({ dayNum, scripts })
}

// ── Generate SRT from script text ───────────────────────────
function generateSRT(scriptText) {
  const sections = scriptText.match(/\[([^\]]+)\]\s*\n([\s\S]*?)(?=\n\[|$)/g) || []
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

    const words = text.split(' ')
    const mid = Math.ceil(words.length / 2)
    const line1 = words.slice(0, mid).join(' ')
    const line2 = words.slice(mid).join(' ')

    const startTime = formatTime(startSec)
    const endTime = formatTime(endSec)

    srt += `${counter}\n${startTime} --> ${endTime}\n`
    srt += line2 ? `${line1}\n${line2}\n\n` : `${line1}\n\n`
    counter++
  }

  return srt
}

function formatTime(sec) {
  const h = String(Math.floor(sec / 3600)).padStart(2, '0')
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0')
  const s = String(sec % 60).padStart(2, '0')
  return `${h}:${m}:${s},000`
}

// ── Format captions per platform ────────────────────────────
function formatPlatformCaption(script, platform, dayNum, postIndex) {
  const dateStr = new Date().toISOString().split('T')[0]
  const utm = `https://voltsleep.nl?utm_source=${platform}&utm_medium=organic&utm_campaign=day${dayNum}_${dateStr}&utm_content=hook_${postIndex}`

  let caption = script.caption
  if (platform === 'tiktok') {
    caption = `${script.caption}\n\n${script.hashtags}\n\nLink in bio`
  } else if (platform === 'instagram') {
    caption = `${script.caption}\n\n${script.hashtags}\n\nLink in bio for free energy profile`
  } else if (platform === 'youtube') {
    caption = `${script.caption} #shorts ${script.hashtags}`
  } else if (platform === 'facebook') {
    caption = `${script.caption}\n\n${script.hashtags}`
  }

  return { platform, caption, utm }
}

// ── Write all day folders ───────────────────────────────────
let totalFiles = 0

for (const day of days) {
  const dayDir = join(CONTENT_DIR, `day-${day.dayNum}`)
  mkdirSync(dayDir, { recursive: true })

  const dateStr = new Date().toISOString().split('T')[0]

  for (let i = 0; i < day.scripts.length; i++) {
    const script = day.scripts[i]
    const postIndex = i + 1
    const time = SCHEDULE_TIMES[i] || script.time

    // 1. Script markdown
    writeFileSync(
      join(dayDir, `script-${postIndex}.md`),
      `# Script ${day.dayNum}.${postIndex} — ${time} Post\n\n\`\`\`\n${script.script}\n\`\`\`\n\n**Caption:** ${script.caption}\n**Hashtags:** ${script.hashtags}\n**Thumbnail:** ${script.thumbnail}\n**CTA variant:** ${script.ctaVariant}\n`
    )
    totalFiles++

    // 2. SRT subtitles
    const srt = generateSRT(script.script)
    writeFileSync(join(dayDir, `subtitles-${postIndex}.srt`), srt)
    totalFiles++

    // 3. Per-platform captions
    const platformCaptions = PLATFORMS.map(p =>
      formatPlatformCaption(script, p, day.dayNum, postIndex)
    )

    const capsContent = platformCaptions.map(pc =>
      `## ${pc.platform.toUpperCase()}\n\n**Caption:**\n${pc.caption}\n\n**UTM Link:** ${pc.utm}\n`
    ).join('\n---\n\n')

    writeFileSync(
      join(dayDir, `captions-${postIndex}.md`),
      `# Captions for Script ${day.dayNum}.${postIndex} (${time})\n\n${capsContent}`
    )
    totalFiles++
  }

  // 4. Combined captions
  const allCaptions = day.scripts.map((s, i) =>
    `## Script ${i + 1} (${SCHEDULE_TIMES[i] || s.time})\n\n` +
    `**Caption:** ${s.caption}\n` +
    `**Hashtags:** ${s.hashtags}\n` +
    `**Thumbnail:** ${s.thumbnail}\n`
  ).join('\n---\n\n')

  writeFileSync(
    join(dayDir, 'captions.md'),
    `# Day ${day.dayNum} — All Captions\n\n${allCaptions}`
  )
  totalFiles++

  // 5. CapCut instructions
  const capcut = day.scripts.map((s, i) => {
    // Extract overlays from script
    const hookLine = s.script.match(/\[HOOK[^\]]*\]\n(.+)/)?.[1] || ''
    const tipLine = s.script.match(/\[TIP[^\]]*\]\n([\s\S]*?)(?=\n\[|$)/)?.[1]?.split('\n')[0] || ''

    return `## Script ${i + 1} (${SCHEDULE_TIMES[i] || s.time})\n\n` +
      `**Duration:** 25-30 seconds\n` +
      `**Format:** 9:16 vertical\n` +
      `**Thumbnail text:** "${s.thumbnail}"\n\n` +
      `### Stappen:\n` +
      `1. Importeer je gefilmde video\n` +
      `2. Ga naar "Captions" → "Auto Captions" → selecteer taal\n` +
      `3. OF importeer \`subtitles-${i + 1}.srt\` handmatig\n` +
      `4. Style: Bold, wit, donkere achtergrond, gecentreerd onderaan\n` +
      `5. Font grootte: 32-36pt\n\n` +
      `### On-screen text overlays:\n` +
      `- [0-2s] "${hookLine}"\n` +
      `- [18-25s] "${tipLine}"\n` +
      `- [25-30s] "Link in bio"\n\n` +
      `### Export settings:\n` +
      `- Resolution: 1080 x 1920 (9:16)\n` +
      `- Frame rate: 30fps\n` +
      `- Quality: High\n` +
      `- Format: MP4\n`
  }).join('\n---\n\n')

  writeFileSync(
    join(dayDir, 'capcut-instructions.md'),
    `# CapCut Edit Instructies — Day ${day.dayNum}\n\n${capcut}`
  )
  totalFiles++

  // 6. Publish queue JSON
  const queue = day.scripts.flatMap((s, i) =>
    PLATFORMS.map(platform => ({
      platform,
      day_number: day.dayNum,
      post_index: i + 1,
      caption: formatPlatformCaption(s, platform, day.dayNum, i + 1).caption,
      hashtags: s.hashtags,
      thumbnail_text: s.thumbnail,
      cta_variant: s.ctaVariant,
      utm_link: formatPlatformCaption(s, platform, day.dayNum, i + 1).utm,
      scheduled_at: `${dateStr}T${SCHEDULE_TIMES[i]}:00Z`,
      status: 'scheduled',
    }))
  )

  writeFileSync(
    join(dayDir, 'publish-queue.json'),
    JSON.stringify(queue, null, 2)
  )
  totalFiles++

  console.log(`Day ${day.dayNum}: ${day.scripts.length} scripts → ${dayDir}/`)
}

console.log(`\nDone! Generated ${totalFiles} files across ${days.length} days.`)
console.log(`\nElke dag-map bevat:`)
console.log(`  script-1.md, script-2.md, script-3.md`)
console.log(`  subtitles-1.srt, subtitles-2.srt, subtitles-3.srt`)
console.log(`  captions-1.md, captions-2.md, captions-3.md`)
console.log(`  captions.md (gecombineerd)`)
console.log(`  capcut-instructions.md`)
console.log(`  publish-queue.json`)
