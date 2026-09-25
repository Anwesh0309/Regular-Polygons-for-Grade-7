import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { SIM_NARRATION } from '../src/data/content.js';

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
  console.error('Could not read .env.local');
  process.exit(1);
}

const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2';
const MODEL_ID = 'eleven_multilingual_v2';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'audio');

const settings = { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true };

async function generateAudio(filename, text) {
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
        console.log(`✓ Updated ${filename}.mp3`);
        resolve();
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function main() {
  for (const [key, text] of Object.entries(SIM_NARRATION)) {
    console.log(`Generating ${key}...`);
    await generateAudio(key, text);
    await new Promise((r) => setTimeout(r, 500));
  }
  console.log('Simulate audio updated successfully!');
}

main();
