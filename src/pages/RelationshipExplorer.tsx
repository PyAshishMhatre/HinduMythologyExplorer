import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { characterById, featured } from '../data';
import type { RelationshipType } from '../data/types';
import { findConnection } from '../lib/kinship';
import { edgeSentence, edgesOf } from '../lib/graph';
import RelGraph, { REL_COLOR, REL_LABEL } from '../components/graph/RelGraph';
import { CharacterPicker } from '../components/ui/CharacterPicker';
import { ConfidenceBadge } from '../components/ui';
import { useProgress } from '../store/progress';

const EXAMPLES: [string, string][] = [
  ['krishna', 'arjuna'], ['rama', 'ikshvaku'], ['bhishma', 'arjuna'], ['ravana', 'kubera'], ['parikshit', 'arjuna'], ['hanuman', 'bhima'], ['rama', 'krishna'], ['karna', 'yudhishthira'],
];

const FILTERS: { id: string; label: string; types?: RelationshipType[] }[] = [
  { id: 'all', label: 'All' },
  { id: 'family', label: 'Family', types: ['parent', 'divine-parent', 'adoptive-parent', 'niyoga-parent', 'legal-parent', 'mind-born', 'ancestor-of', 'spouse', 'sibling', 'half-sibling'] },
  { id: 'teacher', label: 'Teachers & allies', types: ['teacher', 'friend', 'ally'] },
  { id: 'conflict', label: 'Conflict', types: ['enemy', 'killed', 'curse'] },
  { id: 'divine', label: 'Divine', types: ['avatar-of', 'manifestation-of', 'boon', 'divine-parent'] },
];

// Resolve "/relationships/a-b" where ids themselves may contain hyphens.
function parsePair(pair?: string): [string | null, string | null] {
  if (!pair) return [null, null];
  if (characterById.has(pair)) return [pair, null];
  const parts = pair.split('-');
  for (let i = 1; i < parts.length; i++) {
    const a = parts.slice(0, i).join('-');
    const b = parts.slice(i).join('-');
    if (characterById.has(a) && characterById.has(b)) return [a, b];
  }
  return [null, null];
}

export default function RelationshipExplorer() {
  const { pair } = useParams();
  const nav = useNavigate();
  const [a0, b0] = parsePair(pair);
  const [a, setA] = useState<string | null>(a0 ?? 'krishna');
  const [b, setB] = useState<string | null>(b0 ?? (a0 ? null : 'arjuna'));
  const [filter, setFilter] = useState('all');
  const visit = useProgress((s) => s.visit);

  useEffect(() => {
    const [x, y] = parsePair(pair);
    if (x) {
      setA(x);
      setB(y);
    }
  }, [pair]);
  useEffect(() => {
    if (a) visit('character', a);
  }, [a, visit]);

  const update = (na: string | null, nb: string | null) => {
    if (na && nb) nav(`/relationships/${na}-${nb}`, { replace: true });
    else if (na) nav(`/relationships/${na}`, { replace: true });
  };

  const conn = useMemo(() => (a && b ? findConnection(a, b) : null), [a, b]);
  const direct = useMemo(() => (a && b ? edgesOf(a).filter((e) => e.to === b) : []), [a, b]);
  const types = FILTERS.find((f) => f.id === filter)?.types;

  return (
    <div>
      <div className="mb-6 max-w-3xl">
        <div className="eyebrow">Relationship explorer</div>
        <h1 className="font-serif text-4xl font-semibold">How Everything Connects</h1>
        <p className="mt-1 text-parchment/70">Choose two characters to trace their connection step by step, or one character to see their whole network. Click any connection to see the story behind it.</p>
      </div>

      <div className="mb-4 grid items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
        <CharacterPicker value={a} onChange={(id) => { setA(id); update(id, b); }} />
        <div className="text-center font-serif text-xl text-gold">&</div>
        <div className="flex gap-2">
          <div className="flex-1">
            <CharacterPicker value={b} onChange={(id) => { setB(id); update(a, id); }} placeholder="Add a second character…" />
          </div>
          {b && (
            <button className="btn-ghost !px-3" onClick={() => { setB(null); update(a, null); }} title="Show single network">
              ✕
            </button>
          )}
        </div>
      </div>
      <div className="mb-6 flex flex-wrap gap-1.5">
        <span className="text-xs text-muted">Try:</span>
        {EXAMPLES.map(([x, y]) => (
          <button key={x + y} className="chip hover:border-gold/60" onClick={() => { setA(x); setB(y); update(x, y); }}>
            {characterById.get(x)!.name} & {characterById.get(y)!.name}
          </button>
        ))}
      </div>

      {a && b && (
        <div className="mb-6 grid gap-6 lg:grid-cols-[380px_1fr]">
          <div className="space-y-4">
            {conn ? (
              <div className="card p-5">
                <div className="eyebrow mb-1">{conn.familyOnly ? 'Family relationship' : 'Connection'}</div>
                <div className="font-serif text-2xl leading-snug">
                  {conn.familyOnly ? (
                    <>
                      {characterById.get(b)!.name} is {characterById.get(a)!.name}'s <span className="text-gold">{conn.label}</span>
                    </>
                  ) : (
                    <>
                      {characterById.get(a)!.name} and {characterById.get(b)!.name}: <span className="text-gold">{conn.label}</span>
                    </>
                  )}
                </div>
                <ol className="mt-4 space-y-3">
                  {conn.path.map((e, i) => (
                    <li key={e.rel.id + i} className="relative pl-7">
                      <span className="absolute left-0 top-0.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] text-ink" style={{ background: REL_COLOR[e.rel.type] ?? 'rgb(var(--c-gold))' }}>
                        {i + 1}
                      </span>
                      <div className="text-sm text-parchment">{edgeSentence(e)}.</div>
                      <div className="text-xs leading-relaxed text-muted">{e.rel.explanation}</div>
                      <div className="mt-1">
                        <ConfidenceBadge c={e.rel.confidence} />
                      </div>
                    </li>
                  ))}
                </ol>
                {conn.alternatives.length > 0 && (
                  <div className="mt-4 border-t border-gold/10 pt-3">
                    <div className="eyebrow mb-1 !text-[10px]">Also connected as</div>
                    {conn.alternatives.map((alt, i) => (
                      <div key={i} className="mb-2 text-sm">
                        <span className="text-gold">{alt.label}</span>
                        <span className="text-muted"> — {alt.path.map((e) => edgeSentence(e)).join('; ')}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="card p-5 text-sm text-muted">No recorded connection between these characters yet.</div>
            )}
            {direct.length > 0 && (
              <div className="card p-5">
                <div className="eyebrow mb-2">Direct links</div>
                {direct.map((e) => (
                  <div key={e.rel.id} className="mb-2 text-sm">
                    <span className="font-medium" style={{ color: REL_COLOR[e.rel.type] }}>
                      {e.rel.label ?? REL_LABEL[e.rel.type]}
                    </span>
                    <span className="text-parchment/75"> — {e.rel.explanation}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <RelGraph focus={[a, b]} path={conn?.path} height="560px" />
        </div>
      )}

      {a && !b && (
        <>
          <div className="mb-3 flex flex-wrap gap-1.5">
            {FILTERS.map((f) => (
              <button key={f.id} onClick={() => setFilter(f.id)} className={`chip !py-1.5 ${filter === f.id ? 'chip-active' : ''}`}>
                {f.label}
              </button>
            ))}
            <Link to={`/characters/${a}`} className="chip ml-auto">
              Open {characterById.get(a)!.name}'s profile →
            </Link>
          </div>
          <RelGraph focus={[a]} types={types} height="620px" />
        </>
      )}

      <div className="mt-8 grid gap-3 md:grid-cols-3">
        {featured.slice(0, 3).map((f) => (
          <Link key={f.id} to={f.link} className="card card-hover p-4">
            <div className="font-serif text-lg">{f.question}</div>
            <p className="text-xs text-muted">{f.teaser}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
