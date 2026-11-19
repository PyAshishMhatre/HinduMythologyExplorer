import type { CharacterCategory } from '../../data/types';

export const CATEGORY_COLOR: Record<CharacterCategory, string> = {
  cosmic: '#b48cff',
  deity: '#e0b450',
  avatar: '#5aa2ff',
  deva: '#f0c36a',
  asura: '#d9644a',
  rakshasa: '#c2453a',
  sage: '#6fc2a8',
  manu: '#8fd1c6',
  king: '#e08a2e',
  queen: '#e59ab0',
  hero: '#f2a65a',
  vanara: '#d4a35a',
  naga: '#5fb38d',
  celestial: '#9fb6ff',
  other: '#b9b1a0',
};

export const CATEGORY_LABEL: Record<CharacterCategory, string> = {
  cosmic: 'Supreme / Cosmic', deity: 'Deity', avatar: 'Avatar', deva: 'Deva', asura: 'Asura', rakshasa: 'Rakshasa', sage: 'Sage', manu: 'Manu',
  king: 'King', queen: 'Queen', hero: 'Hero', vanara: 'Vanara', naga: 'Naga', celestial: 'Celestial', other: 'Other',
};

function initials(name: string) {
  const parts = name.replace(/\(.*?\)/g, '').trim().split(/\s+/);
  return (parts.length > 1 && parts[0].length > 3 ? parts[0][0] + parts[1][0] : parts[0].slice(0, 2)).toUpperCase();
}

/** Generated emblem portrait: a monogram within a temple-arch mandala, coloured by category. */
export function Emblem({ name, category, size = 56, className = '' }: { name: string; category: CharacterCategory; size?: number; className?: string }) {
  const c = CATEGORY_COLOR[category];
  const petals = Array.from({ length: 12 }, (_, i) => i * 30);
  const id = `g-${name.replace(/\W/g, '')}-${size}`;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={`shrink-0 ${className}`} role="img" aria-label={name}>
      <defs>
        <radialGradient id={id} cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor={c} stopOpacity="0.45" />
          <stop offset="100%" stopColor="rgb(var(--c-ink))" stopOpacity="1" />
        </radialGradient>
      </defs>
      <path d="M50 4 C70 4 92 20 92 46 L92 96 L8 96 L8 46 C8 20 30 4 50 4Z" fill={`url(#${id})`} stroke={c} strokeOpacity="0.7" strokeWidth="1.5" />
      <g transform="translate(50 50)" opacity="0.5">
        {petals.map((a) => (
          <ellipse key={a} rx="5" ry="16" transform={`rotate(${a}) translate(0 -22)`} fill="none" stroke={c} strokeWidth="0.8" />
        ))}
        <circle r="24" fill="none" stroke={c} strokeWidth="0.6" />
      </g>
      <text x="50" y="58" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontWeight="600" fontSize="28" fill="rgb(var(--c-parchment))">
        {initials(name)}
      </text>
    </svg>
  );
}
