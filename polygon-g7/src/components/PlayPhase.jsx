import { useState, useCallback, useEffect } from 'react';
import { playAudio, stopNarration, hasAudio } from '../utils/audio';
import { WORLDS_DATA, QUESTION_BANK } from '../data/content';

function calcXP(attempt, streak) {
  const base = attempt === 1 ? 10 : 5;
  return base + (streak >= 5 ? 5 : 0);
}

function calcStars(correct, total) {
  const pct = correct / total;
  if (pct >= 0.9) return 3;
  if (pct >= 0.7) return 2;
  if (pct >= 0.5) return 1;
  return 0;
}

export default function PlayPhase({ onComplete }) {
  const [currentWorld, setCurrentWorld] = useState(-1);
  const [worldResults, setWorldResults] = useState({});
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [xpPopup, setXpPopup] = useState(null);
  const [worldComplete, setWorldComplete] = useState(false);
  const [worldQuestions, setWorldQuestions] = useState([]);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    playAudio('practice_intro');
    return () => stopNarration();
  }, []);

  const q = worldQuestions[qIndex];

  // Narrate the current question the moment it appears. If the user
  // navigates away (world change, unmount, or moving to the next
  // question) before it finishes, stopNarration() cuts it off — a
  // skipped question is never narrated after the fact.
  useEffect(() => {
    if (currentWorld < 0 || worldComplete || !q) return;
    setShowHint(false);
    if (hasAudio(`practice_q_${currentWorld}_${qIndex}`)) {
      playAudio(`practice_q_${currentWorld}_${qIndex}`);
    }
    return () => stopNarration();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWorld, qIndex, worldComplete]);

  const startWorld = useCallback((worldId) => {
    const questions = QUESTION_BANK[worldId];
    setWorldQuestions(questions);
    setCurrentWorld(worldId);
    setQIndex(0); setScore(0); setLives(3); setStreak(0);
    setWorldComplete(false); setFeedback(null); setAnswered(false);
  }, []);

  const finishWorld = useCallback(() => {
    stopNarration();
    const w = WORLDS_DATA[currentWorld];
    const stars = calcStars(score, worldQuestions.length);
    setWorldResults(prev => ({ ...prev, [currentWorld]: { score, total: worldQuestions.length, stars } }));
    setWorldComplete(true);
  }, [currentWorld, score, worldQuestions.length]);

  const backToMap = useCallback(() => {
    stopNarration();
    setCurrentWorld(-1); setWorldComplete(false); setFeedback(null);
  }, []);

  const handleAllComplete = useCallback(() => {
    stopNarration();
    const totalScore = Object.values(worldResults).reduce((a, r) => a + r.score, 0) + score;
    const totalQ = Object.values(worldResults).reduce((a, r) => a + r.total, 0) + (worldQuestions.length || 0);
    onComplete({
      score: totalScore, xp: totalXP, maxStreak,
      totalAnswered: totalQ,
      worldResults: { ...worldResults, [currentWorld]: { score, total: worldQuestions.length, stars: calcStars(score, worldQuestions.length) } },
    });
  }, [worldResults, score, totalXP, maxStreak, worldQuestions, currentWorld, onComplete]);

  const advance = useCallback(() => {
    setFeedback(null); setAnswered(false);
    if (qIndex + 1 < worldQuestions.length && lives > 0) {
      setQIndex(i => i + 1);
    } else {
      finishWorld();
    }
  }, [qIndex, worldQuestions.length, lives, finishWorld]);

  const handleHint = useCallback(() => {
    setShowHint(true);
    if (hasAudio(`practice_hint_${currentWorld}_${qIndex}`)) {
      playAudio(`practice_hint_${currentWorld}_${qIndex}`);
    }
  }, [currentWorld, qIndex]);

  const handleAnswer = useCallback((optIdx) => {
    if (answered) return;
    setAnswered(true);
    stopNarration(); // cut off question/hint narration the instant an answer is picked
    const isCorrect = optIdx === q.correct;

    if (isCorrect) {
      const ns = streak + 1;
      const earned = calcXP(1, ns);
      setScore(s => s + 1); setStreak(ns);
      setMaxStreak(ms => Math.max(ms, ns));
      setTotalXP(x => x + earned);
      playAudio('very_good');
      setXpPopup(`+${earned} XP`);
      setTimeout(() => setXpPopup(null), 1500);
      setFeedback({ type: 'correct', message: ns >= 5 ? `🔥 ${ns} Streak!` : 'Correct! 🎉', sub: q.explanation });
      setTimeout(advance, 1800);
    } else {
      setStreak(0); setLives(l => l - 1);
      playAudio('incorrect');
      setFeedback({ type: 'wrong', message: 'Not quite!', sub: `The correct answer was: ${q.options[q.correct]}` });
      if (lives - 1 <= 0) setTimeout(finishWorld, 2000);
      else setTimeout(advance, 2000);
    }
  }, [streak, q, advance, lives, finishWorld, answered]);

  // World Map
  if (currentWorld < 0) {
    const allDone = WORLDS_DATA.every((_, i) => worldResults[i]);
    return (
      <div className="play-phase">
        <div className="play-header">
          <h2 className="play-title">🎮 Practice — Choose Your World!</h2>
          <p className="play-subtitle">Beat each world to unlock the next one. Earn stars and XP!</p>
          {totalXP > 0 && <div className="play-xp-badge">⭐ {totalXP} XP</div>}
        </div>
        <div className="world-map">
          {WORLDS_DATA.map((w, i) => {
            const unlocked = i === 0 || worldResults[i - 1];
            const completed = worldResults[i];
            return (
              <div key={w.id} className={`world-card ${unlocked ? 'unlocked' : 'locked'} ${completed ? 'completed' : ''}`}
                onClick={() => unlocked && startWorld(i)} style={{ '--world-color': w.color }}>
                {!unlocked && <div className="world-lock">🔒</div>}
                <div className="world-icon">{w.icon}</div>
                <div className="world-name">{w.name}</div>
                <div className="world-desc">{w.desc}</div>
                {completed && (
                  <div className="world-stars">
                    {[1, 2, 3].map(s => (<span key={s} style={{ opacity: s <= completed.stars ? 1 : 0.2 }}>⭐</span>))}
                    <span className="world-score">{completed.score}/{completed.total}</span>
                  </div>
                )}
                {unlocked && !completed && <div className="world-play-btn">▶ PRACTICE</div>}
              </div>
            );
          })}
        </div>
        {allDone && (
          <button className="btn btn-green btn-lg" onClick={handleAllComplete} style={{ marginTop: 24, animation: 'bounceIn 0.5s ease' }}>
            🏆 Complete Challenge!
          </button>
        )}
      </div>
    );
  }

  // World Complete
  if (worldComplete) {
    const w = WORLDS_DATA[currentWorld];
    const stars = calcStars(score, worldQuestions.length);
    const isLastWorld = currentWorld === WORLDS_DATA.length - 1;
    return (
      <div className="play-phase">
        <div className="world-complete-card">
          <div className="world-complete-icon">{w.icon}</div>
          <h2 className="world-complete-title">{w.name} Complete!</h2>
          <div className="world-complete-score">{score}/{worldQuestions.length}</div>
          <div className="world-complete-stars">
            {[1, 2, 3].map(s => (
              <span key={s} className={`world-star ${s <= stars ? 'earned' : ''}`} style={{ animationDelay: `${s * 0.2}s` }}>⭐</span>
            ))}
          </div>
          <div className="world-complete-xp">⭐ {totalXP} XP earned</div>
          <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="btn btn-outline btn-sm" onClick={backToMap}>← World Map</button>
            {isLastWorld ? (
              <button className="btn btn-green" onClick={handleAllComplete}>🏆 Finish!</button>
            ) : (
              <button className="btn btn-primary" onClick={() => {
                setWorldResults(prev => ({ ...prev, [currentWorld]: { score, total: worldQuestions.length, stars } }));
                startWorld(currentWorld + 1);
              }}>Next World →</button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Question View
  if (!q) return null;
  const w = WORLDS_DATA[currentWorld];
  const pct = Math.round((qIndex / worldQuestions.length) * 100);

  return (
    <div className="play-phase">
      <div className="play-world-badge" style={{ background: w.color }}>{w.icon} {w.name}</div>
      <div className="hud">
        <div className="hud-item">⭐ {totalXP}</div>
        <div className="hearts">
          {Array.from({ length: 3 }, (_, i) => (<span key={i} style={{ opacity: i < lives ? 1 : 0.2 }}>❤️</span>))}
        </div>
        <div className={`hud-item ${streak >= 5 ? 'streak-fire' : ''}`}>🔥 {streak}x</div>
      </div>
      <div style={{ width: '100%', maxWidth: 700, marginBottom: 16 }}>
        <div className="progress-bar-container">
          <div className="progress-bar-label">
            <span>Question {qIndex + 1}/{worldQuestions.length}</span>
            <span>{pct}%</span>
          </div>
          <div className="progress-bar-track"><div className="progress-bar-fill" style={{ width: `${pct}%` }} /></div>
        </div>
      </div>
      <div className="question-card" style={{ animation: 'slideUp 0.3s ease' }}>
        <div className="question-text">{q.q}</div>
        <div className="options-grid">
          {q.options.map((opt, i) => (
            <button key={i} className={`option-btn ${answered ? (i === q.correct ? 'correct' : 'disabled') : ''}`} onClick={() => handleAnswer(i)} disabled={answered}>
              {opt}
            </button>
          ))}
        </div>
        {!answered && q.hint && (
          <div style={{ marginTop: 14 }}>
            {!showHint ? (
              <button onClick={handleHint} style={{ padding: '8px 16px', borderRadius: 10, border: '1px solid rgba(255,193,7,0.3)', background: 'rgba(255,193,7,0.08)', color: 'var(--gold)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
                💡 Show Hint
              </button>
            ) : (
              <div style={{ padding: '10px 16px', borderRadius: 10, background: 'rgba(255,193,7,0.1)', border: '1px solid rgba(255,193,7,0.3)', color: 'var(--gold)', fontSize: '0.9rem', fontWeight: 600, textAlign: 'left' }}>
                💡 {q.hint}
              </div>
            )}
          </div>
        )}
      </div>
      {xpPopup && <div className="xp-popup">{xpPopup}</div>}
      {feedback && (
        <div className="feedback-overlay">
          <div className={`feedback-content ${feedback.type}`}>
            <div className="feedback-emoji">{feedback.type === 'correct' ? '🎉' : '😢'}</div>
            <div className="feedback-message">{feedback.message}</div>
            <div className="feedback-sub">{feedback.sub}</div>
          </div>
        </div>
      )}
    </div>
  );
}
