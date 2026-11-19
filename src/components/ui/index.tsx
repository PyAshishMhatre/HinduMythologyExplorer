import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { characterById, sourceById } from '../../data';
import type { Confidence, SourceRef, Variation } from '../../data/types';
import { Emblem } from './Emblem';
import { Icon } from './Icon';
import { useProgress, type ContentType } from '../../store/progress';

export function PageHeader({ eyebrow, title, subtitle, actions, children }: { eyebrow?: string; title: ReactNode; subtitle?: ReactNode; actions?: ReactNode; children?: ReactNode }) {
  return (
    <header className="mb-8">
      {eyebrow && <div className="eyebrow mb-2">{eyebrow}</div>}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 className="font-serif text-4xl font-semibold leading-tight text-parchment md:text-5xl">{title}</h1>
          {subtitle && <p className="mt-2 max-w-3xl text-base text-parchment/70">{subtitle}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
      {children}
      <div className="divider mt-6" />
    </header>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1 text-xs text-muted">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <Icon name="chevronRight" className="h-3 w-3 opacity-60" />}
          {it.to ? (
            <Link to={it.to} className="hover:text-gold">
              {it.label}
            </Link>
          ) : (
            <span className="text-parchment/80">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function Section({ id, title, eyebrow, children, className = '' }: { id?: string; title: ReactNode; eyebrow?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`mb-10 scroll-mt-24 ${className}`}>
      {eyebrow && <div className="eyebrow mb-1">{eyebrow}</div>}
      <h2 className="mb-4 font-serif text-2xl font-semibold text-parchment">{title}</h2>
      {children}
    </section>
  );
}

export function CharacterChip({ id, note }: { id: string; note?: string }) {
  const c = characterById.get(id);
  if (!c) return null;
  return (
    <Link to={`/characters/${id}`} className="card card-hover flex items-center gap-3 p-2.5 pr-4">
      <Emblem name={c.name} category={c.category} size={40} />
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium text-parchment">{c.name}</span>
        <span className="block truncate text-[11px] text-muted">{note ?? c.title}</span>
      </span>
    </Link>
  );
}

export const CONFIDENCE: Record<Confidence, { label: string; cls: string; desc: string }> = {
  attested: { label: 'Attested', cls: 'border-jade/50 text-jade', desc: 'Directly attested in the cited text' },
  tradition: { label: 'Tradition', cls: 'border-lapis/50 text-lapis', desc: 'Present in a particular textual tradition' },
  'later-interpretation': { label: 'Later interpretation', cls: 'border-saffron/50 text-saffron', desc: 'Common later interpretation' },
  'regional-folk': { label: 'Regional / folk', cls: 'border-bronze/60 text-bronze', desc: 'Regional or folk tradition' },
  'modern-historical': { label: 'Modern scholarship', cls: 'border-muted/50 text-muted', desc: 'Modern historical interpretation' },
  disputed: { label: 'Uncertain / disputed', cls: 'border-vermilion/50 text-vermilion', desc: 'Uncertain or disputed' },
};

export function ConfidenceBadge({ c }: { c: Confidence }) {
  const m = CONFIDENCE[c];
  return (
    <span title={m.desc} className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider ${m.cls}`}>
      {m.label}
    </span>
  );
}

export function SourceList({ refs, title = 'Sources' }: { refs: SourceRef[]; title?: string }) {
  if (!refs.length) return null;
  return (
    <div className="card p-5">
      <div className="mb-3 flex items-center gap-2">
        <Icon name="source" className="h-4 w-4 text-gold" />
        <span className="eyebrow">{title}</span>
      </div>
      <ul className="space-y-2.5">
        {refs.map((r, i) => {
          const s = sourceById.get(r.sourceId);
          return (
            <li key={i} className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm">
              <Link to={`/sources#${r.sourceId}`} className="font-medium text-parchment hover:text-gold">
                {s?.textName ?? r.sourceId}
              </Link>
              {r.section && <span className="text-parchment/70">· {r.section}</span>}
              {r.chapter && <span className="text-parchment/70">· ch. {r.chapter}</span>}
              {r.verse && <span className="text-parchment/70">· v. {r.verse}</span>}
              <span className="text-[11px] text-muted">({s?.category})</span>
              <ConfidenceBadge c={r.confidence} />
              {r.note && <span className="w-full text-xs italic text-muted">{r.note}</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function VariationBox({ v }: { v: Variation }) {
  return (
    <div className="card overflow-hidden">
      <div className="border-b border-gold/10 bg-gold/5 px-5 py-3">
        <div className="eyebrow !text-[10px]">Different Traditions and Versions</div>
        <div className="font-serif text-xl text-parchment">{v.title}</div>
      </div>
      <div className="grid gap-px bg-gold/10 md:grid-cols-2">
        <div className="bg-panel p-5">
          <div className="mb-1 text-xs font-medium text-jade">{v.primary.tradition}</div>
          <p className="text-sm leading-relaxed text-parchment/85">{v.primary.account}</p>
        </div>
        <div className="bg-panel p-5">
          <div className="mb-1 text-xs font-medium text-saffron">{v.alternate.tradition}</div>
          <p className="text-sm leading-relaxed text-parchment/85">{v.alternate.account}</p>
        </div>
      </div>
      <dl className="space-y-2 px-5 py-4 text-sm">
        <div>
          <dt className="inline font-medium text-gold">The difference: </dt>
          <dd className="inline text-parchment/80">{v.difference}</dd>
        </div>
        {v.shared && (
          <div>
            <dt className="inline font-medium text-gold">Shared elements: </dt>
            <dd className="inline text-parchment/80">{v.shared}</dd>
          </div>
        )}
        {v.whyItMatters && (
          <div>
            <dt className="inline font-medium text-gold">Why it matters: </dt>
            <dd className="inline text-parchment/80">{v.whyItMatters}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}

export function BookmarkButton({ type, id }: { type: ContentType; id: string }) {
  const on = useProgress((s) => s.bookmarks.some((b) => b.type === type && b.id === id));
  const toggle = useProgress((s) => s.toggleBookmark);
  return (
    <button onClick={() => toggle(type, id)} className={`btn-ghost ${on ? '!border-saffron/60 !text-saffron' : ''}`} aria-pressed={on}>
      <Icon name="bookmark" filled={on} className="h-4 w-4" />
      {on ? 'Bookmarked' : 'Bookmark'}
    </button>
  );
}

export function Tabs<T extends string>({ tabs, value, onChange }: { tabs: { id: T; label: string }[]; value: T; onChange: (t: T) => void }) {
  return (
    <div className="mb-6 flex flex-wrap gap-1 rounded-full border border-gold/15 bg-ink/40 p-1" role="tablist">
      {tabs.map((t) => (
        <button
          key={t.id}
          role="tab"
          aria-selected={value === t.id}
          onClick={() => onChange(t.id)}
          className={`rounded-full px-4 py-1.5 text-sm transition ${value === t.id ? 'bg-gold/20 text-parchment' : 'text-parchment/60 hover:text-parchment'}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <div className="card p-8 text-center text-sm text-muted">{children}</div>;
}

export function ProgressBar({ value, className = '' }: { value: number; className?: string }) {
  return (
    <div className={`h-1.5 w-full overflow-hidden rounded-full bg-gold/10 ${className}`}>
      <div className="h-full rounded-full bg-gradient-to-r from-gold to-saffron transition-all" style={{ width: `${Math.round(Math.max(0, Math.min(1, value)) * 100)}%` }} />
    </div>
  );
}
