// audio.js
import { QUESTION_BANK } from '../data/content';

let isMuted = false;
let currentAudio = null;
let currentTrackName = null;

const audioFiles = {
  intro: '/audio/intro.mp3',
  wonder: '/audio/wonder.mp3',
  story_0: '/audio/story_0.mp3',
  story_1: '/audio/story_1.mp3',
  story_2: '/audio/story_2.mp3',
  story_3: '/audio/story_3.mp3',
  story_4: '/audio/story_4.mp3',
  sim_0: '/audio/sim_0.mp3',
  sim_1: '/audio/sim_1.mp3',
  sim_2: '/audio/sim_2.mp3',
  sim_3: '/audio/sim_3.mp3',
  practice_intro: '/audio/practice_intro.mp3',
  very_good: '/audio/very_good.mp3',
  incorrect: '/audio/incorrect.mp3',
};

// Auto-register one audio key per practice question (and per hint, only
// where a hint exists) so the map can never fall out of sync with
// src/data/content.js — this mirrors the "auto-generated audioMap" idea
// from the original pipeline, just inlined into this single file.
QUESTION_BANK.forEach((worldQuestions, w) => {
  worldQuestions.forEach((q, i) => {
    audioFiles[`practice_q_${w}_${i}`] = `/audio/practice_q_${w}_${i}.mp3`;
    if (q.hint) {
      audioFiles[`practice_hint_${w}_${i}`] = `/audio/practice_hint_${w}_${i}.mp3`;
    }
  });
});

/**
 * Plays a track by key. Always stops/rewinds whatever is currently
 * playing FIRST, so two narrations can never overlap — this is the only
 * function that touches `currentAudio`, keeping playback strictly
 * single-threaded no matter which phase or component calls it.
 */
export function playAudio(trackName) {
  currentTrackName = trackName;
  if (isMuted) return;

  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  if (audioFiles[trackName]) {
    currentAudio = new Audio(audioFiles[trackName]);
    currentAudio.play().catch(e => console.error('Audio play blocked', e));
  }
}

export function playCorrect() {
  playAudio('very_good');
}

export function playWrong() {
  playAudio('incorrect');
}

// Called on every phase/slide/question unmount or skip — guarantees a
// skipped screen's narration is never heard after the user has moved on.
export function stopNarration() {
  currentTrackName = null;
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
}

export function setMuted(muted) {
  isMuted = muted;
  if (muted) {
    if (currentAudio) currentAudio.pause();
  } else if (currentTrackName && audioFiles[currentTrackName]) {
    if (currentAudio) currentAudio.pause();
    currentAudio = new Audio(audioFiles[currentTrackName]);
    currentAudio.play().catch(e => console.error('Audio play blocked', e));
  }
}

export function isAudioMuted() {
  return isMuted;
}

export function hasAudio(trackName) {
  return Boolean(audioFiles[trackName]);
}
