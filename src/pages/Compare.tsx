import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { characterById, dynastyById, events, stories, sourceById } from '../data';
import { parentsOf, spousesOf, childrenOf } from '../lib/graph';
import { findConnection } from '../lib/kinship';
import { CharacterPicker } from '../components/ui/CharacterPicker';
import { Emblem, CATEGORY_LABEL } from '../components/ui/Emblem';
import { PageHeader } from '../components/ui';
import { stripMarkup } from '../components/ui/RichText';

const PRESETS: [string, string][] = [['rama', 'krishna'], ['ravana', 'kumbhakarna'], ['bhishma', 'drona'], ['karna', 'arjuna'], ['sita', 'draupadi'], ['hanuman', 'bhima']];

function parse(pair?: string): [string, string] {
  if (!pair) return ['rama', 'krishna'];
  const [a, b] = pair.split('-vs-');
  return [characterById.has(a) ? a : 'rama', characterById.has(b) ? b : 'krishna'];
}

export default function Compare() {
  const { pair } = useParams();
  const nav = useNavigate();
  const [a, setA] = useState(parse(pair)[0]);
  const [b, setB] = useState(parse(pair)[1]);
  useEffect(() => {
    const [x, y] = parse(pair);
    setA(x);
    setB(y);
  }, [pair]);
  const go = (x: string, y: string) => nav(`/compare/${x}-vs-${y}`, { replace: true });
  const conn = findConnection(a, b);

  const rows: { label: string; render: (id: string) => React.ReactNode }[] = [
    { label: 'Type', render: (id) => CATEGORY_LABEL[characterById.get(id)!.category] },
    { label: 'Role', render: (id) => characterById.get(id)!.title },
    { label: 'Tradition', render: (id) => characterById.get(id)!.primaryTradition },
    { label: 'Dynasty', render: (id) => { const d = characterById.get(id)!.dynasty; return d ? <Link className="text-gold" to={`/dynasties/${d}`}>{dynastyById.get(d)?.name}</Link> : '—'; } },
    { label: 'Parents', render: (id) => parentsOf(id).map((e) => <Link key={e.rel.id} to={`/characters/${e.to}`} className="mr-2 text-gold hover:text-saffron">{characterById.get(e.to)?.name}</Link>) },
    { label: 'Spouses', render: (id) => spousesOf(id).map((e) => <Link key={e.rel.id} to={`/characters/${e.to}`} className="mr-2 text-gold hover:text-saffron">{characterById.get(e.to)?.name}</Link>) || '—' },
    { label: 'Children', render: (id) => childrenOf(id).map((e) => <Link key={e.rel.id} to={`/characters/${e.to}`} className="mr-2 text-gold hover:text-saffron">{characterById.get(e.to)?.name}</Link>) },
    { label: 'Overview', render: (id) => <span className="text-parchment/80">{characterById.get(id)!.description}</span> },
    { label: 'Powers', render: (id) => characterById.get(id)!.powers?.join('; ') ?? '—' },
    { label: 'Character', render: (id) => characterById.get(id)!.personality?.join('; ') ?? '—' },
    { label: 'Fate', render: (id) => characterById.get(id)!.deathOrFate ?? '—' },
    { label: 'Significance', render: (id) => <ul className="list-inside list-disc">{characterById.get(id)!.significance?.map((s) => <li key={s}>{s}</li>) ?? '—'}</ul> },
    { label: 'Stories', render: (id) => stories.filter((s) => s.characters.includes(id)).map((s) => <Link key={s.id} to={`/stories/${s.id}`} className="mr-2 block text-gold hover:text-saffron">{s.title}</Link>) },
    { label: 'Events', render: (id) => `${events.filter((e) => e.characters.includes(id)).length} recorded events` },
    { label: 'Main sources', render: (id) => characterById.get(id)!.sources.map((s) => sourceById.get(s.sourceId)?.textName).filter((v, i, arr) => arr.indexOf(v) === i).join(', ') },
  ];

  return (
    <div>
      <PageHeader eyebrow="Compare" title="Compare Characters" subtitle="Side-by-side ancestry, roles, stories and significance." />
      <div className="mb-3 grid gap-3 md:grid-cols-2">
        <CharacterPicker value={a} onChange={(x) => go(x, b)} />
        <CharacterPicker value={b} onChange={(y) => go(a, y)} />
      </div>
      <div className="mb-6 flex flex-wrap gap-1.5">
        {PRESETS.map(([x, y]) => (
          <button key={x + y} className="chip hover:border-gold/60" onClick={() => go(x, y)}>
            {characterById.get(x)!.name} vs {characterById.get(y)!.name}
          </button>
        ))}
      </div>
      {conn && (
        <div className="card mb-6 flex flex-wrap items-center justify-between gap-3 p-4">
          <div className="text-sm">
            <span className="text-muted">Connection: </span>
            {conn.familyOnly ? `${characterById.get(b)!.name} is ${characterById.get(a)!.name}'s ${conn.label}` : conn.label} ({conn.path.length} step{conn.path.length > 1 ? 's' : ''})
          </div>
          <Link to={`/relationships/${a}-${b}`} className="text-sm text-gold hover:text-saffron">
            Trace it step by step →
          </Link>
        </div>
      )}
      <div className="card overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-gold/15">
              <th className="w-36 p-4" />
              {[a, b].map((id) => {
                const c = characterById.get(id)!;
                return (
                  <th key={id} className="p-4 text-left">
                    <Link to={`/characters/${id}`} className="flex items-center gap-3">
                      <Emblem name={c.name} category={c.category} size={52} />
                      <span className="font-serif text-2xl font-semibold">{c.name}</span>
                    </Link>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-b border-gold/10 align-top">
                <td className="p-4 text-xs uppercase tracking-wider text-gold/80">{r.label}</td>
                <td className="p-4 leading-relaxed">{r.render(a)}</td>
                <td className="p-4 leading-relaxed">{r.render(b)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted">{stripMarkup('Tip: open either profile for the full biography and sources.')}</p>
    </div>
  );
}
