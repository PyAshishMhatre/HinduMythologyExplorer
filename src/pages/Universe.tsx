import { Link } from 'react-router-dom';
import { eras, events, familyTrees, dynasties } from '../data';
import { pathways } from '../data/pathways';
import { PageHeader } from '../components/ui';

export default function Universe() {
  return (
    <div>
      <PageHeader eyebrow="Explore the universe" title="The Mythological Universe" subtitle="Seven pathways, seven narrative eras, and a web of lineages that ties them together. These are thematic groupings, not historically dated periods." />
      <section className="mb-12 grid gap-4 md:grid-cols-2">
        {pathways.map((p) => (
          <Link key={p.id} to={p.to} className="card card-hover flex gap-4 p-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl" style={{ background: `${p.color}22`, color: p.color }}>
              {p.glyph}
            </div>
            <div>
              <div className="font-serif text-xl">{p.title}</div>
              <p className="text-sm text-parchment/70">{p.description}</p>
            </div>
          </Link>
        ))}
      </section>
      <h2 className="mb-4 font-serif text-3xl">The seven narrative eras</h2>
      <ol className="relative mb-12 space-y-4 border-l border-gold/20 pl-6">
        {eras.map((e) => (
          <li key={e.id} className="relative">
            <span className="absolute -left-[31px] top-2 h-3 w-3 rounded-full ring-4 ring-night" style={{ background: e.color }} />
            <Link to={`/timeline/master?era=${e.id}`} className="card card-hover block p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="font-serif text-2xl">{e.name}</div>
                <div className="text-xs text-muted">{events.filter((x) => x.era === e.id).length} events</div>
              </div>
              <div className="text-sm text-gold/80">{e.subtitle}</div>
              <p className="mt-1 text-sm text-parchment/70">{e.description}</p>
            </Link>
          </li>
        ))}
      </ol>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card p-5">
          <div className="eyebrow mb-2">Family trees</div>
          <ul className="space-y-1">
            {familyTrees.map((t) => (
              <li key={t.id}>
                <Link to={`/family-tree/${t.id}`} className="text-parchment/85 hover:text-gold">
                  {t.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-5">
          <div className="eyebrow mb-2">Dynasties</div>
          <ul className="space-y-1">
            {dynasties.map((d) => (
              <li key={d.id}>
                <Link to={`/dynasties/${d.id}`} className="text-parchment/85 hover:text-gold">
                  {d.name} <span className="text-xs text-muted">· {d.sanskritName}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
