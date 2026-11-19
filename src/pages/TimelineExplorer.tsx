import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { characterById, characters, dynasties, eraById, eras, events, eventById, stories, timelines } from '../data';
import type { EraId, MythEvent } from '../data/types';
import EventDetail from '../components/timeline/EventDetail';
import { Icon } from '../components/ui/Icon';
import { useProgress } from '../store/progress';

type View = 'horizontal' | 'parallel' | 'vertical' | 'eras' | 'list';
const VIEWS: { id: View; label: string }[] = [
  { id: 'horizontal', label: 'Horizontal' },
  { id: 'parallel', label: 'Parallel lanes' },
  { id: 'vertical', label: 'Vertical' },
  { id: 'eras', label: 'By era' },
  { id: 'list', label: 'Compact list' },
];
const CATS = [...new Set(events.map((e) => e.category))];

function Filters({ params, set }: { params: URLSearchParams; set: (k: string, v: string | null) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <select className="input !w-auto !py-1.5 !text-xs" value={params.get('era') ?? ''} onChange={(e) => set('era', e.target.value || null)}>
        <option value="">All eras</option>
        {eras.map((e) => (
          <option key={e.id} value={e.id}>
            {e.name}
          </option>
        ))}
      </select>
      <select className="input !w-auto !py-1.5 !text-xs" value={params.get('epic') ?? ''} onChange={(e) => set('epic', e.target.value || null)}>
        <option value="">All sources</option>
        <option value="vedas">Vedas</option>
        <option value="ramayana">Ramayana</option>
        <option value="mahabharata">Mahabharata</option>
        <option value="puranas">Puranas</option>
      </select>
      <select className="input !w-auto !py-1.5 !text-xs" value={params.get('character') ?? ''} onChange={(e) => set('character', e.target.value || null)}>
        <option value="">Any character</option>
        {characters
          .filter((c) => events.some((e) => e.characters.includes(c.id)))
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
      </select>
      <select className="input !w-auto !py-1.5 !text-xs" value={params.get('dynasty') ?? ''} onChange={(e) => set('dynasty', e.target.value || null)}>
        <option value="">Any dynasty</option>
        {dynasties.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>
      <select className="input !w-auto !py-1.5 !text-xs" value={params.get('group') ?? ''} onChange={(e) => set('group', e.target.value || null)}>
        <option value="">Devas, asuras & sages</option>
        <option value="deva">Involving devas</option>
        <option value="asura">Involving asuras / rakshasas</option>
        <option value="sage">Involving sages</option>
      </select>
      <select className="input !w-auto !py-1.5 !text-xs" value={params.get('cat') ?? ''} onChange={(e) => set('cat', e.target.value || null)}>
        <option value="">All categories</option>
        {CATS.map((c) => (
          <option key={c} value={c} className="capitalize">
            {c.replace('-', ' ')}
          </option>
        ))}
      </select>
      <select className="input !w-auto !py-1.5 !text-xs" value={params.get('story') ?? ''} onChange={(e) => set('story', e.target.value || null)}>
        <option value="">Any story</option>
        {stories.map((s) => (
          <option key={s.id} value={s.id}>
            {s.title}
          </option>
        ))}
      </select>
    </div>
  );
}

function EventCard({ e, onOpen, active, side }: { e: MythEvent; onOpen: (id: string) => void; active: boolean; side?: 'top' | 'bottom' }) {
  const era = eraById.get(e.era)!;
  return (
    <button
      onClick={() => onOpen(e.id)}
      className={`card group w-56 p-3 text-left transition hover:border-gold/60 ${active ? '!border-saffron shadow-glow' : ''}`}
      style={{ borderTopColor: side !== 'bottom' ? era.color : undefined, borderBottomColor: side === 'bottom' ? era.color : undefined, borderTopWidth: side !== 'bottom' ? 2 : 1, borderBottomWidth: side === 'bottom' ? 2 : 1 }}
    >
      <div className="text-[10px] uppercase tracking-wider" style={{ color: era.color }}>
        {era.name}
        {e.parallelWith?.length ? ' · ⇄ parallel' : ''}
      </div>
      <div className="mt-0.5 font-serif text-[17px] leading-tight group-hover:text-gold">{e.title}</div>
      <div className="mt-1 line-clamp-2 text-[11px] leading-snug text-muted">{e.summary}</div>
    </button>
  );
}

export default function TimelineExplorer() {
  const { timelineId = 'master' } = useParams();
  const [params, setParams] = useSearchParams();
  const nav = useNavigate();
  const visit = useProgress((s) => s.visit);
  const timeline = timelines.find((t) => t.id === timelineId) ?? timelines[0];
  const view = (params.get('view') as View) ?? 'horizontal';
  const [zoom, setZoom] = useState(1);
  const [open, setOpen] = useState<string | null>(params.get('focus'));
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => visit('timeline', timeline.id), [timeline.id, visit]);

  const set = (k: string, v: string | null) => {
    const n = new URLSearchParams(params);
    v ? n.set(k, v) : n.delete(k);
    setParams(n, { replace: true });
  };

  const filtered = useMemo(() => {
    const era = params.get('era');
    const epic = params.get('epic');
    const ch = params.get('character');
    const dyn = params.get('dynasty');
    const cat = params.get('cat');
    const story = params.get('story');
    const group = params.get('group');
    const groupCats: Record<string, string[]> = { deva: ['deva', 'deity'], asura: ['asura', 'rakshasa'], sage: ['sage'] };
    return events
      .filter((e) => timeline.eras.includes(e.era))
      .filter((e) => !era || e.era === era)
      .filter((e) => !epic || e.epic === epic)
      .filter((e) => !ch || e.characters.includes(ch))
      .filter((e) => !dyn || e.dynasty === dyn || e.characters.some((c) => characterById.get(c)?.dynasty === dyn))
      .filter((e) => !cat || e.category === cat)
      .filter((e) => !story || e.stories?.includes(story) || stories.find((s) => s.id === story)?.events?.includes(e.id))
      .filter((e) => !group || e.characters.some((c) => groupCats[group]?.includes(characterById.get(c)?.category ?? '')))
      .sort((a, b) => a.order - b.order);
  }, [params, timeline]);

  const openEvent = open ? eventById.get(open) : null;
  const eraView = zoom < 0.6;

  useEffect(() => {
    if (open && scroller.current) {
      const el = scroller.current.querySelector(`[data-ev="${open}"]`) as HTMLElement | null;
      el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [open, view]);

  const onWheel = (ev: React.WheelEvent) => {
    if (ev.ctrlKey) {
      ev.preventDefault();
      setZoom((z) => Math.min(1.8, Math.max(0.35, z - ev.deltaY * 0.0015)));
    }
  };

  const spacing = 250 * zoom;
  const activeChar = params.get('character');

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="eyebrow">Interactive timeline</div>
          <h1 className="font-serif text-4xl font-semibold">{activeChar ? `${characterById.get(activeChar)?.name}'s timeline` : timeline.title}</h1>
          <p className="text-sm text-muted">{timeline.description} Narrative order only — these are not historical dates.</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {timelines.map((t) => (
            <Link key={t.id} to={`/timeline/${t.id}?${params.toString()}`} className={`chip !py-1.5 ${t.id === timeline.id ? 'chip-active' : ''}`}>
              {t.title}
            </Link>
          ))}
        </div>
      </div>

      <div className="card mb-4 flex flex-wrap items-center justify-between gap-3 p-3">
        <div className="flex flex-wrap gap-1">
          {VIEWS.map((v) => (
            <button key={v.id} onClick={() => set('view', v.id === 'horizontal' ? null : v.id)} className={`chip !py-1.5 ${view === v.id ? 'chip-active' : ''}`}>
              {v.label}
            </button>
          ))}
        </div>
        {(view === 'horizontal' || view === 'parallel') && (
          <div className="flex items-center gap-2 text-xs text-muted">
            <button className="rounded-lg p-1.5 hover:bg-gold/10" onClick={() => setZoom((z) => Math.max(0.35, z - 0.2))} aria-label="Zoom out">
              <Icon name="zoomOut" className="h-4 w-4" />
            </button>
            <input type="range" min={0.35} max={1.8} step={0.05} value={zoom} onChange={(e) => setZoom(+e.target.value)} className="w-28 accent-[rgb(var(--c-gold))]" aria-label="Zoom" />
            <button className="rounded-lg p-1.5 hover:bg-gold/10" onClick={() => setZoom((z) => Math.min(1.8, z + 0.2))} aria-label="Zoom in">
              <Icon name="zoomIn" className="h-4 w-4" />
            </button>
            <span className="w-24">{eraView ? 'Era overview' : 'Event detail'}</span>
          </div>
        )}
      </div>
      <div className="mb-4">
        <Filters params={params} set={set} />
      </div>
      <div className="mb-2 text-xs text-muted">
        {filtered.length} events
        {[...params.keys()].some((k) => !['view', 'focus'].includes(k)) && (
          <button className="ml-3 text-gold hover:text-saffron" onClick={() => setParams(view !== 'horizontal' ? { view } : {}, { replace: true })}>
            Clear filters
          </button>
        )}
      </div>

      {filtered.length === 0 && <div className="card p-10 text-center text-muted">No events match these filters.</div>}

      {/* Horizontal / era overview */}
      {view === 'horizontal' && filtered.length > 0 && (
        <div ref={scroller} onWheel={onWheel} className="relative overflow-x-auto rounded-2xl border border-gold/10 bg-ink/40 pb-4">
          {eraView ? (
            <div className="flex min-w-max gap-3 p-6">
              {timeline.eras.map((eid) => {
                const era = eraById.get(eid)!;
                const evs = filtered.filter((e) => e.era === eid);
                if (!evs.length) return null;
                return (
                  <button key={eid} onClick={() => { setZoom(1); set('era', eid); }} className="card card-hover w-64 p-5 text-left" style={{ borderTop: `3px solid ${era.color}` }}>
                    <div className="font-serif text-2xl">{era.name}</div>
                    <div className="text-xs text-gold/80">{era.subtitle}</div>
                    <div className="mt-3 text-3xl font-serif" style={{ color: era.color }}>{evs.length}</div>
                    <div className="text-xs text-muted">events · click to zoom in</div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="relative" style={{ width: Math.max(900, filtered.length * spacing + 300), height: 470 }}>
              <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-gold/0 via-gold/50 to-gold/0" />
              {/* Era bands */}
              {timeline.eras.map((eid) => {
                const idxs = filtered.map((e, i) => (e.era === eid ? i : -1)).filter((i) => i >= 0);
                if (!idxs.length) return null;
                const era = eraById.get(eid)!;
                const x0 = 150 + Math.min(...idxs) * spacing - spacing / 2 + 10;
                const x1 = 150 + Math.max(...idxs) * spacing + spacing / 2 - 10;
                return (
                  <div key={eid} className="absolute top-1/2 -translate-y-1/2 rounded-full" style={{ left: x0, width: x1 - x0, height: 6, background: `${era.color}55` }}>
                    <div className="absolute -top-6 left-2 whitespace-nowrap text-[10px] uppercase tracking-widest" style={{ color: era.color }}>
                      {era.name}
                    </div>
                  </div>
                );
              })}
              {filtered.map((e, i) => {
                const x = 150 + i * spacing;
                const top = i % 2 === 0;
                const era = eraById.get(e.era)!;
                return (
                  <div key={e.id} data-ev={e.id} className="absolute" style={{ left: x - 112, top: top ? 20 : 260 }}>
                    <div className="absolute left-1/2 w-px bg-gold/30" style={{ top: top ? 150 : -25, height: top ? 65 : 25 }} />
                    <span className="absolute left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full ring-4 ring-night" style={{ top: top ? 208 : -32, background: era.color }} />
                    <div style={{ marginTop: top ? 0 : 0 }}>
                      <EventCard e={e} onOpen={setOpen} active={open === e.id} side={top ? 'top' : 'bottom'} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Parallel lanes */}
      {view === 'parallel' && filtered.length > 0 && (
        <div ref={scroller} onWheel={onWheel} className="overflow-x-auto rounded-2xl border border-gold/10 bg-ink/40 p-4">
          {(() => {
            const laneEras = timeline.eras.filter((eid) => filtered.some((e) => e.era === eid));
            const all = filtered;
            const W = 140 + all.length * spacing * 0.75;
            return (
              <div className="relative" style={{ width: Math.max(900, W), height: laneEras.length * 150 + 20 }}>
                {laneEras.map((eid, li) => {
                  const era = eraById.get(eid)!;
                  return (
                    <div key={eid} className="absolute left-0 right-0 border-b border-gold/10" style={{ top: li * 150, height: 150 }}>
                      <div className="sticky left-0 z-10 inline-block rounded-r-full bg-ink/90 px-3 py-1 text-[10px] uppercase tracking-widest" style={{ color: era.color }}>
                        {era.name}
                      </div>
                    </div>
                  );
                })}
                {/* parallel connectors */}
                <svg className="pointer-events-none absolute inset-0" width="100%" height="100%">
                  {all.flatMap((e, i) =>
                    (e.parallelWith ?? []).map((p) => {
                      const j = all.findIndex((x) => x.id === p);
                      if (j < 0) return null;
                      const y1 = laneEras.indexOf(e.era) * 150 + 85;
                      const y2 = laneEras.indexOf(all[j].era) * 150 + 85;
                      const x1 = 140 + i * spacing * 0.75 + 100;
                      const x2 = 140 + j * spacing * 0.75 + 100;
                      return <line key={e.id + p} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgb(var(--c-saffron))" strokeDasharray="4 4" strokeWidth="1.5" opacity="0.7" />;
                    }),
                  )}
                </svg>
                {all.map((e, i) => (
                  <div key={e.id} data-ev={e.id} className="absolute" style={{ left: 140 + i * spacing * 0.75, top: laneEras.indexOf(e.era) * 150 + 30 }}>
                    <EventCard e={e} onOpen={setOpen} active={open === e.id} />
                  </div>
                ))}
              </div>
            );
          })()}
          <p className="mt-2 text-xs text-muted">Dashed saffron lines mark events that different traditions place in parallel or that overlap in narrative time.</p>
        </div>
      )}

      {/* Vertical */}
      {view === 'vertical' && (
        <div className="relative mx-auto w-full max-w-4xl">
          <div className="absolute bottom-0 left-1/2 top-0 hidden w-px bg-gradient-to-b from-gold/0 via-gold/40 to-gold/0 md:block" />
          <div className="space-y-6">
            {filtered.map((e, i) => {
              const era = eraById.get(e.era)!;
              return (
                <div key={e.id} data-ev={e.id} className={`relative md:w-1/2 ${i % 2 ? 'md:ml-auto md:pl-10' : 'md:pr-10'}`}>
                  <span className={`absolute top-6 hidden h-3.5 w-3.5 rounded-full ring-4 ring-night md:block ${i % 2 ? '-left-[7px]' : '-right-[7px]'}`} style={{ background: era.color }} />
                  <button onClick={() => setOpen(e.id)} className="card card-hover w-full p-5 text-left" style={{ borderLeft: `3px solid ${era.color}` }}>
                    <div className="text-[10px] uppercase tracking-wider" style={{ color: era.color }}>
                      {era.name}
                    </div>
                    <div className="font-serif text-xl">{e.title}</div>
                    <p className="mt-1 text-sm text-parchment/70">{e.summary}</p>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* By era */}
      {view === 'eras' && (
        <div className="space-y-8">
          {timeline.eras.map((eid) => {
            const era = eraById.get(eid)!;
            const evs = filtered.filter((e) => e.era === eid);
            if (!evs.length) return null;
            return (
              <section key={eid}>
                <div className="mb-3 flex items-baseline gap-3">
                  <span className="h-3 w-3 rounded-full" style={{ background: era.color }} />
                  <h2 className="font-serif text-2xl">{era.name}</h2>
                  <span className="text-sm text-muted">{era.subtitle}</span>
                </div>
                <p className="mb-3 max-w-3xl text-sm text-parchment/70">{era.description}</p>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {evs.map((e) => (
                    <div key={e.id} data-ev={e.id} className="shrink-0">
                      <EventCard e={e} onOpen={setOpen} active={open === e.id} />
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {/* Compact list (Events index) */}
      {view === 'list' && (
        <div className="card divide-y divide-gold/10">
          {filtered.map((e) => {
            const era = eraById.get(e.era)!;
            return (
              <button key={e.id} onClick={() => nav(`/events/${e.id}`)} className="flex w-full items-start gap-4 px-4 py-3 text-left hover:bg-gold/5">
                <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: era.color }} />
                <span className="min-w-0 flex-1">
                  <span className="block font-serif text-lg leading-tight">{e.title}</span>
                  <span className="block text-sm text-muted">{e.summary}</span>
                </span>
                <span className="hidden shrink-0 text-xs text-muted sm:block">{era.name}</span>
              </button>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {openEvent && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/50" onClick={() => setOpen(null)} />
            <motion.aside
              initial={{ x: 480 }}
              animate={{ x: 0 }}
              exit={{ x: 480 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-lg overflow-y-auto border-l border-gold/20 bg-ink p-6 shadow-2xl"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <h2 className="font-serif text-3xl leading-tight">{openEvent.title}</h2>
                <button onClick={() => setOpen(null)} className="rounded-lg p-1.5 text-muted hover:bg-gold/10 hover:text-parchment" aria-label="Close">
                  <Icon name="close" />
                </button>
              </div>
              <div className="mb-4 flex gap-2">
                {openEvent.preceding?.[0] && (
                  <button className="chip" onClick={() => setOpen(openEvent.preceding![0])}>
                    ← Previous
                  </button>
                )}
                {openEvent.following?.[0] && (
                  <button className="chip" onClick={() => setOpen(openEvent.following![0])}>
                    Next →
                  </button>
                )}
                <Link to={`/events/${openEvent.id}`} className="chip ml-auto">
                  Full page ↗
                </Link>
              </div>
              <EventDetail e={openEvent} compact />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export type { EraId };
