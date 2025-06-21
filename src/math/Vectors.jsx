export function vec2(x = 0, y = 0) {
  return { x, y };
}

export function vec2Add(a, b) {
  return { x: a.x + b.x, y: a.y + b.y };
}

export function vec2Sub(a, b) {
  return { x: a.x - b.x, y: a.y - b.y };
}

export function vec2Scale(v, s) {
  return { x: v.x * s, y: v.y * s };
}

export function vec2Length(v) {
  return Math.hypot(v.x, v.y);
}

export function vec2Normalize(v) {
  const len = vec2Length(v);
  return len === 0 ? { x: 0, y: 0 } : vec2Scale(v, 1 / len);
}

export function vec2MoveTowards(v, target, maxDistance) {
  const dx = target.x - v.x;
  const dy = target.y - v.y;
  const sqDist = dx * dx + dy * dy;

  if (sqDist === 0 || (maxDistance >= 0 && sqDist <= maxDistance * maxDistance))
    return { ...target };

  const dist = Math.sqrt(sqDist);
  const step = maxDistance / dist;
  return { x: v.x + dx * step, y: v.y + dy * step };
}

export function vec2AngleDeg(v) {
  return (Math.atan2(v.y, v.x) * 180) / Math.PI;
}
