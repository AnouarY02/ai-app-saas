#!/usr/bin/env node
// ============================================================
// VOLT Sleep — Full Automated Content Pipeline
// ============================================================
// Generates scripts → creates TTS audio → renders video →
// burns subtitles → outputs ready-to-upload MP4s
//
// Usage:
//   node marketing/scripts/full-pipeline.mjs --day=1
//   node marketing/scripts/full-pipeline.mjs --day=1 --locale=nl
//   node marketing/scripts/full-pipeline.mjs --day=1 --voice=nova
//   node marketing/scripts/full-pipeline.mjs --day=1 --post    (auto-post)
//   node marketing/scripts/full-pipeline.mjs --day=1 --use-existing  (skip script gen)
//
// Required env:
//   ANTHROPIC_API_KEY     — for script generation
//   OPENAI_API_KEY        — for TTS audio
//
// Optional env (for auto-posting):
//   TIKTOK_ACCESS_TOKEN
//   INSTAGRAM_ACCESS_TOKEN + INSTAGRAM_USER_ID
//   YOUTUBE_REFRESH_TOKEN + YOUTUBE_CLIENT_ID + YOUTUBE_CLIENT_SECRET
//   FACEBOOK_ACCESS_TOKEN + FACEBOOK_PAGE_ID
// ============================================================

import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { execSync, spawn } from 'child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..', '..')

// ── Config ──────────────────────────────────────────────────
const ANTHROPIC_API = 'https://api.anthropic.com/v1/messages'
const OPENAI_TTS_API = 'https://api.openai.com/v1/audio/speech'
const CLAUDE_MODEL = 'claude-haiku-4-5-20251001'
const SCHEDULE_TIMES = ['09:00', '13:00', '19:00']
const CTA_VARIANTS = ['direct', 'soft', 'urgency']
const PLATFORMS = ['tiktok', 'instagram', 'youtube', 'facebook']

// Video settings
const VIDEO = {
  width: 1080,
  height: 1920,
  fps: 30,
  bgColor: '#0a0a1a',         // Dark navy
  accentColor: '#fbbf24',     // VOLT yellow
  textColor: '#ffffff',
  subtitleColor: '#ffffff',
  subtitleBg: '#000000AA',
  fontFile: '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
  fontFileRegular: '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
}

// TTS voices (OpenAI)
const TTS_VOICES = ['nova', 'alloy', 'echo', 'fable', 'onyx', 'shimmer']

// ── CLI Args ────────────────────────────────────────────────
const args = Object.fromEntries(
  process.argv.slice(2).map(a => {
    const [k, v] = a.replace(/^--/, '').split('=')
    return [k, v ?? 'true']
  })
)

const dayNumber = parseInt(args.day || '0', 10)
const locale = args.locale || 'en'
const voice = args.voice || 'nova'
const shouldPost = args.post === 'true'
const useExisting = args['use-existing'] === 'true'

if (!dayNumber) {
  console.log(`
VOLT Sleep — Full Automated Content Pipeline

Usage:
  node full-pipeline.mjs --day=<number> [options]

Options:
  --day=N           Day number (required)
  --locale=en       Language (en, nl, de, es, fr)
  --voice=nova      TTS voice (nova, alloy, echo, fable, onyx, shimmer)
  --post            Auto-post to platforms after rendering
  --use-existing    Use existing scripts from content-packs/day-N/

Required env vars:
  ANTHROPIC_API_KEY     For script generation
  OPENAI_API_KEY        For TTS audio generation

Optional env vars (auto-posting):
  TIKTOK_ACCESS_TOKEN
  INSTAGRAM_ACCESS_TOKEN + INSTAGRAM_USER_ID
  YOUTUBE_REFRESH_TOKEN + YOUTUBE_CLIENT_ID + YOUTUBE_CLIENT_SECRET
  FACEBOOK_ACCESS_TOKEN + FACEBOOK_PAGE_ID
`)
  process.exit(1)
}

// ── Hook Library ────────────────────────────────────────────
const HOOKS = loadHooks()

function loadHooks() {
  const hooksPath = join(ROOT, 'marketing', 'hooks-library.md')
  if (!existsSync(hooksPath)) return getBuiltInHooks()
  const content = readFileSync(hooksPath, 'utf-8')
  const hooks = []
  for (const line of content.split('\n')) {
    const match = line.match(/^\|\s*(\d+)\s*\|\s*(.+?)\s*\|\s*(\w+)\s*\|$/)
    if (match) hooks.push({ id: parseInt(match[1], 10), hook: match[2].trim(), format: match[3].trim() })
  }
  return hooks.length > 0 ? hooks : getBuiltInHooks()
}

function getBuiltInHooks() {
  return [
    { id: 1, hook: "Your coffee after 2 PM is stealing tomorrow's energy.", format: 'Statement' },
    { id: 11, hook: 'Your 3 PM crash is not about food.', format: 'Contrarian' },
    { id: 21, hook: 'Sleeping in on weekends is sabotaging your Monday.', format: 'Statement' },
    { id: 31, hook: 'The #1 focus hack is free and takes 0 minutes.', format: 'Curiosity' },
    { id: 41, hook: '12 minutes of morning light changed my entire day.', format: 'Story' },
  ]
}

// ── Step 1: Generate Scripts ────────────────────────────────
async function generateScripts() {
  console.log('\n[1/5] GENERATING SCRIPTS...')
  const outDir = join(ROOT, 'marketing', 'content-packs', `day-${dayNumber}`)
  mkdirSync(outDir, { recursive: true })

  if (useExisting) {
    console.log('  Using existing scripts from', outDir)
    const scripts = []
    for (let i = 1; i <= 3; i++) {
      const scriptPath = join(outDir, `script-${i}.md`)
      if (existsSync(scriptPath)) {
        const content = readFileSync(scriptPath, 'utf-8')
        const scriptMatch = content.match(/```\n([\s\S]*?)```/)
        scripts.push({
          raw: scriptMatch?.[1]?.trim() || content,
          ...parseScriptMeta(content),
        })
        console.log(`  Script ${i}: loaded`)
      }
    }
    return scripts
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('  ERROR: ANTHROPIC_API_KEY not set')
    process.exit(1)
  }

  const topics = selectTopics(dayNumber)
  const scripts = []

  for (let i = 0; i < 3; i++) {
    const topic = topics[i]
    const prompt = buildScriptPrompt(topic, CTA_VARIANTS[i])

    console.log(`  Generating script ${i + 1}/3: "${topic.hook.slice(0, 50)}..."`)

    const res = await fetch(ANTHROPIC_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!res.ok) throw new Error(`Anthropic API error: ${res.status}`)
    const data = await res.json()
    const raw = data.content?.[0]?.text || ''

    scripts.push({ raw, ...parseScriptMeta(raw) })

    // Save script file
    writeFileSync(join(outDir, `script-${i + 1}.md`),
      `# Script ${dayNumber}.${i + 1} — ${SCHEDULE_TIMES[i]} Post\n\n\`\`\`\n${raw.split('---')[0].trim()}\n\`\`\`\n\n` +
      `**Caption:** ${scripts[i].caption}\n**Hashtags:** ${scripts[i].hashtags}\n**Thumbnail:** ${scripts[i].thumbnail}\n`
    )
    console.log(`  Done.`)
  }

  return scripts
}

function selectTopics(day) {
  const start = ((day - 1) * 3) % HOOKS.length
  return [0, 1, 2].map(i => HOOKS[(start + i) % HOOKS.length])
}

function buildScriptPrompt(topic, ctaVariant) {
  const ctaTexts = {
    soft: 'Link in bio — free energy profile in 30 seconds.',
    direct: 'VOLT Sleep gives you 1 action per day to fix this. Free. Link in bio.',
    urgency: 'I built an app that does this for you. 30 seconds to start. Free.',
  }
  const localeNote = locale !== 'en' ? `\nIMPORTANT: Write entirely in ${locale.toUpperCase()} language.` : ''

  return `You are a short-form video scriptwriter for VOLT Sleep, an energy optimization app. Write a 15-30 second video script.${localeNote}

Hook: ${topic.hook}
CTA: ${ctaTexts[ctaVariant]}

Rules: NO medical claims. Performance/energy framing ONLY. One actionable tip. Under 35 seconds spoken.

Format:
[HOOK 0-3s]
(hook line)

[PROBLEM 3-8s]
(2-3 sentences)

[REFRAME 8-18s]
(behavioral science insight)

[TIP 18-25s]
(concrete action)

[CTA 25-30s]
${ctaTexts[ctaVariant]}

---
Caption: (under 150 chars, include 1 question)
Hashtags: (5 hashtags)
Thumbnail: (5 words max)`
}

function parseScriptMeta(raw) {
  return {
    caption: raw.match(/Caption:\s*(.+)/i)?.[1]?.trim() || '',
    hashtags: raw.match(/Hashtags?:\s*(.+)/i)?.[1]?.trim() || '#energy #sleep #focus #productivity #voltsleep',
    thumbnail: raw.match(/Thumbnail:\s*(.+)/i)?.[1]?.trim().replace(/"/g, '') || '',
  }
}

// ── Step 2: Generate TTS Audio ──────────────────────────────
async function generateAudio(scripts) {
  console.log('\n[2/5] GENERATING AUDIO (TTS)...')

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    console.error('  ERROR: OPENAI_API_KEY not set')
    console.error('  Falling back to silent video mode')
    return scripts.map(() => null)
  }

  const outDir = join(ROOT, 'marketing', 'content-packs', `day-${dayNumber}`)
  const audioFiles = []

  for (let i = 0; i < scripts.length; i++) {
    const script = scripts[i]
    const spokenText = extractSpokenText(script.raw)
    const audioPath = join(outDir, `audio-${i + 1}.mp3`)

    console.log(`  Generating audio ${i + 1}/3 (voice: ${voice})...`)

    const res = await fetch(OPENAI_TTS_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'tts-1',
        voice: voice,
        input: spokenText,
        speed: 1.0,
      }),
    })

    if (!res.ok) {
      console.error(`  WARNING: TTS failed for script ${i + 1}: ${res.status}`)
      audioFiles.push(null)
      continue
    }

    const buffer = Buffer.from(await res.arrayBuffer())
    writeFileSync(audioPath, buffer)
    audioFiles.push(audioPath)
    console.log(`  Saved: ${audioPath}`)
  }

  return audioFiles
}

function extractSpokenText(raw) {
  // Remove section headers and metadata, keep only spoken words
  return raw
    .split('---')[0]
    .replace(/\[.*?\]/g, '')
    .split('\n')
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('Caption') && !l.startsWith('Hashtag') && !l.startsWith('Thumbnail') && !l.startsWith('Overlay'))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// ── Step 3: Generate SRT Subtitles ──────────────────────────
function generateSubtitles(scripts) {
  console.log('\n[3/5] GENERATING SUBTITLES...')
  const outDir = join(ROOT, 'marketing', 'content-packs', `day-${dayNumber}`)
  const srtFiles = []

  for (let i = 0; i < scripts.length; i++) {
    const srt = buildSRT(scripts[i].raw)
    const srtPath = join(outDir, `subtitles-${i + 1}.srt`)
    writeFileSync(srtPath, srt)
    srtFiles.push(srtPath)
    console.log(`  Subtitles ${i + 1}: ${srtPath}`)
  }

  return srtFiles
}

function buildSRT(scriptText) {
  const sections = scriptText.match(/\[([^\]]+)\]\s*\n([\s\S]*?)(?=\n\[|---|\n$)/g) || []
  let srt = ''
  let counter = 1

  for (const section of sections) {
    const timeMatch = section.match(/\[.*?(\d+)-(\d+)s\]/)
    const textMatch = section.match(/\]\s*\n([\s\S]*)/)
    if (!timeMatch || !textMatch) continue

    const startSec = parseInt(timeMatch[1], 10)
    const endSec = parseInt(timeMatch[2], 10)
    const lines = textMatch[1].trim().split('\n').filter(l => l.trim())

    // Split into ~3 second chunks for readability
    const chunkDuration = (endSec - startSec) / Math.max(lines.length, 1)

    for (let j = 0; j < lines.length; j++) {
      const text = lines[j].trim()
      if (!text || text.length < 3) continue

      const chunkStart = startSec + j * chunkDuration
      const chunkEnd = Math.min(startSec + (j + 1) * chunkDuration, endSec)

      srt += `${counter}\n`
      srt += `${fmtTime(chunkStart)} --> ${fmtTime(chunkEnd)}\n`
      srt += `${text}\n\n`
      counter++
    }
  }

  return srt
}

function fmtTime(sec) {
  const h = String(Math.floor(sec / 3600)).padStart(2, '0')
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0')
  const s = String(Math.floor(sec) % 60).padStart(2, '0')
  const ms = String(Math.round((sec % 1) * 1000)).padStart(3, '0')
  return `${h}:${m}:${s},${ms}`
}

// ── Step 4: Render Video ────────────────────────────────────
async function renderVideos(scripts, audioFiles, srtFiles) {
  console.log('\n[4/5] RENDERING VIDEOS...')
  const outDir = join(ROOT, 'marketing', 'content-packs', `day-${dayNumber}`)
  const videoFiles = []

  for (let i = 0; i < scripts.length; i++) {
    const script = scripts[i]
    const audioFile = audioFiles[i]
    const srtFile = srtFiles[i]
    const videoPath = join(outDir, `video-${i + 1}.mp4`)

    console.log(`  Rendering video ${i + 1}/3...`)

    // Get audio duration (or default 28s)
    let duration = 28
    if (audioFile) {
      try {
        const probe = execSync(`ffprobe -v quiet -show_entries format=duration -of csv=p=0 "${audioFile}"`, { encoding: 'utf-8' })
        duration = Math.ceil(parseFloat(probe.trim())) + 1
      } catch { /* use default */ }
    }

    // Parse script sections for text overlay timing
    const sections = parseScriptSections(script.raw)

    // Build ffmpeg filter complex for animated text
    const filters = buildTextFilters(sections, duration)

    // Build ffmpeg command
    const ffmpegArgs = buildFFmpegCommand({
      audioFile,
      srtFile,
      videoPath,
      duration,
      filters,
    })

    try {
      await runFFmpeg(ffmpegArgs)
      videoFiles.push(videoPath)
      console.log(`  Done: ${videoPath}`)
    } catch (err) {
      console.error(`  ERROR rendering video ${i + 1}: ${err.message}`)
      videoFiles.push(null)
    }
  }

  return videoFiles
}

function parseScriptSections(raw) {
  const sections = []
  const regex = /\[(.*?)\s+(\d+)-(\d+)s\]\s*\n([\s\S]*?)(?=\n\[|---|\n$)/g
  let match
  while ((match = regex.exec(raw)) !== null) {
    sections.push({
      type: match[1].trim(),
      start: parseInt(match[2], 10),
      end: parseInt(match[3], 10),
      text: match[4].trim().split('\n').map(l => l.trim()).filter(Boolean),
    })
  }
  return sections
}

function escapeFFmpegText(text) {
  return text
    .replace(/\\/g, '\\\\\\\\')
    .replace(/'/g, "\u2019")
    .replace(/"/g, '\\\\"')
    .replace(/:/g, '\\\\:')
    .replace(/\[/g, '\\\\[')
    .replace(/\]/g, '\\\\]')
    .replace(/%/g, '%%')
    .replace(/;/g, '\\\\;')
}

function buildTextFilters(sections, duration) {
  const filters = []
  const { width, height, fontFile, fontFileRegular, accentColor, textColor, bgColor } = VIDEO

  // Use input 1 (color background) and add accent bar
  filters.push(`color=c=${accentColor}:s=${width}x6:d=${duration}:r=30[accent]`)
  filters.push(`[1:v][accent]overlay=0:0[base]`)

  // VOLT logo text (always visible)
  const voltText = escapeFFmpegText('VOLT SLEEP')
  filters.push(
    `[base]drawtext=fontfile='${fontFile}':text='${voltText}':fontsize=28:fontcolor=${accentColor}:x=(w-text_w)/2:y=80:enable='gte(t,0)'[withlogo]`
  )

  let lastLabel = 'withlogo'
  let filterIdx = 0

  for (const section of sections) {
    for (let j = 0; j < section.text.length; j++) {
      const line = section.text[j]
      const escaped = escapeFFmpegText(line)

      // Calculate position and timing
      const lineDelay = j * 0.3
      const fadeIn = section.start + lineDelay
      const fadeOut = section.end

      // Style based on section type
      let fontSize, fontColor, yPos, font
      if (section.type === 'HOOK') {
        fontSize = 56
        fontColor = accentColor
        yPos = 400 + j * 80
        font = fontFile
      } else if (section.type === 'CTA') {
        fontSize = 40
        fontColor = accentColor
        yPos = 1400 + j * 60
        font = fontFile
      } else if (section.type === 'TIP') {
        fontSize = 44
        fontColor = '#22c55e'  // Green for tips
        yPos = 800 + j * 65
        font = fontFile
      } else {
        fontSize = 40
        fontColor = textColor
        yPos = 600 + j * 60
        font = fontFileRegular
      }

      const newLabel = `t${filterIdx}`
      filters.push(
        `[${lastLabel}]drawtext=fontfile='${font}':text='${escaped}':fontsize=${fontSize}:fontcolor=${fontColor}:` +
        `x=(w-text_w)/2:y=${yPos}:` +
        `enable='between(t,${fadeIn},${fadeOut})':` +
        `alpha='if(lt(t-${fadeIn},0.4),(t-${fadeIn})/0.4,if(gt(t,${fadeOut - 0.3}),(${fadeOut}-t)/0.3,1))'` +
        `[${newLabel}]`
      )
      lastLabel = newLabel
      filterIdx++
    }
  }

  // Subtitle-style text at bottom (always visible progress indicator)
  const progressText = escapeFFmpegText(`Day ${dayNumber}`)
  filters.push(
    `[${lastLabel}]drawtext=fontfile='${fontFileRegular}':text='${progressText}':fontsize=24:fontcolor=${textColor}@0.5:x=(w-text_w)/2:y=${height - 100}:enable='gte(t,0)'[final]`
  )

  return filters
}

function buildFFmpegCommand({ audioFile, srtFile, videoPath, duration, filters }) {
  const filterComplex = filters.join(';')

  const args = ['-y']

  // Input 0: audio (real or silent)
  if (audioFile) {
    args.push('-i', audioFile)
  } else {
    args.push('-f', 'lavfi', '-t', String(duration), '-i', 'anullsrc=r=44100:cl=mono')
  }

  // Input 1: color background (used by filter_complex)
  args.push(
    '-f', 'lavfi',
    '-i', `color=c=${VIDEO.bgColor}:s=${VIDEO.width}x${VIDEO.height}:d=${duration}:r=${VIDEO.fps}`,
  )

  args.push(
    '-filter_complex', filterComplex,
    '-map', '[final]',
    '-map', '0:a',
    '-c:a', 'aac', '-b:a', '128k',
  )

  if (audioFile) {
    args.push('-map', '0:a', '-c:a', 'aac', '-b:a', '128k')
  }

  args.push(
    '-c:v', 'libx264',
    '-preset', 'fast',
    '-crf', '23',
    '-pix_fmt', 'yuv420p',
    '-t', String(duration),
    videoPath,
  )

  return args
}

function runFFmpeg(args) {
  return new Promise((resolve, reject) => {
    const proc = spawn('ffmpeg', args, { stdio: ['pipe', 'pipe', 'pipe'] })
    let stderr = ''
    proc.stderr.on('data', d => { stderr += d.toString() })
    proc.on('close', code => {
      if (code === 0) resolve()
      else reject(new Error(`ffmpeg exit code ${code}: ${stderr.slice(-500)}`))
    })
    proc.on('error', reject)
  })
}

// ── Step 5: Generate Platform Captions + Post ───────────────
async function publishContent(scripts, videoFiles) {
  console.log('\n[5/5] PREPARING PLATFORM CONTENT...')
  const outDir = join(ROOT, 'marketing', 'content-packs', `day-${dayNumber}`)
  const dateStr = new Date().toISOString().split('T')[0]

  // Generate captions per platform
  for (let i = 0; i < scripts.length; i++) {
    const script = scripts[i]
    const postIndex = i + 1

    const captions = PLATFORMS.map(platform => {
      const utm = `https://voltsleep.nl?utm_source=${platform}&utm_medium=organic&utm_campaign=day${dayNumber}_${dateStr}&utm_content=hook_${postIndex}`
      let caption = script.caption
      if (platform === 'tiktok') caption = `${script.caption}\n\n${script.hashtags}\n\nLink in bio`
      else if (platform === 'instagram') caption = `${script.caption}\n\n${script.hashtags}\n\nLink in bio for free energy profile`
      else if (platform === 'youtube') caption = `${script.caption} #shorts ${script.hashtags}`
      else if (platform === 'facebook') caption = `${script.caption}\n\n${script.hashtags}`
      return `## ${platform.toUpperCase()}\n\n**Caption:**\n${caption}\n\n**UTM Link:** ${utm}\n`
    }).join('\n---\n\n')

    writeFileSync(join(outDir, `captions-${postIndex}.md`),
      `# Captions for Script ${dayNumber}.${postIndex} (${SCHEDULE_TIMES[i]})\n\n${captions}`)
  }

  // Publish queue JSON
  const queue = scripts.flatMap((s, i) =>
    PLATFORMS.map(platform => ({
      platform,
      day_number: dayNumber,
      post_index: i + 1,
      script: s.raw.split('---')[0].trim(),
      caption: s.caption,
      hashtags: s.hashtags,
      thumbnail_text: s.thumbnail,
      cta_variant: CTA_VARIANTS[i],
      video_file: videoFiles[i] ? `video-${i + 1}.mp4` : null,
      utm_link: `https://voltsleep.nl?utm_source=${platform}&utm_medium=organic&utm_campaign=day${dayNumber}_${dateStr}&utm_content=hook_${i + 1}`,
      scheduled_at: `${dateStr}T${SCHEDULE_TIMES[i]}:00Z`,
      status: videoFiles[i] ? 'ready' : 'no_video',
    }))
  )

  writeFileSync(join(outDir, 'publish-queue.json'), JSON.stringify(queue, null, 2))

  // Auto-post if requested
  if (shouldPost) {
    console.log('\n  AUTO-POSTING...')
    for (let i = 0; i < scripts.length; i++) {
      if (!videoFiles[i]) {
        console.log(`  Skipping script ${i + 1}: no video file`)
        continue
      }

      for (const platform of PLATFORMS) {
        try {
          await postToPlatform(platform, scripts[i], videoFiles[i])
          console.log(`  Posted to ${platform}: script ${i + 1}`)
        } catch (err) {
          console.log(`  Failed ${platform} script ${i + 1}: ${err.message}`)
        }
      }
    }
  }

  return queue
}

async function postToPlatform(platform, script, videoFile) {
  switch (platform) {
    case 'tiktok': return postToTikTok(script, videoFile)
    case 'instagram': return postToInstagram(script, videoFile)
    case 'youtube': return postToYouTube(script, videoFile)
    case 'facebook': return postToFacebook(script, videoFile)
  }
}

async function postToTikTok(script, videoFile) {
  const token = process.env.TIKTOK_ACCESS_TOKEN
  if (!token) throw new Error('TIKTOK_ACCESS_TOKEN not set')

  // TikTok Content Posting API - init upload
  const res = await fetch('https://open.tiktokapis.com/v2/post/publish/content/init/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      post_info: {
        title: `${script.caption}\n\n${script.hashtags}`,
        privacy_level: 'PUBLIC_TO_EVERYONE',
      },
      source_info: { source: 'FILE_UPLOAD', video_size: 0 },
      post_mode: 'DIRECT_POST',
      media_type: 'VIDEO',
    }),
  })

  if (!res.ok) throw new Error(`TikTok API: ${res.status}`)
  return res.json()
}

async function postToInstagram(script, videoFile) {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  const userId = process.env.INSTAGRAM_USER_ID
  if (!token || !userId) throw new Error('INSTAGRAM_ACCESS_TOKEN or INSTAGRAM_USER_ID not set')

  // Note: Instagram requires a publicly accessible video URL
  // In production, upload to cloud storage first, then pass URL
  throw new Error('Instagram requires video hosted at public URL — upload to cloud storage first')
}

async function postToYouTube(script, videoFile) {
  const refreshToken = process.env.YOUTUBE_REFRESH_TOKEN
  if (!refreshToken) throw new Error('YOUTUBE_REFRESH_TOKEN not set')

  // YouTube requires OAuth2 flow — complex for CLI
  // In production, use the n8n workflow instead
  throw new Error('YouTube posting requires OAuth2 — use n8n workflow for auto-posting')
}

async function postToFacebook(script, videoFile) {
  const token = process.env.FACEBOOK_ACCESS_TOKEN
  const pageId = process.env.FACEBOOK_PAGE_ID
  if (!token || !pageId) throw new Error('FACEBOOK_ACCESS_TOKEN or FACEBOOK_PAGE_ID not set')

  // Note: Facebook Reels requires video uploaded via resumable upload API
  throw new Error('Facebook requires resumable upload — use n8n workflow for auto-posting')
}

// ── Main ────────────────────────────────────────────────────
async function main() {
  console.log('='.repeat(60))
  console.log('  VOLT Sleep — Full Automated Content Pipeline')
  console.log(`  Day: ${dayNumber} | Locale: ${locale} | Voice: ${voice}`)
  console.log(`  Auto-post: ${shouldPost} | Use existing: ${useExisting}`)
  console.log('='.repeat(60))

  const startTime = Date.now()

  // Step 1: Generate or load scripts
  const scripts = await generateScripts()

  // Step 2: Generate TTS audio
  const audioFiles = await generateAudio(scripts)

  // Step 3: Generate SRT subtitles
  const srtFiles = generateSubtitles(scripts)

  // Step 4: Render videos
  const videoFiles = await renderVideos(scripts, audioFiles, srtFiles)

  // Step 5: Generate captions + optionally post
  const queue = await publishContent(scripts, videoFiles)

  // Summary
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
  const outDir = join(ROOT, 'marketing', 'content-packs', `day-${dayNumber}`)
  const successCount = videoFiles.filter(Boolean).length

  console.log('\n' + '='.repeat(60))
  console.log('  PIPELINE COMPLETE')
  console.log('='.repeat(60))
  console.log(`  Time: ${elapsed}s`)
  console.log(`  Videos rendered: ${successCount}/3`)
  console.log(`  Output: ${outDir}/`)
  console.log('')
  console.log('  Files:')
  console.log('  ├── script-1.md, script-2.md, script-3.md')
  console.log('  ├── audio-1.mp3, audio-2.mp3, audio-3.mp3')
  console.log('  ├── subtitles-1.srt, subtitles-2.srt, subtitles-3.srt')
  console.log('  ├── video-1.mp4, video-2.mp4, video-3.mp4     ← UPLOAD THESE')
  console.log('  ├── captions-1.md, captions-2.md, captions-3.md')
  console.log('  └── publish-queue.json')
  console.log('')

  if (shouldPost) {
    console.log('  Auto-posting: attempted (check logs above)')
  } else {
    console.log('  Next: upload video-1/2/3.mp4 to TikTok, IG, YT, FB')
    console.log('  Or run with --post flag to auto-post')
  }

  console.log('')
}

main().catch(err => {
  console.error('\nFATAL:', err.message)
  process.exit(1)
})
