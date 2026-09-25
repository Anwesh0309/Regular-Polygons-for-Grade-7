import { polygonVertices, polygonPointsAttr } from '../utils/polygonMath';

/**
 * PolygonArt — a crisp, theme-matched SVG illustration of a regular polygon.
 * Used in place of raster/AI-generated art for the Story panels and Wonder
 * screen, so every "picture" in the module is a mathematically exact drawing
 * of the very shape being discussed.
 */
export default function PolygonArt({
  n = 6,
  size = 320,
  color = 'var(--gold)',
  glow = 'rgba(255,193,7,0.35)',
  showVertices = true,
  showCenter = false,
  spin = false,
  label,
  sublabel,
}) {
  const cx = size / 2, cy = size / 2, r = size * 0.34;
  const pts = polygonVertices(n, cx, cy, r);
  const pointsAttr = polygonPointsAttr(n, cx, cy, r);

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width="100%"
      height="100%"
      style={{ maxHeight: 320, display: 'block' }}
    >
      <defs>
        <radialGradient id={`glow-${n}`} cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={glow} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id={`fill-${n}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0.08" />
        </linearGradient>
      </defs>

      <circle cx={cx} cy={cy} r={size * 0.46} fill={`url(#glow-${n})`} />

      <g style={spin ? { transformOrigin: `${cx}px ${cy}px`, animation: 'spin 22s linear infinite' } : undefined}>
        <polygon
          points={pointsAttr}
          fill={`url(#fill-${n})`}
          stroke={color}
          strokeWidth={3}
          strokeLinejoin="round"
        />
        {showVertices && pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={5} fill={color} />
        ))}
      </g>

      {showCenter && <circle cx={cx} cy={cy} r={3} fill="rgba(255,255,255,0.6)" />}

      {label && (
        <text x={cx} y={size - 22} textAnchor="middle" fontSize={size * 0.06} fontWeight="800" fill={color}>
          {label}
        </text>
      )}
      {sublabel && (
        <text x={cx} y={size - 4} textAnchor="middle" fontSize={size * 0.032} fill="rgba(255,255,255,0.55)">
          {sublabel}
        </text>
      )}
    </svg>
  );
}
