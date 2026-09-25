// scripts/generate_audio.mjs
//
// Generates every narration .mp3 for the module using the ElevenLabs
// text-to-speech API, then writes public/audio/audioManifest.json (a log
// of what was generated) so you can diff runs.
//
// RUN LOCALLY — this script needs network access to api.elevenlabs.io,
// which this build environment does not have. Steps:
//
//   1. Put your key in a `.env.local` file at the project root:
//        VITE_ELEVENLABS_API_KEY=sk_xxxxxxxx
//   2. npm install
//   3. node scripts/generate_audio.mjs
//
// Content policy: only paragraph text and question/hint text is narrated.
// Titles, labels, and UI chrome are NEVER included below — this mirrors
// the module's audio content policy exactly.

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import {
  STORY_SLIDES,
  WONDER,
  SIM_NARRATION,
  QUESTION_BANK,
  MISC_NARRATION,
} from '../src/data/content.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '..', '.env.local');
let apiKey = '';
try {
  const envFile = fs.readFileSync(envPath, 'utf8');
  for (const line of envFile.split('\n')) {
    if (line.startsWith('VITE_ELEVENLABS_API_KEY=')) {
      apiKey = line.split('=')[1].trim();
    }
  }
} catch {
  console.error('Could not read .env.local — create it with VITE_ELEVENLABS_API_KEY=your_key');
  process.exit(1);
}

if (!apiKey) {
  console.error('VITE_ELEVENLABS_API_KEY is missing from .env.local');
  process.exit(1);
}

const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2'; // Alice — Clear, Engaging Educator
const MODEL_ID = 'eleven_multilingual_v2';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'audio');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Voice settings by narration style — from audio_generation_pipeline.md
const STYLE_SETTINGS = {
  celebration:  { stability: 0.12, similarity_boost: 0.45, style: 0.75, use_speaker_boost: true },
  encouragement:{ stability: 0.16, similarity_boost: 0.50, style: 0.65, use_speaker_boost: true },
  question:     { stability: 0.20, similarity_boost: 0.55, style: 0.55, use_speaker_boost: true },
  emphasis:     { stability: 0.16, similarity_boost: 0.50, style: 0.60, use_speaker_boost: true },
  thinking:     { stability: 0.24, similarity_boost: 0.60, style: 0.35, use_speaker_boost: true },
  statement:    { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
};

/* ── Build the full { filename: { text, style } } map from content.js ── */
const lines = {};

lines.intro = { text: MISC_NARRATION.intro, style: 'statement' };
lines.wonder = { text: `${WONDER.question} ${WONDER.subtext}`, style: 'thinking' };

STORY_SLIDES.forEach((s, i) => {
  lines[`story_${i}`] = { text: `${s.text} ${s.highlight.replace(/"/g, '')}`, style: 'statement' };
});

Object.entries(SIM_NARRATION).forEach(([key, text]) => {
  lines[key] = { text, style: 'instruction' };
});

lines.practice_intro = { text: MISC_NARRATION.practice_intro, style: 'instruction' };
lines.very_good = { text: MISC_NARRATION.very_good, style: 'celebration' };
lines.incorrect = { text: MISC_NARRATION.incorrect, style: 'encouragement' };

QUESTION_BANK.forEach((worldQuestions, w) => {
  worldQuestions.forEach((q, i) => {
    lines[`practice_q_${w}_${i}`] = { text: q.q, style: 'question' };
    if (q.hint) {
      lines[`practice_hint_${w}_${i}`] = { text: `Hint: ${q.hint}`, style: 'thinking' };
    }
  });
});

console.log(`Prepared ${Object.keys(lines).length} narration lines.`);

/* ── ElevenLabs call ── */
async function generateAudio(filename, text, styleName) {
  const settings = STYLE_SETTINGS[styleName] || STYLE_SETTINGS.statement;
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      text,
      model_id: MODEL_ID,
      voice_settings: settings,
    });

    const options = {
      hostname: 'api.elevenlabs.io',
      port: 443,
      path: `/v1/text-to-speech/${VOICE_ID}`,
      method: 'POST',
      headers: {
        Accept: 'audio/mpeg',
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      if (res.statusCode !== 200) {
        let body = '';
        res.on('data', (d) => (body += d));
        res.on('end', () => {
          console.error(`Failed ${filename}: HTTP ${res.statusCode} ${body}`);
          reject(new Error(`HTTP ${res.statusCode}`));
        });
        return;
      }
      const filePath = path.join(OUTPUT_DIR, `${filename}.mp3`);
      const fileStream = fs.createWriteStream(filePath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        console.log(`✓ ${filename}.mp3`);
        resolve();
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function main() {
  const manifest = {};
  const entries = Object.entries(lines);
  for (let i = 0; i < entries.length; i++) {
    const [filename, { text, style }] = entries[i];
    console.log(`[${i + 1}/${entries.length}] Generating ${filename} (${style})...`);
    try {
      await generateAudio(filename, text, style);
      manifest[filename] = { text, style, ok: true };
    } catch (e) {
      manifest[filename] = { text, style, ok: false, error: String(e) };
      console.error(`✗ ${filename} failed:`, e.message);
    }
    await new Promise((r) => setTimeout(r, 500)); // rate-limit buffer
  }
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'audioManifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  const failed = Object.values(manifest).filter((m) => !m.ok).length;
  console.log(`\nDone. ${entries.length - failed}/${entries.length} generated successfully.`);
  if (failed) console.log(`${failed} failed — check audioManifest.json and re-run (it will overwrite everything, which is safe).`);
}

main();
