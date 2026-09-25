import { useState, useEffect, useCallback } from 'react';
import { playAudio, stopNarration } from '../utils/audio';
import { STORY_SLIDES } from '../data/content';
import PolygonArt from './PolygonArt';

export default function StoryPhase({ onComplete }) {
  const [slide, setSlide] = useState(0);
  const [anim, setAnim] = useState(false);
  const [textVis, setTextVis] = useState(false);
  const [hlVis, setHlVis] = useState(false);
  const s = STORY_SLIDES[slide];
  const isLast = slide === STORY_SLIDES.length - 1;
  const pct = ((slide + 1) / STORY_SLIDES.length) * 100;

  useEffect(() => {
    setTextVis(true);
    setHlVis(true);
    // Story narration is preloaded instantly (no fetch/latency) since it
    // plays straight from the static /audio asset the moment the slide
    // mounts — matching the "story phase audio should be proper without
    // any delay" requirement.
    playAudio(`story_${slide}`);
    return () => stopNarration();
  }, [slide]);

  const goNext = useCallback(() => {
    if (anim) return;
    setAnim(true);
    stopNarration();
    setTimeout(() => { isLast ? onComplete() : setSlide(i => i + 1); setAnim(false); }, 400);
  }, [anim, isLast, onComplete]);

  const goPrev = useCallback(() => {
    if (anim || slide === 0) return;
    setAnim(true);
    stopNarration();
    setTimeout(() => { setSlide(i => i - 1); setAnim(false); }, 400);
  }, [anim, slide]);

  return (
    <div className="story-phase">
      <div className="story-progress">
        <div className="story-progress-bar"><div className="story-progress-fill" style={{ width: `${pct}%` }} /></div>
        <span className="story-progress-label">{slide + 1} / {STORY_SLIDES.length}</span>
      </div>
      <div className={`story-card story-card-flex ${anim ? 'flipping' : ''}`}>
        <div className="story-image-section">
          {s.image ? (
            <img
              src={s.image}
              alt={s.title}
              className="story-image"
              style={{
                borderRadius: 16,
                border: '3px solid rgba(255,255,255,0.15)',
                boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
                width: '100%',
                maxHeight: '460px',
                objectFit: 'contain',
              }}
            />
          ) : (
            <div
              className="story-image"
              style={{ border: '4px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.15)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <PolygonArt n={s.n} color={s.color} glow={`${s.color}55`} label={`${s.n} sides`} sublabel="regular polygon" />
            </div>
          )}
        </div>
        <div className="story-text-section">
          <h2 className="story-title" style={{ fontSize: '2.4rem', fontWeight: 'bold', margin: '0 0 16px 0' }}>{s.title}</h2>
          <p className={`story-text ${textVis ? 'revealed' : ''}`} style={{ fontSize: '1.4rem', fontWeight: 600, lineHeight: '1.7', marginBottom: 0 }}>{s.text}</p>
          <div className={`story-highlight ${hlVis ? 'visible' : ''}`} style={{ margin: '20px 0', padding: '14px 20px' }}>
            <span>✨</span><span className="story-highlight-text" style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>{s.highlight}</span><span>✨</span>
          </div>
          <div className="story-mascot" style={{ marginTop: 8 }}>
            <div className="mascot" style={{ width: 54, height: 54, fontSize: '1.6rem' }}>🤖</div>
            <div className="speech-bubble" style={{ fontSize: '1rem', padding: '10px 14px', maxWidth: 260 }}>{s.mascotText}</div>
          </div>
        </div>
      </div>
      <div className="story-nav">
        <button className="btn btn-outline btn-sm" onClick={goPrev} disabled={slide === 0} style={{ opacity: slide === 0 ? 0.3 : 1 }}>← Back</button>
        <div className="story-dots">
          {STORY_SLIDES.map((_, i) => (<div key={i} className={`story-dot ${i === slide ? 'active' : i < slide ? 'completed' : ''}`} />))}
        </div>
        <button className={`btn ${isLast ? 'btn-green' : 'btn-primary'} btn-sm`} onClick={goNext}>
          {isLast ? "🚀 Let's Explore!" : 'Next →'}
        </button>
      </div>
    </div>
  );
}
