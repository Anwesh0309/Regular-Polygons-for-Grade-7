import { useState } from 'react';
import { playAudio, stopNarration } from '../utils/audio';

const JOURNEY_PHASES = [
  { icon: '🔍', label: 'Wonder', desc: 'A polygon mystery!' },
  { icon: '📖', label: 'Story', desc: 'See regular polygons in action' },
  { icon: '🧪', label: 'Simulate', desc: 'Build & explore polygons' },
  { icon: '🎮', label: 'Practice', desc: 'Gamified reasoning challenges' },
  { icon: '📓', label: 'Reflect', desc: 'What did you learn?' },
];

export default function IntroScreen({ onStart }) {
  const [started, setStarted] = useState(false);
  const [showJourneyBtn, setShowJourneyBtn] = useState(false);

  const handleStartAudio = () => {
    setStarted(true);
    playAudio('intro');
    // After 5s, show "Begin Your Journey"
    setTimeout(() => {
      setShowJourneyBtn(true);
    }, 5000);
  };

  const handleStartJourney = () => {
    stopNarration();
    onStart();
  };

  return (
    <div className="intro-screen">
      {/* Curriculum badge */}
      <div className="intro-badge">
        ✨  · Grade 7 Maths
      </div>

      {/* Title */}
      <h1 className="intro-title">
        <span style={{ color: 'var(--gold)' }}>Regular Polygons</span>{' '}—{' '}
        <span style={{ color: 'var(--coral)' }}>&amp; Reasoning</span>
      </h1>

      {/* Mascot */}
      <div className="mascot-container">
        <div className="mascot">🤖</div>
        <div className="speech-bubble">
          Let's explore regular polygons! 🔷
        </div>
      </div>

      {/* Description */}
      <p className="intro-desc">
        Discover what makes a polygon <strong style={{ color: 'var(--gold)' }}>regular</strong>, master interior &amp; exterior angles, and reason your way through real shape puzzles!
      </p>

      {/* Journey map */}
      <div className="intro-journey-map">
        <h3 className="intro-journey-title">Your Learning Journey</h3>
        <div className="intro-journey-steps">
          {JOURNEY_PHASES.map((p, i) => (
            <div key={i} className="intro-journey-step">
              <div className="intro-journey-icon">{p.icon}</div>
              <div className="intro-journey-info">
                <div className="intro-journey-label">{p.label}</div>
                <div className="intro-journey-desc">{p.desc}</div>
              </div>
              {i < JOURNEY_PHASES.length - 1 && <div className="intro-journey-arrow">→</div>}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      {!started ? (
        <button className="btn btn-primary btn-lg intro-start-btn" onClick={handleStartAudio} id="start-learning-btn">
          🔊 Start Learning
        </button>
      ) : showJourneyBtn ? (
        <button className="btn btn-green btn-lg intro-start-btn" onClick={handleStartJourney} id="start-journey-btn" style={{ animation: 'bounceIn 0.5s' }}>
          🚀 Begin Your Journey!
        </button>
      ) : (
        <button className="btn btn-primary btn-lg intro-start-btn" disabled style={{ opacity: 0.8 }}>
          🔊 Listening...
        </button>
      )}

      {/* Feature cards */}
      <div className="feature-cards">
        <div className="feature-card">
          <div className="feature-card-icon">🎯</div>
          <div className="feature-card-label">100 Challenges</div>
        </div>
        <div className="feature-card">
          <div className="feature-card-icon">🔷</div>
          <div className="feature-card-label">Regular Polygons</div>
        </div>
        <div className="feature-card">
          <div className="feature-card-icon">✨</div>
          <div className="feature-card-label">Badges &amp; XP</div>
        </div>
      </div>
    </div>
  );
}
