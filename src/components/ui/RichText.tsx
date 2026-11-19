import { Fragment, useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { characterById, dynastyById, eventById, familyTreeById, glossaryById, locationById, sourceById, storyById } from '../../data';
import { Emblem } from './Emblem';

const LINK_RE = /\[\[(\w+):([\w-]+)(?:\|([^\]]+))?\]\]/g;

interface RefInfo {
  label: string;
  title: string;
  body: string;
  to: string;
  kind: string;
  character?: string;
}

function info(kind: string, id: string, label?: string): RefInfo | null {
  switch (kind) {
    case 'char': {
      const c = characterById.get(id);
      return c ? { label: label ?? c.name, title: c.name, body: `${c.title}. ${c.description}`, to: `/characters/${id}`, kind: 'Character', character: id } : null;
    }
    case 'event': {
      const e = eventById.get(id);
      return e ? { label: label ?? e.title, title: e.title, body: e.summary, to: `/events/${id}`, kind: 'Event' } : null;
    }
    case 'story': {
      const s = storyById.get(id);
      return s ? { label: label ?? s.title, title: s.title, body: s.introduction, to: `/stories/${id}`, kind: 'Story' } : null;
    }
    case 'term': {
      const g = glossaryById.get(id);
      return g ? { label: label ?? g.term, title: `${g.term}${g.sanskrit ? ` · ${g.sanskrit}` : ''}`, body: g.short, to: `/glossary/${id}`, kind: 'Concept' } : null;
    }
    case 'place': {
      const l = locationById.get(id);
      return l ? { label: label ?? l.name, title: l.name, body: l.significance, to: `/map/${id}`, kind: 'Place' } : null;
    }
    case 'dynasty': {
      const d = dynastyById.get(id);
      return d ? { label: label ?? d.name, title: d.name, body: d.description, to: `/dynasties/${id}`, kind: 'Dynasty' } : null;
    }
    case 'source': {
      const s = sourceById.get(id);
      return s ? { label: label ?? s.textName, title: s.textName, body: s.description, to: `/sources#${id}`, kind: `${s.category} source` } : null;
    }
    case 'tree': {
      const t = familyTreeById.get(id);
      return t ? { label: label ?? t.title, title: t.title, body: t.description, to: `/family-tree/${id}`, kind: 'Family tree' } : null;
    }
  }
  return null;
}

function InlineRef({ data: r }: { data: RefInfo }) {
  const [open, setOpen] = useState(false);
  const [below, setBelow] = useState(true);
  const el = useRef<HTMLSpanElement>(null);
  const hoverTimer = useRef<number>();

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (el.current && !el.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  const show = () => {
    if (el.current) setBelow(el.current.getBoundingClientRect().top < window.innerHeight * 0.6);
    setOpen(true);
  };

  return (
    <span
      ref={el}
      className="relative inline"
      onMouseEnter={() => {
        hoverTimer.current = window.setTimeout(show, 350);
      }}
      onMouseLeave={() => {
        window.clearTimeout(hoverTimer.current);
        hoverTimer.current = window.setTimeout(() => setOpen(false), 250);
      }}
    >
      <button type="button" className="link-inline" onClick={() => (open ? setOpen(false) : show())}>
        {r.label}
      </button>
      {open && (
        <span
          className={`card absolute left-1/2 z-40 block w-72 -translate-x-1/2 !bg-ink/95 p-4 text-left not-italic shadow-2xl ${below ? 'top-7' : 'bottom-7'}`}
          onMouseEnter={() => window.clearTimeout(hoverTimer.current)}
        >
          <span className="flex items-start gap-3">
            {r.character && <Emblem name={r.title} category={characterById.get(r.character)!.category} size={44} />}
            <span className="min-w-0">
              <span className="eyebrow block !text-[10px]">{r.kind}</span>
              <span className="block font-serif text-lg leading-tight text-parchment">{r.title}</span>
            </span>
          </span>
          <span className="mt-2 block text-[13px] leading-relaxed text-parchment/80 line-clamp-5">{r.body}</span>
          <Link to={r.to} className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-gold hover:text-saffron">
            Open {r.kind.toLowerCase()} →
          </Link>
        </span>
      )}
    </span>
  );
}

/** Render text containing [[kind:id|label]] markup as interactive inline references. */
export function RichText({ text, className }: { text: string; className?: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(LINK_RE)) {
    const [whole, kind, id, label] = m;
    const idx = m.index ?? 0;
    if (idx > last) parts.push(<Fragment key={i++}>{text.slice(last, idx)}</Fragment>);
    const r = info(kind, id, label);
    parts.push(r ? <InlineRef key={i++} data={r} /> : <Fragment key={i++}>{label ?? id}</Fragment>);
    last = idx + whole.length;
  }
  if (last < text.length) parts.push(<Fragment key={i++}>{text.slice(last)}</Fragment>);
  return <span className={className}>{parts}</span>;
}

/** Paragraph list; paragraphs beginning with "> " become asides. */
export function Prose({ paragraphs, className = '' }: { paragraphs: string[]; className?: string }) {
  return (
    <div className={`prose-myth ${className}`}>
      {paragraphs.map((p, i) =>
        p.startsWith('> ') ? (
          <blockquote key={i}>
            <RichText text={p.slice(2)} />
          </blockquote>
        ) : (
          <p key={i}>
            <RichText text={p} />
          </p>
        ),
      )}
    </div>
  );
}

export const stripMarkup = (s: string) => s.replace(LINK_RE, (_m, _k, id, l) => l ?? id);
