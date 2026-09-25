import { useState, useEffect, useCallback } from 'react';
import { playAudio, stopNarration } from '../utils/audio';
import { WONDER } from '../data/content';

export default function WonderPhase({ onComplete }) {
  const wonder = WONDER;
  const [stage, setStage] = useState(0);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const p = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: wonder.bgEmojis[i % wonder.bgEmojis.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 12,
      size: 1.2 + Math.random() * 1.5,
    }));
    setParticles(p);
  }, [wonder]);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 300);
    const t2 = setTimeout(() => {
      setStage(2);
      playAudio('wonder');
    }, 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); stopNarration(); };
  }, []);

  const handleDiscover = useCallback(() => {
    stopNarration();
    setTimeout(() => onComplete(), 600);
  }, [onComplete]);

  return (
    <div className="wonder-phase">
      <div className="wonder-particles">
        {particles.map(p => (
          <span key={p.id} className="wonder-particle" style={{
            left: `${p.x}%`, top: `${p.y}%`,
            animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s`,
            fontSize: `${p.size}rem`,
          }}>{p.emoji}</span>
        ))}
      </div>
      <div className="wonder-content">
        <div className={`wonder-question-card ${stage >= 1 ? 'visible' : ''}`}>
          <div className="wonder-emoji" style={{ fontSize: '3rem' }}>{wonder.emoji}</div>
          <h2 className="wonder-question-text" style={{ fontSize: '1.6rem', lineHeight: '1.5' }}>{wonder.question}</h2>
          <p className="wonder-subtext" style={{ fontSize: '1.3rem', marginTop: '16px', lineHeight: '1.5', color: 'var(--gold)' }}>{wonder.subtext}</p>
        </div>
        <button className={`btn btn-wonder ${stage >= 2 ? 'visible' : ''}`} onClick={handleDiscover} id="discover-btn">
          <span className="wonder-btn-sparkle">✨</span>
          Let's Discover!
          <span className="wonder-btn-sparkle">✨</span>
        </button>
      </div>
    </div>
  );
}
