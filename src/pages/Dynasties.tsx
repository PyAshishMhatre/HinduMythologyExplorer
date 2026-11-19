import { Link } from 'react-router-dom';
import { dynasties, characterById } from '../data';
import { PageHeader } from '../components/ui';

export default function Dynasties() {
  return (
    <div>
      <PageHeader eyebrow="Lineages" title="Dynasties" subtitle="Both great epics descend from Vaivasvata Manu — the Solar line through his son Ikshvaku, the Lunar line through his child Ila and Budha, son of the Moon." />
      <div className="card mb-8 p-6">
        <div className="eyebrow mb-3">Solar and Lunar at a glance</div>
        <div className="grid gap-6 md:grid-cols-2">
          {[dynasties[0], dynasties[1]].map((d) => (
            <div key={d.id}>
              <div className="font-serif text-2xl">{d.name}</div>
              <div className="mb-2 text-xs text-gold/80">{d.sanskritName}</div>
              <div className="flex flex-wrap items-center gap-1 text-sm">
                {d.line.map((id, i) => (
                  <span key={id} className="flex items-center gap-1">
                    {i > 0 && <span className="text-gold/50">→</span>}
                    <Link to={`/characters/${id}`} className="rounded px-1 hover:bg-gold/10 hover:text-gold">
                      {characterById.get(id)?.name}
                    </Link>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted">Arrows may span many abridged generations.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {dynasties.map((d) => (
          <Link key={d.id} to={`/dynasties/${d.id}`} className="card card-hover p-6">
            <div className="font-serif text-3xl">{d.name}</div>
            <div className="text-sm text-gold/80">{d.sanskritName}</div>
            <p className="mt-2 text-sm text-parchment/75">{d.description}</p>
            <div className="mt-3 text-xs text-muted">{d.origin}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
