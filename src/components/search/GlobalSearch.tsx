import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { suggest, KIND_LABEL } from '../../lib/search';
import { answerQuestion } from '../../lib/questionParser';
import { Icon } from '../ui/Icon';

export default function GlobalSearch() {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const nav = useNavigate();
  const ref = useRef<HTMLInputElement>(null);
  const hits = useMemo(() => (q.trim().length > 1 ? suggest(q, 8) : []), [q]);
  const direct = useMemo(() => (q.trim().length > 6 ? answerQuestion(q) : null), [q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA')) {
        e.preventDefault();
        ref.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (to: string) => {
    setOpen(false);
    setQ('');
    ref.current?.blur();
    nav(to);
  };

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative">
        <Icon name="search" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/70" />
        <input
          ref={ref}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
            setActive(0);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') setActive((a) => Math.min(a + 1, hits.length - 1));
            if (e.key === 'ArrowUp') setActive((a) => Math.max(a - 1, 0));
            if (e.key === 'Enter') {
              if (hits[active] && !direct) go(hits[active].to);
              else go(`/search?q=${encodeURIComponent(q)}`);
            }
            if (e.key === 'Escape') ref.current?.blur();
          }}
          placeholder='Search or ask — "Who was Ravana&apos;s father?"'
          className="input !rounded-full !py-2 pl-10 pr-14"
          aria-label="Search the mythology"
        />
        <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-gold/20 px-1.5 text-[10px] text-muted sm:block">Ctrl K</kbd>
      </div>
      {open && (hits.length > 0 || direct) && (
        <div className="card absolute left-0 right-0 top-12 z-50 overflow-hidden !bg-ink/95 shadow-2xl">
          {direct && (
            <button onMouseDown={() => go(`/search?q=${encodeURIComponent(q)}`)} className="block w-full border-b border-gold/10 bg-gold/5 px-4 py-3 text-left">
              <div className="eyebrow mb-1">Direct answer</div>
              <div className="line-clamp-3 text-sm text-parchment/90">{direct.answer}</div>
            </button>
          )}
          {hits.map((h, i) => (
            <button
              key={h.id}
              onMouseDown={() => go(h.to)}
              onMouseEnter={() => setActive(i)}
              className={`flex w-full items-start gap-3 px-4 py-2.5 text-left ${i === active ? 'bg-gold/10' : ''}`}
            >
              <span className="mt-0.5 w-16 shrink-0 text-[10px] uppercase tracking-wider text-gold/70">{KIND_LABEL[h.kind]}</span>
              <span className="min-w-0">
                <span className="block truncate text-sm text-parchment">{h.title}</span>
                <span className="block truncate text-xs text-muted">{h.subtitle}</span>
              </span>
            </button>
          ))}
          <button onMouseDown={() => go(`/search?q=${encodeURIComponent(q)}`)} className="w-full border-t border-gold/10 px-4 py-2 text-left text-xs text-gold hover:bg-gold/5">
            See all results for “{q}” →
          </button>
        </div>
      )}
    </div>
  );
}
