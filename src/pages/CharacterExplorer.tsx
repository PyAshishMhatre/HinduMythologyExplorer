import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { characters, characterGroups } from '../data';
import type { CharacterCategory } from '../data/types';
import { PageHeader } from '../components/ui';
import { Emblem, CATEGORY_LABEL, CATEGORY_COLOR } from '../components/ui/Emblem';
import { norm } from '../lib/names';

export default function CharacterExplorer() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState('');
  const group = params.get('group') ?? 'all';
  const cat = (params.get('cat') ?? 'all') as CharacterCategory | 'all';
  const cats = useMemo(() => [...new Set(characters.map((c) => c.category))], []);

  const list = useMemo(() => {
    const nq = norm(q);
    const ids = group === 'all' ? null : new Set(characterGroups.find((g) => g.id === group)?.ids);
    return characters
      .filter((c) => (!ids || ids.has(c.id)) && (cat === 'all' || c.category === cat))
      .filter((c) => !nq || norm([c.name, ...(c.alternateNames ?? []), c.title, ...(c.tags ?? [])].join(' ')).includes(nq))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [q, group, cat]);

  const setParam = (k: string, v: string) => {
    const n = new URLSearchParams(params);
    v === 'all' ? n.delete(k) : n.set(k, v);
    setParams(n, { replace: true });
  };

  return (
    <div>
      <PageHeader
        eyebrow="Character encyclopedia"
        title="Characters"
        subtitle={`${characters.length} gods, sages, kings, heroes, asuras and others — each connected to their family, stories and events.`}
        actions={
          <>
            <Link to="/compare/rama-vs-krishna" className="btn-ghost">
              Compare characters
            </Link>
            <Link to="/relationships" className="btn-ghost">
              How are they related?
            </Link>
          </>
        }
      />
      <div className="mb-6 space-y-3">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter by name, alias, role or tag…" className="input max-w-md" />
        <div className="flex flex-wrap gap-2">
          <button className={`chip ${group === 'all' ? 'chip-active' : ''}`} onClick={() => setParam('group', 'all')}>
            All traditions
          </button>
          {characterGroups.map((g) => (
            <button key={g.id} className={`chip ${group === g.id ? 'chip-active' : ''}`} onClick={() => setParam('group', g.id)}>
              {g.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <button className={`chip ${cat === 'all' ? 'chip-active' : ''}`} onClick={() => setParam('cat', 'all')}>
            All types
          </button>
          {cats.map((c) => (
            <button key={c} className={`chip ${cat === c ? 'chip-active' : ''}`} onClick={() => setParam('cat', c)}>
              <span className="h-2 w-2 rounded-full" style={{ background: CATEGORY_COLOR[c] }} />
              {CATEGORY_LABEL[c]}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-3 text-xs text-muted">{list.length} characters</div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c) => (
          <Link key={c.id} to={`/characters/${c.id}`} className="card card-hover flex gap-4 p-4">
            <Emblem name={c.name} category={c.category} size={60} />
            <div className="min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="truncate font-serif text-xl">{c.name}</span>
                {c.sanskritName && <span className="truncate text-sm text-muted">{c.sanskritName}</span>}
              </div>
              <div className="text-xs text-gold/80">{CATEGORY_LABEL[c.category]}</div>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-parchment/70">{c.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
