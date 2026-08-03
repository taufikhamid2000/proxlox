/* Vice-city vector art — no photography/renders available, so the hero's
   background depth is built from a few flat SVG silhouettes instead. */

export function SunHorizon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="sunGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe066" />
          <stop offset="35%" stopColor="#ff8a3d" />
          <stop offset="70%" stopColor="#ff3ea5" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <clipPath id="sunStripes">
          <rect y="0" width="400" height="18" />
          <rect y="36" width="400" height="18" />
          <rect y="72" width="400" height="22" />
          <rect y="112" width="400" height="26" />
          <rect y="156" width="400" height="244" />
        </clipPath>
      </defs>
      <circle cx="200" cy="200" r="180" fill="url(#sunGradient)" clipPath="url(#sunStripes)" opacity="0.85" />
    </svg>
  );
}

export function Skyline({ className = '' }: { className?: string }) {
  const buildings = [
    { x: 0, w: 34, h: 90 },
    { x: 36, w: 22, h: 140 },
    { x: 60, w: 30, h: 70 },
    { x: 92, w: 26, h: 170 },
    { x: 120, w: 18, h: 100 },
    { x: 140, w: 34, h: 200 },
    { x: 176, w: 24, h: 120 },
    { x: 202, w: 30, h: 160 },
    { x: 234, w: 20, h: 90 },
    { x: 256, w: 34, h: 150 },
    { x: 292, w: 22, h: 190 },
    { x: 316, w: 28, h: 110 },
    { x: 346, w: 24, h: 150 },
    { x: 372, w: 28, h: 80 },
  ];
  return (
    <svg
      viewBox="0 0 400 220"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {buildings.map((b, i) => (
        <rect key={i} x={b.x} y={220 - b.h} width={b.w} height={b.h} fill="currentColor" />
      ))}
    </svg>
  );
}

export function Palms({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 260"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="currentColor">
        <rect x="56" y="120" width="10" height="140" rx="3" transform="rotate(4 61 190)" />
        <path d="M61 128 C 20 108, 0 80, 4 60 C 30 74, 50 100, 61 128 Z" />
        <path d="M61 128 C 30 92, 26 56, 44 30 C 58 58, 62 96, 61 128 Z" />
        <path d="M61 128 C 62 88, 82 56, 112 44 C 104 76, 86 106, 61 128 Z" />
        <path d="M61 128 C 92 116, 128 118, 152 138 C 122 148, 90 144, 61 128 Z" />
        <path d="M61 128 C 40 110, 12 104, -12 116 C 8 132, 36 136, 61 128 Z" />

        <rect x="210" y="150" width="8" height="110" rx="3" transform="rotate(-3 214 205)" />
        <path d="M214 156 C 182 140, 166 116, 170 98 C 192 110, 208 132, 214 156 Z" />
        <path d="M214 156 C 190 128, 188 100, 202 80 C 214 102, 218 130, 214 156 Z" />
        <path d="M214 156 C 216 124, 234 100, 258 92 C 250 118, 236 142, 214 156 Z" />
        <path d="M214 156 C 238 148, 264 150, 282 166 C 258 174, 234 170, 214 156 Z" />
      </g>
    </svg>
  );
}
