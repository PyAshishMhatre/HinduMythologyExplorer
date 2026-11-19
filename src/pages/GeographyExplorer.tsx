import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { locations, locationById, eventById, storyById } from '../data';
import { LANKA_PATH, RIVERS, SUBCONTINENT_PATH } from '../data/locations';
import type { Location } from '../data/types';
import { CharacterChip } from '../components/ui';
import { useProgress } from '../store/progress';

const CONF: Record<Location['identificationConfidence'], { label: string; cls: string }> = {
  traditional: { label: 'Traditional identification', cls: 'text-jade border-jade/50' },
  'commonly-identified': { label: 'Commonly identified', cls: 'text-lapis border-lapis/50' },
  disputed: { label: 'Disputed identification', cls: 'text-vermilion border-vermilion/50' },
  mythic: { label: 'Cosmological realm', cls: 'text-saffron border-saffron/50' },
};
const KIND_ICON: Record<Location['kind'], string> = { city: '◆', forest: '♣', mountain: '▲', river: '≈', ashram: '✧', kingdom: '♛', battlefield: '⚔', island: '◉', cosmic: '✺' };

export default function GeographyExplorer() {
  const { locationId } = useParams();
  const nav = useNavigate();
  const [hover, setHover] = useState<string | null>(null);
  const [epic, setEpic] = useState<'all' | 'ramayana' | 'mahabharata' | 'puranic'>('all');
  const sel = locationId ? locationById.get(locationId) : null;
  const visit = useProgress((s) => s.visit);
  useEffect(() => {
    if (sel) visit('location', sel.id);
  }, [sel, visit]);

  const earthly = locations.filter((l) => l.kind !== 'cosmic');
  const cosmic = locations.filter((l) => l.kind === 'cosmic');
  const epicOf = (l: Location) => {
    const evs = (l.events ?? []).map((e) => eventById.get(e)?.era);
    if (evs.some((e) => e === 'ramayana' || e === 'solar')) return 'ramayana';
    if (evs.some((e) => e === 'mahabharata' || e === 'lunar')) return 'mahabharata';
    return 'puranic';
  };
  const visible = (l: Location) => epic === 'all' || epicOf(l) === epic || (epic === 'mahabharata' && ['mathura', 'gokul', 'vrindavan', 'dwarka', 'prabhasa', 'gandhara', 'matsya-kingdom', 'kashi', 'naimisharanya', 'badarikashrama'].includes(l.id)) || (epic === 'ramayana' && ['dandakaranya', 'mithila', 'chitrakoot'].includes(l.id));

  const lines = sel?.connectedTo?.map((c) => locationById.get(c)).filter((x): x is Location => !!x && x.kind !== 'cosmic') ?? [];

  return (
    <div>
      <div className="mb-4 max-w-3xl">
        <div className="eyebrow">Sacred geography</div>
        <h1 className="font-serif text-4xl font-semibold">The Mythological Landscape</h1>
        <p className="mt-1 text-sm text-parchment/70">
          Places named in the epics and Puranas, shown on a stylised map. Positions follow traditional or commonly proposed identifications — they are not archaeological claims, and disputed identifications are marked as such.
        </p>
      </div>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {(['all', 'ramayana', 'mahabharata', 'puranic'] as const).map((e) => (
          <button key={e} onClick={() => setEpic(e)} className={`chip !py-1.5 capitalize ${epic === e ? 'chip-active' : ''}`}>
            {e === 'all' ? 'All places' : e}
          </button>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
        <div className="card relative overflow-hidden p-2">
          <svg viewBox="0 0 1000 1150" className="h-[calc(100vh-15rem)] min-h-[520px] w-full">
            <defs>
              <radialGradient id="land" cx="50%" cy="40%" r="70%">
                <stop offset="0%" stopColor="rgb(var(--c-gold))" stopOpacity="0.12" />
                <stop offset="100%" stopColor="rgb(var(--c-gold))" stopOpacity="0.03" />
              </radialGradient>
              <pattern id="waves" width="40" height="20" patternUnits="userSpaceOnUse">
                <path d="M0 10 Q10 4 20 10 T40 10" fill="none" stroke="rgb(var(--c-lapis))" strokeOpacity="0.08" />
              </pattern>
            </defs>
            <rect width="1000" height="1150" fill="url(#waves)" />
            <path d={SUBCONTINENT_PATH} fill="url(#land)" stroke="rgb(var(--c-gold))" strokeOpacity="0.45" strokeWidth="1.5" strokeLinejoin="round" />
            <path d={LANKA_PATH} fill="url(#land)" stroke="rgb(var(--c-gold))" strokeOpacity="0.45" strokeWidth="1.5" />
            {RIVERS.map((r) => (
              <g key={r.name}>
                <path d={r.d} fill="none" stroke="rgb(var(--c-lapis))" strokeOpacity="0.55" strokeWidth="2" />
              </g>
            ))}
            <text x="640" y="520" fill="rgb(var(--c-lapis))" fillOpacity="0.5" fontSize="13" fontStyle="italic">Ganga</text>
            <text x="230" y="300" fill="rgb(var(--c-lapis))" fillOpacity="0.5" fontSize="13" fontStyle="italic">Yamuna</text>
            <text x="320" y="690" fill="rgb(var(--c-lapis))" fillOpacity="0.5" fontSize="13" fontStyle="italic">Godavari</text>
            <text x="120" y="330" fill="rgb(var(--c-lapis))" fillOpacity="0.5" fontSize="13" fontStyle="italic">Sindhu</text>
            <text x="560" y="230" fill="rgb(var(--c-gold))" fillOpacity="0.35" fontSize="14" letterSpacing="6">HIMAVAT</text>
            <text x="520" y="1000" fill="rgb(var(--c-lapis))" fillOpacity="0.35" fontSize="14" letterSpacing="4" fontStyle="italic">southern ocean</text>
            {sel &&
              lines.map((l) => <line key={l.id} x1={sel.x} y1={sel.y} x2={l.x} y2={l.y} stroke="rgb(var(--c-saffron))" strokeDasharray="5 5" strokeWidth="1.5" opacity="0.8" />)}
            {earthly.map((l) => {
              const on = sel?.id === l.id;
              const hv = hover === l.id;
              const vis = visible(l);
              return (
                <g
                  key={l.id}
                  transform={`translate(${l.x} ${l.y})`}
                  className="cursor-pointer"
                  opacity={vis ? 1 : 0.18}
                  onClick={() => nav(`/map/${l.id}`)}
                  onMouseEnter={() => setHover(l.id)}
                  onMouseLeave={() => setHover(null)}
                >
                  {on && <circle r="18" fill="rgb(var(--c-saffron))" opacity="0.2" />}
                  <circle r={on ? 7 : 5} fill={on ? 'rgb(var(--c-saffron))' : 'rgb(var(--c-gold))'} stroke="rgb(var(--c-ink))" strokeWidth="2" />
                  {l.identificationConfidence === 'disputed' && <circle r="10" fill="none" stroke="rgb(var(--c-vermilion))" strokeDasharray="2 3" opacity="0.8" />}
                  <text x="10" y="4" fontSize={on || hv ? 17 : 13} fill="rgb(var(--c-parchment))" fillOpacity={on || hv ? 1 : 0.8} fontFamily="Cormorant Garamond, serif" fontWeight="600" style={{ paintOrder: 'stroke', stroke: 'rgb(var(--c-night))', strokeWidth: 4 }}>
                    {l.name}
                  </text>
                </g>
              );
            })}
          </svg>
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-3 rounded-xl bg-ink/80 px-3 py-2 text-[11px] text-muted">
            <span>● place</span>
            <span className="text-vermilion">◌ disputed identification</span>
            <span className="text-saffron">- - connected places</span>
          </div>
        </div>

        <aside className="space-y-4">
          {sel ? (
            <div className="card p-5">
              <div className="eyebrow mb-1">
                {KIND_ICON[sel.kind]} {sel.kind}
              </div>
              <h2 className="font-serif text-3xl">{sel.name}</h2>
              {sel.alternateNames && <div className="text-xs text-muted">{sel.alternateNames.join(' · ')}</div>}
              <p className="mt-3 text-sm leading-relaxed text-parchment/85">{sel.significance}</p>
              <div className={`mt-4 rounded-xl border p-3 text-xs ${CONF[sel.identificationConfidence].cls}`}>
                <div className="mb-1 font-medium uppercase tracking-wider">{CONF[sel.identificationConfidence].label}</div>
                <div className="text-parchment/80">{sel.modernIdentification}</div>
              </div>
              {sel.events && sel.events.length > 0 && (
                <div className="mt-4">
                  <div className="eyebrow mb-1 !text-[10px]">Events here</div>
                  {sel.events.map((e) => (
                    <Link key={e} to={`/events/${e}`} className="block py-0.5 text-sm hover:text-gold">
                      {eventById.get(e)?.title}
                    </Link>
                  ))}
                </div>
              )}
              {sel.stories && sel.stories.length > 0 && (
                <div className="mt-4">
                  <div className="eyebrow mb-1 !text-[10px]">Stories</div>
                  {sel.stories.map((s) => (
                    <Link key={s} to={`/stories/${s}`} className="block py-0.5 text-sm hover:text-gold">
                      {storyById.get(s)?.title}
                    </Link>
                  ))}
                </div>
              )}
              {sel.characters && (
                <div className="mt-4">
                  <div className="eyebrow mb-2 !text-[10px]">Associated characters</div>
                  <div className="grid gap-2">
                    {sel.characters.slice(0, 6).map((c) => (
                      <CharacterChip key={c} id={c} />
                    ))}
                  </div>
                </div>
              )}
              {lines.length > 0 && (
                <div className="mt-4">
                  <div className="eyebrow mb-1 !text-[10px]">Connected places</div>
                  <div className="flex flex-wrap gap-1.5">
                    {lines.map((l) => (
                      <Link key={l.id} to={`/map/${l.id}`} className="chip hover:border-gold/60">
                        {l.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="card p-5 text-sm text-parchment/75">Select a place on the map to see its significance, events, characters and connections.</div>
          )}
          <div className="card p-5">
            <div className="eyebrow mb-2">Cosmological realms</div>
            <p className="mb-3 text-xs text-muted">Not earthly locations — realms of the Puranic cosmos.</p>
            {cosmic.map((l) => (
              <button key={l.id} onClick={() => nav(`/map/${l.id}`)} className={`mb-1 block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-gold/10 ${sel?.id === l.id ? 'bg-gold/10' : ''}`}>
                ✺ {l.name}
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
