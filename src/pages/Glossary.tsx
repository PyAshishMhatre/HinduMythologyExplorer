import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { glossary, glossaryById, stories } from '../data';
import { PageHeader } from '../components/ui';

export default function Glossary() {
  const { term } = useParams();
  const [q, setQ] = useState('');
  const list = useMemo(() => glossary.filter((g) => !q || `${g.term} ${g.short}`.toLowerCase().includes(q.toLowerCase())).sort((a, b) => a.term.localeCompare(b.term)), [q]);
  useEffect(() => {
    if (term) setTimeout(() => document.getElementById(`t-${term}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 150);
  }, [term]);
  return (
    <div>
      <PageHeader eyebrow="Concepts" title="Glossary" subtitle="Key Sanskrit terms. They are clickable wherever they appear in stories and lessons." />
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter terms…" className="input mb-6 max-w-sm" />
      <div className="grid gap-4 md:grid-cols-2">
        {list.map((g) => {
          const usedIn = stories.filter((s) => s.chapters.some((c) => c.concepts?.includes(g.id) || c.narrative.some((p) => p.includes(`[[term:${g.id}`))));
          return (
            <div key={g.id} id={`t-${g.id}`} className={`card scroll-mt-24 p-5 ${term === g.id ? '!border-saffron shadow-glow' : ''}`}>
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="font-serif text-2xl">{g.term}</h2>
                {g.sanskrit && <span className="text-lg text-gold/80">{g.sanskrit}</span>}
              </div>
              <div className="text-sm text-gold/80">{g.short}</div>
              <p className="mt-2 text-sm leading-relaxed text-parchment/80">{g.long}</p>
              {g.related && g.related.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {g.related.map((r) => (
                    <Link key={r} to={`/glossary/${r}`} className="chip hover:border-gold/60">
                      {glossaryById.get(r)?.term ?? r}
                    </Link>
                  ))}
                </div>
              )}
              {usedIn.length > 0 && (
                <div className="mt-3 text-xs text-muted">
                  Appears in:{' '}
                  {usedIn.map((s, i) => (
                    <span key={s.id}>
                      {i > 0 && ', '}
                      <Link to={`/stories/${s.id}`} className="text-gold/80 hover:text-saffron">
                        {s.title}
                      </Link>
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
