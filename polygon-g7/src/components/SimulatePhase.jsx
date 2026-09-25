import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { playAudio, stopNarration } from '../utils/audio';
import { polygonVertices, polygonName, interiorSum, interiorAngle, exteriorAngle } from '../utils/polygonMath';

const STATIONS = [
  { id: 0, title: 'Honeycomb & Real-World Builder', subtitle: 'Explore how bees and engineers use regular polygons', icon: '🐝' },
  { id: 1, title: 'Stop Sign Triangulation', subtitle: 'Fan out diagonals across real objects to prove angle sums', icon: '🛑' },
  { id: 2, title: 'Real-World Shape Detective', subtitle: 'Use protractor & ruler to test if items are truly regular', icon: '🔍' },
  { id: 3, title: "Maya's Park Walk Simulator", subtitle: 'Walk around real paths and prove the 360° turn rule', icon: '🚶‍♀️' },
];

/* ══════════════════════════════════════════════════════════════
   STATION 1 — HONEYCOMB & REAL-WORLD BUILDER
   Explore 6 real-world preset objects or build custom n-gons.
   Includes corner protractor arcs and engineering secrets!
══════════════════════════════════════════════════════════════ */
const REAL_WORLD_PRESETS = [
  { n: 6, label: 'Bee Honeycomb Cell', icon: '🐝', color: '#F59E0B', theme: 'honeycomb', secret: 'Bees use regular hexagons because 120° angles tile perfectly with 3 cells meeting at 360°, leaving zero wasted space or wax!' },
  { n: 8, label: 'Street Stop Sign', icon: '🛑', color: '#EF4444', theme: 'stopsign', secret: 'Traffic engineers choose an 8-sided regular octagon (135° angles) so drivers instantly recognize it from any angle, even from behind!' },
  { n: 5, label: 'Park Flower Bed', icon: '🌺', color: '#EC4899', theme: 'flowerbed', secret: '5-sided regular pentagons (108° angles) create natural floral symmetry used in botanical gardens and architectural plazas.' },
  { n: 12, label: '20p British Coin', icon: '🪙', color: '#94A3B8', theme: 'coin', secret: '12-sided regular dodecagons (150° angles) give coins distinct tactile corners so visually impaired citizens can identify currency by touch.' },
  { n: 3, label: 'Yield Traffic Sign', icon: '⚠️', color: '#EAB308', theme: 'yield', secret: 'Equilateral triangles (60° angles) provide maximum physical stability under strong winds and high structural rigidity.' },
  { n: 4, label: 'Square Floor Tile', icon: '🟩', color: '#10B981', theme: 'tile', secret: 'Squares (90° angles) tile 2D surfaces seamlessly (4 × 90° = 360°), making them the most practical choice for floor paving.' },
];

function Station1({ onNext }) {
  const [n, setN] = useState(6);
  const [showProtractor, setShowProtractor] = useState(true);
  const [showSecret, setShowSecret] = useState(false);

  const activePreset = REAL_WORLD_PRESETS.find(p => p.n === n) || {
    n, label: `${n}-Sided Polygon`, icon: '🔷', color: '#7C3AED', theme: 'custom',
    secret: `A regular ${polygonName(n)} has ${n} equal sides and ${n} equal angles of ${interiorAngle(n).toFixed(1)}°.`
  };

  const size = 280, cx = size / 2, cy = size / 2, r = size * 0.38;
  const pts = useMemo(() => polygonVertices(n, cx, cy, r), [n]);
  const pointsAttr = pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const sum = interiorSum(n), each = interiorAngle(n), ext = exteriorAngle(n);

  // Vertex 0 markers
  const v0 = pts[0];

  return (
    <div style={{ textAlign: 'center' }}>
      <div className="station-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <span style={{ fontSize: '2rem' }}>{activePreset.icon}</span>
        <h2>{activePreset.label}</h2>
      </div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 16, fontSize: '0.95rem' }}>
        Select a real-world object from the story or slide the sides. Inspect corner angles and discover nature's secrets!
      </p>

      {/* Preset Selector Badges */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 20 }}>
        {REAL_WORLD_PRESETS.map((p) => (
          <button key={p.n} onClick={() => { setN(p.n); setShowSecret(false); }}
            style={{
              padding: '8px 14px', borderRadius: 12,
              border: `2px solid ${n === p.n ? p.color : 'rgba(255,255,255,0.15)'}`,
              background: n === p.n ? `${p.color}25` : 'rgba(255,255,255,0.04)',
              color: n === p.n ? '#FFF' : 'var(--text-secondary)',
              fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
              transition: 'all 0.2s ease',
              boxShadow: n === p.n ? `0 0 12px ${p.color}44` : 'none',
            }}>
            <span>{p.icon}</span> <span>{p.label}</span>
          </button>
        ))}
      </div>

      {/* Main Canvas & Data Display */}
      <div style={{ display: 'flex', gap: 24, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', background: 'rgba(0,0,0,0.25)', padding: 16, borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)' }}>
          <svg viewBox={`0 0 ${size} ${size}`} width={280} height={280}>
            {/* Real World Stylized Background Patterns */}
            {activePreset.theme === 'stopsign' && (
              <polygon points={pointsAttr} fill="#CC0000" stroke="#FFFFFF" strokeWidth={6} strokeLinejoin="round" />
            )}
            {activePreset.theme === 'honeycomb' && (
              <polygon points={pointsAttr} fill="rgba(245,158,11,0.25)" stroke="#F59E0B" strokeWidth={4} strokeLinejoin="round" />
            )}
            {activePreset.theme === 'flowerbed' && (
              <polygon points={pointsAttr} fill="rgba(236,72,153,0.25)" stroke="#EC4899" strokeWidth={4} strokeLinejoin="round" />
            )}
            {activePreset.theme === 'coin' && (
              <polygon points={pointsAttr} fill="rgba(148,163,184,0.25)" stroke="#94A3B8" strokeWidth={4} strokeLinejoin="round" />
            )}
            {activePreset.theme === 'yield' && (
              <polygon points={pointsAttr} fill="rgba(234,179,8,0.25)" stroke="#EAB308" strokeWidth={4} strokeLinejoin="round" />
            )}
            {activePreset.theme === 'tile' && (
              <polygon points={pointsAttr} fill="rgba(16,185,129,0.25)" stroke="#10B981" strokeWidth={4} strokeLinejoin="round" />
            )}
            {activePreset.theme === 'custom' && (
              <polygon points={pointsAttr} fill="rgba(124,58,237,0.25)" stroke="#7C3AED" strokeWidth={4} strokeLinejoin="round" />
            )}

            {/* Inner Overlay Text for Stop Sign */}
            {activePreset.theme === 'stopsign' && (
              <text x={cx} y={cy + 8} textAnchor="middle" fontSize={32} fontWeight={900} fill="#FFFFFF" letterSpacing={2}>STOP</text>
            )}

            {/* Vertices & Corner Protractor */}
            {pts.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={5} fill={activePreset.color} stroke="#FFF" strokeWidth={1.5} />
            ))}

            {showProtractor && (
              <g>
                <circle cx={v0.x} cy={v0.y} r={22} fill="none" stroke="var(--gold)" strokeWidth={2.5} strokeDasharray="3 3" opacity={0.9} />
                <rect x={v0.x - 32} y={v0.y - 34} width={64} height={22} rx={6} fill="rgba(0,0,0,0.85)" stroke="var(--gold)" strokeWidth={1} />
                <text x={v0.x} y={v0.y - 19} textAnchor="middle" fontSize={12} fontWeight={900} fill="var(--gold)">
                  {Math.round(each)}°
                </text>
              </g>
            )}
          </svg>

          {/* Protractor Toggle */}
          <button onClick={() => setShowProtractor(p => !p)}
            style={{
              position: 'absolute', bottom: 12, right: 12, padding: '4px 10px',
              borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)',
              background: showProtractor ? 'rgba(255,193,7,0.2)' : 'rgba(0,0,0,0.6)',
              color: showProtractor ? 'var(--gold)' : 'var(--text-muted)',
              fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer'
            }}>
            📐 Protractor Arc: {showProtractor ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* Real World Math Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 240, textAlign: 'left' }}>
          <div className="glass-card" style={{ padding: '12px 16px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Object & Sides</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: activePreset.color }}>
              {n} Sides — {polygonName(n)}
            </div>
          </div>
          <div className="glass-card" style={{ padding: '12px 16px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Interior Angle Sum</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#10B981' }}>
              ({n} − 2) × 180° = {sum}°
            </div>
          </div>
          <div className="glass-card" style={{ padding: '12px 16px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Each Interior Angle</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--gold)' }}>
              {sum}° ÷ {n} = {each.toFixed(1)}°
            </div>
          </div>
          <div className="glass-card" style={{ padding: '12px 16px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Each Exterior Angle</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#EC4899' }}>
              360° ÷ {n} = {ext.toFixed(1)}°
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Slider & Secret Discovery Button */}
      <div style={{ margin: '20px auto 12px', maxWidth: 420 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.85rem', fontWeight: 700 }}>
          <span>Custom Sides: {n}</span>
          <span style={{ color: activePreset.color }}>{polygonName(n)}</span>
        </div>
        <input type="range" min={3} max={12} value={n} onChange={e => { setN(+e.target.value); setShowSecret(false); }}
          style={{ width: '100%', accentColor: activePreset.color, cursor: 'pointer' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
          <span>3 (Triangle)</span><span>6 (Hexagon)</span><span>8 (Octagon)</span><span>12 (Dodecagon)</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 16 }}>
        <button className="btn btn-outline btn-sm" onClick={() => setShowSecret(s => !s)} style={{ border: '1px solid var(--gold)', color: 'var(--gold)' }}>
          💡 {showSecret ? 'Hide Secret' : "Why Nature / Humans Use This Shape?"}
        </button>
      </div>

      {showSecret && (
        <div style={{ margin: '14px auto 0', maxWidth: 520, padding: '14px 18px', borderRadius: 14, background: 'rgba(255,193,7,0.12)', border: '1px solid rgba(255,193,7,0.3)', color: 'var(--gold)', textAlign: 'left', fontSize: '0.9rem', lineHeight: '1.5' }}>
          <strong>💡 Engineering & Nature Secret:</strong> {activePreset.secret}
        </div>
      )}

      <button className="btn btn-primary btn-lg" onClick={onNext} style={{ marginTop: 24 }}>Next Station →</button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   STATION 2 — STOP SIGN & OBJECT TRIANGULATION LAB
   Arjun's method: Select a real-world object and click to string
   diagonals from Corner 0 to slice it into triangles.
══════════════════════════════════════════════════════════════ */
const TRIANGULATE_OBJECTS = [
  { n: 8, label: 'Street Stop Sign', icon: '🛑', color: '#EF4444' },
  { n: 5, label: 'Park Flower Bed', icon: '🌺', color: '#EC4899' },
  { n: 6, label: 'Honeycomb Cell', icon: '🐝', color: '#F59E0B' },
  { n: 12, label: '20p Coin', icon: '🪙', color: '#94A3B8' },
];

function Station2({ onNext }) {
  const [objIdx, setObjIdx] = useState(0);
  const [cut, setCut] = useState(0);
  const obj = TRIANGULATE_OBJECTS[objIdx];
  const n = obj.n;
  const maxCuts = n - 3;
  const size = 280, cx = size / 2, cy = size / 2, r = size * 0.38;
  const pts = useMemo(() => polygonVertices(n, cx, cy, r), [n]);
  const pointsAttr = pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

  const triangles = cut + 1 <= n - 2 ? cut + 1 : n - 2;
  const complete = cut >= maxCuts;

  const handleSelectObject = (idx) => {
    setObjIdx(idx);
    setCut(0);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div className="station-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <span style={{ fontSize: '2rem' }}>{obj.icon}</span>
        <h2>Stop Sign & Object Triangulation</h2>
      </div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 16, fontSize: '0.95rem' }}>
        Arjun's Corner Trick! Fan out diagonal string lines from Vertex 0 to slice real-world shapes into triangles.
      </p>

      {/* Object Switcher Badges */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
        {TRIANGULATE_OBJECTS.map((item, idx) => (
          <button key={item.n} onClick={() => handleSelectObject(idx)}
            style={{
              padding: '6px 14px', borderRadius: 10,
              border: `2px solid ${objIdx === idx ? item.color : 'rgba(255,255,255,0.15)'}`,
              background: objIdx === idx ? `${item.color}25` : 'transparent',
              color: objIdx === idx ? '#FFF' : 'var(--text-secondary)',
              fontWeight: 700, cursor: 'pointer'
            }}>
            {item.icon} {item.label} ({item.n} sides)
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${size} ${size}`} width={280} height={280} style={{ margin: '0 auto', display: 'block', background: 'rgba(0,0,0,0.2)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)' }}>
        <polygon points={pointsAttr} fill={`${obj.color}20`} stroke={obj.color} strokeWidth={3.5} strokeLinejoin="round" />

        {/* Draw Fan Diagonals */}
        {Array.from({ length: cut }).map((_, i) => {
          const targetIdx = i + 2;
          const target = pts[targetIdx];
          return (
            <g key={i}>
              <line x1={pts[0].x} y1={pts[0].y} x2={target.x} y2={target.y}
                stroke="var(--gold)" strokeWidth={2.5} strokeDasharray="4 2" />
            </g>
          );
        })}

        {/* Render Vertex Numbers */}
        {pts.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={i === 0 ? 8 : 5} fill={i === 0 ? 'var(--gold)' : obj.color} stroke="#FFF" strokeWidth={1.5} />
            <text x={p.x} y={p.y > cy ? p.y + 14 : p.y - 10} textAnchor="middle" fontSize={11} fontWeight={900} fill={i === 0 ? 'var(--gold)' : 'rgba(255,255,255,0.8)'}>
              V{i}
            </text>
          </g>
        ))}
      </svg>

      {/* Triangulation Math Counters */}
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', margin: '16px 0', flexWrap: 'wrap' }}>
        <div className="glass-card" style={{ padding: '10px 18px', minWidth: 140 }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Diagonals Drawn</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--gold)' }}>{cut} / {maxCuts}</div>
        </div>
        <div className="glass-card" style={{ padding: '10px 18px', minWidth: 140 }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Triangles Formed</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#10B981' }}>{triangles}</div>
        </div>
        <div className="glass-card" style={{ padding: '10px 18px', minWidth: 180 }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Angle Sum Equation</div>
          <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#EC4899' }}>{triangles} × 180° = {triangles * 180}°</div>
        </div>
      </div>

      {/* Interactive Controls */}
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 14 }}>
        <button className="btn btn-primary" onClick={() => setCut(c => Math.min(maxCuts, c + 1))} disabled={complete}>
          + Draw Diagonal String
        </button>
        <button className="btn btn-secondary" onClick={() => setCut(maxCuts)} disabled={complete}>
          ⚡ Fan All Diagonals
        </button>
        <button className="btn btn-outline btn-sm" onClick={() => setCut(0)} disabled={cut === 0}>
          ↺ Reset
        </button>
      </div>

      {complete && (
        <div style={{ margin: '0 auto 16px', maxWidth: 500, padding: '14px 18px', borderRadius: 14, background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.4)', color: '#81c784', fontWeight: 700, textAlign: 'left', fontSize: '0.9rem', lineHeight: '1.5' }}>
          🎉 <strong>Triangulation Proof Complete!</strong> Stringing diagonals from V0 divides the {obj.label} ({n} sides) into exactly {n - 2} triangles.
          <br />
          <strong>Formula:</strong> ({n} − 2) × 180° = {(n - 2) * 180}°.
          <br />
          <strong>Each Corner Angle:</strong> {(n - 2) * 180}° ÷ {n} = {((n - 2) * 180 / n).toFixed(1)}°!
        </div>
      )}

      <button className="btn btn-primary btn-lg" onClick={onNext}>Next Station →</button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   STATION 3 — REAL-WORLD SHAPE DETECTIVE
   Maya & Arjun's Inspector Casebook: Test real-world items
   using Digital Ruler & Protractor tools!
══════════════════════════════════════════════════════════════ */
const DETECTIVE_CASES = [
  {
    name: 'Bee Honeycomb Cell', icon: '🐝',
    points: '80,30 180,30 230,130 180,230 80,230 30,130',
    sidesEqual: true, anglesEqual: true,
    sideDetails: 'All 6 sides = 4.0 cm', angleDetails: 'All 6 corner angles = 120°',
    pedagogy: 'Both rules pass! 6 equal sides AND 6 equal angles make it a true Regular Hexagon.'
  },
  {
    name: 'Classroom Door', icon: '🚪',
    points: '30,50 230,50 230,210 30,210',
    sidesEqual: false, anglesEqual: true,
    sideDetails: 'Height = 8 cm, Width = 4 cm (Unequal!)', angleDetails: 'All 4 corner angles = 90°',
    pedagogy: 'Failed Rule 1! Having 4 right angles is not enough — the sides are unequal, so it is an Irregular Rectangle.'
  },
  {
    name: 'Diamond Kite', icon: '🪁',
    points: '130,20 230,130 130,240 30,130',
    sidesEqual: true, anglesEqual: false,
    sideDetails: 'All 4 sides = 5.0 cm', angleDetails: 'Angles are 70°, 110°, 70°, 110° (Unequal!)',
    pedagogy: 'Failed Rule 2! Having 4 equal sides is not enough — the corner angles are unequal, so it is an Irregular Rhombus.'
  },
  {
    name: 'Street Stop Sign', icon: '🛑',
    points: '90,25 170,25 225,80 225,160 170,215 90,215 35,160 35,80',
    sidesEqual: true, anglesEqual: true,
    sideDetails: 'All 8 sides = 3.5 cm', angleDetails: 'All 8 corner angles = 135°',
    pedagogy: 'Both rules pass! 8 equal sides AND 8 equal angles make it a true Regular Octagon.'
  },
  {
    name: 'Pizza Slice', icon: '🍕',
    points: '130,30 220,220 40,220',
    sidesEqual: false, anglesEqual: false,
    sideDetails: 'Sides are 6 cm, 6 cm, and 4 cm', angleDetails: 'Angles are 70°, 70°, and 40°',
    pedagogy: 'Failed both rules! The bottom crust is shorter than the sides, making it an Irregular Isosceles Triangle.'
  },
  {
    name: '20p British Coin', icon: '🪙',
    points: '130,20 185,45 225,95 210,160 160,210 100,210 50,160 35,95 75,45',
    sidesEqual: true, anglesEqual: true,
    sideDetails: 'All 9 edges = 2.0 cm', angleDetails: 'All corner angles = 140°',
    pedagogy: 'Both rules pass! All sides and angles match, making it a true Regular Nonagon coin.'
  },
];

function Station3({ onNext }) {
  const [caseIdx, setCaseIdx] = useState(0);
  const [showRuler, setShowRuler] = useState(true);
  const [showProtractor, setShowProtractor] = useState(true);
  const [verdict, setVerdict] = useState(null);
  const [score, setScore] = useState(0);

  const currentCase = DETECTIVE_CASES[caseIdx];
  const isTrulyRegular = currentCase.sidesEqual && currentCase.anglesEqual;
  const isDone = caseIdx === DETECTIVE_CASES.length - 1 && verdict !== null;

  const handleVerdict = (userSaysRegular) => {
    if (verdict !== null) return;
    setVerdict(userSaysRegular);
    if (userSaysRegular === isTrulyRegular) {
      setScore(s => s + 1);
      playAudio('very_good');
    } else {
      playAudio('incorrect');
    }
  };

  const handleNextCase = () => {
    if (caseIdx < DETECTIVE_CASES.length - 1) {
      setCaseIdx(i => i + 1);
      setVerdict(null);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div className="station-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <span style={{ fontSize: '2rem' }}>🔍</span>
        <h2>Real-World Shape Detective</h2>
      </div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 12, fontSize: '0.95rem' }}>
        Case {caseIdx + 1} of {DETECTIVE_CASES.length} — Inspect the item with your digital ruler & protractor tools!
      </p>

      {/* Inspector Toolbox Controls */}
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 16 }}>
        <button onClick={() => setShowRuler(r => !r)}
          style={{
            padding: '6px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)',
            background: showRuler ? 'rgba(16,185,129,0.2)' : 'rgba(0,0,0,0.4)',
            color: showRuler ? '#10B981' : 'var(--text-muted)', fontWeight: 700, cursor: 'pointer'
          }}>
          📏 Digital Ruler: {showRuler ? 'ON' : 'OFF'}
        </button>
        <button onClick={() => setShowProtractor(p => !p)}
          style={{
            padding: '6px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)',
            background: showProtractor ? 'rgba(255,193,7,0.2)' : 'rgba(0,0,0,0.4)',
            color: showProtractor ? 'var(--gold)' : 'var(--text-muted)', fontWeight: 700, cursor: 'pointer'
          }}>
          📐 Digital Protractor: {showProtractor ? 'ON' : 'OFF'}
        </button>
      </div>

      {/* Object Display */}
      <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: 20, padding: 16, display: 'inline-block', border: '1px solid rgba(255,255,255,0.1)' }}>
        <svg viewBox="0 0 260 240" width={260} height={240}>
          <polygon points={currentCase.points} fill="rgba(124,58,237,0.2)" stroke="#A78BFA" strokeWidth={3.5} strokeLinejoin="round" />
        </svg>
      </div>

      <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--gold)', marginTop: 8 }}>
        {currentCase.icon} {currentCase.name}
      </div>

      {/* Detective Evidence Sheet */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', margin: '12px auto', maxWidth: 520, flexWrap: 'wrap' }}>
        {showRuler && (
          <div className="glass-card" style={{ padding: '10px 14px', textAlign: 'left', flex: 1, minWidth: 200, borderLeft: '4px solid #10B981' }}>
            <div style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 800 }}>📏 Side Measurement</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFF' }}>{currentCase.sideDetails}</div>
          </div>
        )}
        {showProtractor && (
          <div className="glass-card" style={{ padding: '10px 14px', textAlign: 'left', flex: 1, minWidth: 200, borderLeft: '4px solid var(--gold)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 800 }}>📐 Angle Measurement</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFF' }}>{currentCase.angleDetails}</div>
          </div>
        )}
      </div>

      {/* Verdict Action Buttons */}
      {verdict === null ? (
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', margin: '16px 0' }}>
          <button className="btn btn-green btn-lg" onClick={() => handleVerdict(true)}>
            ✅ True Regular Polygon
          </button>
          <button className="btn btn-outline btn-lg" onClick={() => handleVerdict(false)} style={{ border: '2px solid var(--red)', color: 'var(--red)' }}>
            ❌ Irregular Shape
          </button>
        </div>
      ) : (
        <div style={{
          margin: '14px auto', maxWidth: 520, padding: '14px 18px', borderRadius: 14,
          background: verdict === isTrulyRegular ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
          border: `1.5px solid ${verdict === isTrulyRegular ? '#10B981' : '#EF4444'}`,
          color: verdict === isTrulyRegular ? '#81c784' : '#f87171',
          textAlign: 'left', fontSize: '0.95rem', lineHeight: '1.5'
        }}>
          <strong>{verdict === isTrulyRegular ? '🎉 Correct Detective Verdict!' : '❌ Incorrect Verdict!'}</strong>
          <br />
          {currentCase.pedagogy}
        </div>
      )}

      {verdict !== null && caseIdx < DETECTIVE_CASES.length - 1 && (
        <button className="btn btn-primary" onClick={handleNextCase} style={{ marginBottom: 12 }}>
          Next Detective Case →
        </button>
      )}

      {isDone && (
        <div style={{ margin: '12px auto', padding: '12px 18px', borderRadius: 12, background: 'rgba(255,193,7,0.15)', border: '1px solid var(--gold)', color: 'var(--gold)', fontWeight: 800 }}>
          🏆 Detective Notebook Complete! Master Score: {score} / {DETECTIVE_CASES.length}
        </div>
      )}

      <div>
        <button className="btn btn-primary btn-lg" onClick={onNext} disabled={!isDone} style={{ opacity: isDone ? 1 : 0.4, marginTop: 12 }}>
          Next Station →
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   STATION 4 — MAYA'S PARK WALK SIMULATOR
   Walk Maya around pentagon flower beds & stop signs.
   Demonstrates visually that turning at each corner of ANY regular
   polygon completes a 360° full circle turn!
══════════════════════════════════════════════════════════════ */
const WALK_ROUTES = [
  { n: 5, label: 'Pentagon Flower Bed', icon: '🌺', color: '#EC4899' },
  { n: 8, label: 'Octagon Stop Sign Post', icon: '🛑', color: '#EF4444' },
  { n: 6, label: 'Honeycomb Path', icon: '🐝', color: '#F59E0B' },
  { n: 4, label: 'Square Plaza', icon: '🟦', color: '#3B82F6' },
];

function Station4({ onComplete }) {
  const [routeIdx, setRouteIdx] = useState(0);
  const [corner, setCorner] = useState(0);
  const [isAuto, setIsAuto] = useState(false);

  const route = WALK_ROUTES[routeIdx];
  const n = route.n;
  const extTurn = 360 / n;
  const accumTurn = corner * extTurn;
  const isComplete = corner >= n;

  const size = 280, cx = size / 2, cy = size / 2, r = size * 0.38;
  const pts = useMemo(() => polygonVertices(n, cx, cy, r), [n]);
  const pointsAttr = pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

  // Current Walker Position (at current corner vertex)
  const activeVertexIdx = corner % n;
  const walkerPos = pts[activeVertexIdx];

  const handleStep = useCallback(() => {
    if (corner < n) {
      setCorner(c => c + 1);
    }
  }, [corner, n]);

  const handleReset = () => {
    setCorner(0);
    setIsAuto(false);
  };

  useEffect(() => {
    let timer;
    if (isAuto && corner < n) {
      timer = setTimeout(() => {
        setCorner(c => c + 1);
      }, 900);
    } else if (corner >= n) {
      setIsAuto(false);
    }
    return () => clearTimeout(timer);
  }, [isAuto, corner, n]);

  return (
    <div style={{ textAlign: 'center' }}>
      <div className="station-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <span style={{ fontSize: '2rem' }}>🚶‍♀️</span>
        <h2>Maya's Park Walk & Turn Simulator</h2>
      </div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 14, fontSize: '0.95rem' }}>
        Teacher's Shortcut! Walk Maya around the park path. Watch her turn at each corner to complete a 360° circle turn.
      </p>

      {/* Route Selector Badges */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
        {WALK_ROUTES.map((rItem, idx) => (
          <button key={rItem.n} onClick={() => { setRouteIdx(idx); handleReset(); }}
            style={{
              padding: '6px 14px', borderRadius: 10,
              border: `2px solid ${routeIdx === idx ? rItem.color : 'rgba(255,255,255,0.15)'}`,
              background: routeIdx === idx ? `${rItem.color}25` : 'transparent',
              color: routeIdx === idx ? '#FFF' : 'var(--text-secondary)',
              fontWeight: 700, cursor: 'pointer'
            }}>
            {rItem.icon} {rItem.label} ({rItem.n} corners)
          </button>
        ))}
      </div>

      {/* Map & Turn Circular Compass */}
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
        {/* Polygon Map View */}
        <div style={{ position: 'relative', background: 'rgba(0,0,0,0.25)', padding: 12, borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)' }}>
          <svg viewBox={`0 0 ${size} ${size}`} width={260} height={260}>
            <polygon points={pointsAttr} fill={`${route.color}20`} stroke={route.color} strokeWidth={4} strokeLinejoin="round" />

            {/* Path Traveled Line */}
            {corner > 0 && (
              <polyline
                points={pts.slice(0, Math.min(corner + 1, n)).map(p => `${p.x},${p.y}`).join(' ')}
                fill="none" stroke="var(--gold)" strokeWidth={5} strokeLinecap="round" />
            )}

            {/* Vertex Corner Dots */}
            {pts.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={5} fill={i < corner ? 'var(--gold)' : route.color} />
            ))}

            {/* Maya Avatar */}
            <g transform={`translate(${walkerPos.x}, ${walkerPos.y})`}>
              <circle cx={0} cy={0} r={14} fill="#7C3AED" stroke="#FFF" strokeWidth={2} />
              <text x={0} y={4} textAnchor="middle" fontSize={14}>👩‍🌾</text>
            </g>
          </svg>
        </div>

        {/* Circular Turn Accumulated Compass */}
        <div className="glass-card" style={{ padding: 16, width: 220, textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>
            Accumulated Turn Gauge
          </div>

          <div style={{ position: 'relative', width: 120, height: 120, margin: '0 auto' }}>
            <svg viewBox="0 0 100 100" width={120} height={120}>
              <circle cx={50} cy={50} r={42} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={8} />
              <circle cx={50} cy={50} r={42} fill="none" stroke="var(--gold)" strokeWidth={8}
                strokeDasharray={`${(accumTurn / 360) * 264} 264`}
                strokeLinecap="round"
                transform="rotate(-90 50 50)" />
            </svg>
            <div style={{ position: 'absolute', top: '34%', left: 0, right: 0, fontSize: '1.2rem', fontWeight: 900, color: 'var(--gold)' }}>
              {Math.min(360, Math.round(accumTurn))}°
            </div>
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 8, fontWeight: 700 }}>
            Corner {Math.min(corner, n)} of {n}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#EC4899', fontWeight: 800 }}>
            Turn at each corner = {extTurn}°
          </div>
        </div>
      </div>

      {/* Step Controls */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', margin: '16px 0', flexWrap: 'wrap' }}>
        <button className="btn btn-primary" onClick={handleStep} disabled={isComplete || isAuto}>
          🚶 Step to Next Corner (+{extTurn}°)
        </button>
        <button className="btn btn-secondary" onClick={() => setIsAuto(true)} disabled={isComplete || isAuto}>
          ▶ Auto Walk Loop
        </button>
        <button className="btn btn-outline btn-sm" onClick={handleReset}>
          ↺ Reset Walk
        </button>
      </div>

      {isComplete && (
        <div style={{ margin: '0 auto 16px', maxWidth: 500, padding: '14px 18px', borderRadius: 14, background: 'rgba(16,185,129,0.15)', border: '1px solid #10B981', color: '#81c784', textAlign: 'left', fontSize: '0.9rem', lineHeight: '1.5' }}>
          🎉 <strong>360° Full Circle Proved!</strong>
          <br />
          Maya completed a full turn around the {route.label}!
          <br />
          <strong>Math Rule:</strong> {n} corners × {extTurn}° turn = <strong>360°</strong> (Always a full circle for ANY regular polygon!).
        </div>
      )}

      <button className="btn btn-green btn-lg" onClick={onComplete} style={{ marginTop: 12 }}>
        🏆 Complete All Simulations! →
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN SIMULATE PHASE COMPONENT
══════════════════════════════════════════════════════════════ */
export default function SimulatePhase({ onComplete }) {
  const [station, setStation] = useState(0);
  const nextStation = useCallback(() => { if (station < 3) setStation(s => s + 1); }, [station]);

  useEffect(() => {
    playAudio(`sim_${station}`);
    return () => stopNarration();
  }, [station]);

  return (
    <div className="simulate-phase">
      <div className="simulate-header">
        <h3 className="simulate-label">🧪 Simulate Labs</h3>
        <p className="simulate-sublabel">4 real-world interactive labs aligned with Maya & Arjun's story!</p>
      </div>

      {/* Station Progress Dots */}
      <div className="progress-dots">
        {STATIONS.map((s, i) => (
          <div key={i} className="simulate-dot-wrapper">
            <div className={`progress-dot ${i === station ? 'active' : i < station ? 'completed' : ''}`} />
            <span className="simulate-dot-label">{s.icon}</span>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginBottom: 12, color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>
        Station {station + 1} of {STATIONS.length}: <span style={{ color: 'var(--gold)' }}>{STATIONS[station].title}</span> — {STATIONS[station].subtitle}
      </div>

      <div className="glass-card" style={{ maxWidth: 880, width: '100%', animation: 'slideUp 0.4s ease', padding: 24 }}>
        {station === 0 && <Station1 onNext={nextStation} />}
        {station === 1 && <Station2 onNext={nextStation} />}
        {station === 2 && <Station3 onNext={nextStation} />}
        {station === 3 && <Station4 onComplete={onComplete} />}
      </div>
    </div>
  );
}
