# Regular Polygons & Reasoning — Grade 7 Math Module

Same UI/UX, architecture, layout, color system, and 6-phase learning journey
(Intro → Wonder → Story → Simulate → Practice → Reflect) as the source
"Variables" module, rebuilt with new content for **Regular Polygons and
Reasoning**.

## What's the same as the source module
- App shell, journey bar, mute/home buttons, phase transitions — `App.jsx` unchanged in structure.
- Design tokens, fonts, radii, shadows, animations — `src/index.css` is the same file.
- Story phase: 5-slide flip-card flow, progress bar, dots, per-slide narration.
- Simulate phase: 4-station scaffold with station-progress dots and a glass-card stage.
- Practice phase: world-map → question → world-complete loop with XP, streak, hearts, stars.
- Reflect phase: teach-the-mascot → confidence check → certificate.
- Audio engine (`src/utils/audio.js`): single-track playback, always stops the
  previous clip before starting the next (this is what guarantees **no audio
  ever overlaps**), and `stopNarration()` is called on every unmount/skip so a
  screen you've navigated away from is never narrated after the fact.

## What's new
- **Content**: Wonder hook, 5 story slides, 4 Simulate stations, and a full
  **10 worlds × 10 questions = 100** Practice question bank — all in
  `src/data/content.js`, the single source of truth for both the UI and the
  audio script.
- **Simulate stations** (same "explore → try it yourself" station role, all-new activities):
  1. **Polygon Builder** — slide the side-count, watch the regular polygon and its angles redraw live.
  2. **Triangle Slicer** — fan out diagonals from one vertex to prove the (n − 2) × 180 formula hands-on.
  3. **Regular Checker** — a guess-and-reveal gallery of shapes; call "Regular" or "Not Regular" and see which condition (sides/angles) holds.
  4. **Exterior Angle Balance** — a circular "pie" of exterior angles that must total exactly 360°; dial in the missing slice.
- **Story illustrations**: instead of raster/AI-generated images, each panel
  uses `PolygonArt.jsx` — a crisp SVG drawing of the exact regular polygon
  being discussed, computed from real geometry (`src/utils/polygonMath.js`),
  so the "picture" is mathematically accurate to the lesson.
- **Practice hints**: every question has a `hint` field. A "💡 Show Hint"
  button reveals it and narrates it — narration only ever plays for the
  question and, on request, its hint (never the answer options).

## Generating the audio (do this yourself, locally)

This project's build environment has no network access to ElevenLabs, so the
`.mp3` files are **not** included — `scripts/generate_audio.mjs` is ready to
produce all **214** of them (2 intro/wonder + 5 story + 4 simulate + 3 feedback
+ 100 questions + 100 hints) from `src/data/content.js` in one run.

```bash
npm install
node scripts/generate_audio.mjs
```

The script reads your key from `.env.local` (already pre-filled — see the
security note below), calls ElevenLabs voice **Alice** (`Xb7hH8MSUJpSbSDYk0k2`)
with model `eleven_multilingual_v2`, applies the per-style voice settings from
`audio_generation_pipeline.md` (celebration / encouragement / question /
thinking / statement / instruction), and writes each file straight into
`public/audio/`. It rate-limits itself (500ms between calls) and writes
`public/audio/audioManifest.json` at the end so you can see what succeeded.

> ⚠️ **Rotate your ElevenLabs key.** It was shared in a chat conversation, so
> treat it as compromised. Generate a new one in your ElevenLabs dashboard,
> then replace the value in `.env.local` before running the app or the script.

## Images

Per your instruction, no new raster/AI-generated images were produced this
round. Story panels currently render as SVG polygon art. If you'd like real
photographs/illustrations later, drop files into `public/images/` and swap
the `<PolygonArt .../>` call in `src/components/StoryPhase.jsx` for an
`<img>` tag — the surrounding layout/CSS (`.story-image-section`,
`.story-image`) already supports either.

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # production build (verified working in this delivery)
```
