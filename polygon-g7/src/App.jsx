import { useState, useCallback } from 'react';
import FloatingNumbers from './components/FloatingNumbers';
import IntroScreen from './components/IntroScreen';
import WonderPhase from './components/WonderPhase';
import StoryPhase from './components/StoryPhase';
import SimulatePhase from './components/SimulatePhase';
import PlayPhase from './components/PlayPhase';
import ReflectPhase from './components/ReflectPhase';
import { setMuted, isAudioMuted, stopNarration } from './utils/audio';

const PHASES = ['intro', 'wonder', 'story', 'simulate', 'play', 'reflect'];
const JOURNEY_ITEMS = [
  { icon: '🔍', label: 'Wonder' },
  { icon: '📖', label: 'Story' },
  { icon: '🧪', label: 'Simulate' },
  { icon: '🎮', label: 'Practice' },
  { icon: '📓', label: 'Reflect' },
];

export default function App() {
  const [phase, setPhase] = useState('intro');
  const [playStats, setPlayStats] = useState(null);

  const [isMutedState, setIsMutedState] = useState(isAudioMuted());

  const toggleMute = useCallback(() => {
    const newState = !isMutedState;
    setIsMutedState(newState);
    setMuted(newState);
  }, [isMutedState]);

  const goHome = useCallback(() => {
    stopNarration();
    setPhase('intro');
    setPlayStats(null);
  }, []);

  const restart = useCallback(() => {
    stopNarration();
    setPhase('wonder');
    setPlayStats(null);
  }, []);

  const phaseIndex = PHASES.indexOf(phase);
  const showJourney = phase !== 'intro';

  return (
    <>
      <FloatingNumbers />
      <div className="app-container">

        {/* Global Speaker Button */}
        <button
          onClick={toggleMute}
          style={{
            position: 'absolute', top: 80, right: 20, zIndex: 100,
            background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)',
            borderRadius: '50%', width: 44, height: 44, fontSize: '1.2rem',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}
        >
          {isMutedState ? '🔇' : '🔊'}
        </button>

        {/* Home Button */}
        {showJourney && (
          <button className="home-btn" onClick={goHome}>
            🏠 Home
          </button>
        )}

        {/* Journey Progress Bar */}
        {showJourney && (
          <div className="journey-bar">
            {JOURNEY_ITEMS.map((item, i) => {
              const stepPhaseIndex = i + 1; // wonder=1, story=2, etc.
              const isActive = phaseIndex === stepPhaseIndex;
              const isCompleted = phaseIndex > stepPhaseIndex;
              return (
                <div key={i} className="journey-step-wrapper" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className={`journey-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                    <div className="journey-step-dot">{isCompleted ? '✓' : item.icon}</div>
                    <div className="journey-step-label">{item.label}</div>
                  </div>
                  {i < JOURNEY_ITEMS.length - 1 && (
                    <div className={`journey-connector ${phaseIndex > stepPhaseIndex ? 'filled' : ''}`} />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Phase Content */}
        {phase === 'intro' && (
          <IntroScreen
            onStart={() => setPhase('wonder')}
          />
        )}

        {phase === 'wonder' && (
          <WonderPhase
            onComplete={() => setPhase('story')}
          />
        )}

        {phase === 'story' && (
          <StoryPhase
            onComplete={() => setPhase('simulate')}
          />
        )}

        {phase === 'simulate' && (
          <SimulatePhase
            onComplete={() => setPhase('play')}
          />
        )}

        {phase === 'play' && (
          <PlayPhase
            onComplete={(stats) => { setPlayStats(stats); setPhase('reflect'); }}
          />
        )}

        {phase === 'reflect' && (
          <ReflectPhase
            stats={playStats}
            onRestart={restart}
            onGoHome={goHome}
          />
        )}
      </div>
    </>
  );
}
