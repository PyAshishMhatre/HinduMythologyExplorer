const PATHS: Record<string, string> = {
  home: 'M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
  universe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 0c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9m0-18C9.5 5.5 8.5 8.5 8.5 12s1 6.5 3.5 9M3.5 9h17M3.5 15h17',
  timeline: 'M3 12h18M7 12V7m5 5v6m5-6V5M7 7a1 1 0 1 0 0-.01M12 18a1 1 0 1 0 0-.01M17 5a1 1 0 1 0 0-.01',
  tree: 'M12 3v4m0 0a2 2 0 1 0 0 .01M12 7v4M6 15v-2h12v2M6 15a2 2 0 1 0 0 .01M18 15a2 2 0 1 0 0 .01M12 11v4m0 0a2 2 0 1 0 0 .01',
  characters: 'M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M9 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm13 9v-1a4 4 0 0 0-3-3.87M16 4.13a3 3 0 0 1 0 5.75',
  story: 'M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2zm0 0v16M8 7h6M8 11h6',
  event: 'M8 3v3m8-3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm4 8l2 2 4-4',
  gods: 'M12 2l2.4 5.6L20 8.3l-4.4 3.9L17 18l-5-3-5 3 1.4-5.8L4 8.3l5.6-.7z',
  dynasty: 'M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6',
  quiz: 'M9.1 9a3 3 0 1 1 4.4 2.6c-.9.5-1.5 1.3-1.5 2.4M12 17.5v.01M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z',
  progress: 'M4 20V10m6 10V4m6 16v-7m6 7H2',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.4-3a7.4 7.4 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2-1.2L14.5 3h-5l-.4 2.6a7 7 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6a7.4 7.4 0 0 0 0 2.4l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 2 1.2l.4 2.6h5l.4-2.6a7 7 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2z',
  map: 'M9 4L3 6v14l6-2 6 2 6-2V4l-6 2zm0 0v14m6-12v14',
  graph: 'M6 6a2 2 0 1 0 0 .01M18 6a2 2 0 1 0 0 .01M12 18a2 2 0 1 0 0 .01M6 18a2 2 0 1 0 0 .01M7.5 7.5l3.5 9M16.5 7.5l-3.5 9M8 6h8M8 18h2',
  glossary: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5zm0 0A2.5 2.5 0 0 0 6.5 22H20v-5',
  learn: 'M2 9l10-5 10 5-10 5zm4 2v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5M22 9v6',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm10 17l-5-5',
  bookmark: 'M6 3h12v18l-6-4-6 4z',
  bookmarkFill: 'M6 3h12v18l-6-4-6 4z',
  chevronLeft: 'M15 18l-6-6 6-6',
  chevronRight: 'M9 18l6-6-6-6',
  chevronDown: 'M6 9l6 6 6-6',
  close: 'M6 6l12 12M18 6L6 18',
  menu: 'M4 6h16M4 12h16M4 18h16',
  panel: 'M3 4h18v16H3zM15 4v16',
  compare: 'M8 3v18M16 3v18M3 8h5M16 16h5M3 16h5M16 8h5',
  sparkle: 'M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.5 2.5m7 7L18 18M6 18l2.5-2.5m7-7L18 6',
  book: 'M12 6c-2-1.5-5-2-8-2v14c3 0 6 .5 8 2 2-1.5 5-2 8-2V4c-3 0-6 .5-8 2zm0 0v14',
  arrowRight: 'M5 12h14m-6-6l6 6-6 6',
  zoomIn: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm10 17l-5-5M11 8v6M8 11h6',
  zoomOut: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm10 17l-5-5M8 11h6',
  link: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1',
  check: 'M5 12l5 5L20 7',
  source: 'M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6',
};

export function Icon({ name, className = 'h-5 w-5', filled = false }: { name: keyof typeof PATHS | string; className?: string; filled?: boolean }) {
  const d = PATHS[name] ?? PATHS.sparkle;
  return (
    <svg viewBox="0 0 24 24" className={className} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}
