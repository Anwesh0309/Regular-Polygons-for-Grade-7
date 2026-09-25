// polygonMath.js — single source of truth for every angle/side calculation
// used across the story illustrations, the Simulate stations and the
// Practice question bank, so numbers can never drift out of sync.

export const NAMES = {
  3: 'triangle', 4: 'quadrilateral', 5: 'pentagon', 6: 'hexagon',
  7: 'heptagon', 8: 'octagon', 9: 'nonagon', 10: 'decagon',
  11: 'hendecagon', 12: 'dodecagon',
};

export function polygonName(n) {
  return NAMES[n] || `${n}-gon`;
}

// Sum of interior angles of ANY polygon (regular or not) with n sides.
export function interiorSum(n) {
  return (n - 2) * 180;
}

// Each interior angle of a REGULAR polygon with n sides.
export function interiorAngle(n) {
  return interiorSum(n) / n;
}

// Each exterior angle of a REGULAR polygon with n sides (sum is always 360).
export function exteriorAngle(n) {
  return 360 / n;
}

// Number of diagonals in a polygon with n sides.
export function diagonalCount(n) {
  return (n * (n - 3)) / 2;
}

// Number of triangles formed by triangulating from one vertex.
export function triangleCount(n) {
  return n - 2;
}

// Vertices of a regular n-gon centered at (cx, cy) with circumradius r,
// rotated so it sits nicely "point up" by default. Returns an array of
// {x, y} points and a ready-to-use SVG "points" string.
export function polygonVertices(n, cx, cy, r, rotationDeg = -90) {
  const pts = [];
  const rot = (rotationDeg * Math.PI) / 180;
  for (let i = 0; i < n; i++) {
    const theta = rot + (i * 2 * Math.PI) / n;
    pts.push({ x: cx + r * Math.cos(theta), y: cy + r * Math.sin(theta) });
  }
  return pts;
}

export function polygonPointsAttr(n, cx, cy, r, rotationDeg = -90) {
  return polygonVertices(n, cx, cy, r, rotationDeg)
    .map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`)
    .join(' ');
}
