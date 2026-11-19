import { Link } from 'react-router-dom';
import { eraById, eventById, locationById, storyById, familyTreeById, dynastyById } from '../../data';
import type { MythEvent } from '../../data/types';
import { CharacterChip, SourceList } from '../ui';
import { Prose } from '../ui/RichText';

export default function EventDetail({ e, compact = false }: { e: MythEvent; compact?: boolean }) {
  const era = eraById.get(e.era)!;
  const pre = (e.preceding ?? []).map((x) => eventById.get(x)!).filter(Boolean);
  const fol = (e.following ?? []).map((x) => eventById.get(x)!).filter(Boolean);
  const par = (e.parallelWith ?? []).map((x) => eventById.get(x)!).filter(Boolean);
  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="rounded-full px-2.5 py-0.5 text-[11px] font-medium text-ink" style={{ background: era.color }}>
            {era.name}
          </span>
          <span className="chip capitalize">{e.category.replace('-', ' ')}</span>
          {e.epic && <span className="chip capitalize">{e.epic}</span>}
        </div>
        {!compact && <h1 className="font-serif text-4xl font-semibold">{e.title}</h1>}
        <p className="mt-2 text-lg leading-relaxed text-parchment/85">{e.summary}</p>
      </div>
      <Prose paragraphs={e.narrative} />
      {e.traditionNotes && <div className="rounded-xl border border-saffron/30 bg-saffron/5 p-4 text-sm text-parchment/85">{e.traditionNotes}</div>}

      {e.characters.length > 0 && (
        <div>
          <div className="eyebrow mb-2">Important characters</div>
          <div className={`grid gap-2 ${compact ? 'grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
            {e.characters.map((c) => (
              <CharacterChip key={c} id={c} />
            ))}
          </div>
        </div>
      )}

      <div className={`grid gap-4 ${compact ? '' : 'md:grid-cols-2'}`}>
        {pre.length > 0 && (
          <div className="card p-4">
            <div className="eyebrow mb-2 !text-[10px]">Preceded by</div>
            {pre.map((p) => (
              <Link key={p.id} to={`/events/${p.id}`} className="block py-1 text-sm hover:text-gold">
                ← {p.title}
              </Link>
            ))}
          </div>
        )}
        {fol.length > 0 && (
          <div className="card p-4">
            <div className="eyebrow mb-2 !text-[10px]">Leads to</div>
            {fol.map((p) => (
              <Link key={p.id} to={`/events/${p.id}`} className="block py-1 text-sm hover:text-gold">
                {p.title} →
              </Link>
            ))}
          </div>
        )}
        {par.length > 0 && (
          <div className="card p-4">
            <div className="eyebrow mb-2 !text-[10px]">Parallel / overlapping traditions</div>
            {par.map((p) => (
              <Link key={p.id} to={`/events/${p.id}`} className="block py-1 text-sm hover:text-gold">
                ⇄ {p.title}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {e.stories?.map((s) => (
          <Link key={s} to={`/stories/${s}`} className="btn-primary !px-4 !py-2 !text-xs">
            Read: {storyById.get(s)?.title}
          </Link>
        ))}
        {e.familyTree && (
          <Link to={`/family-tree/${e.familyTree}`} className="btn-ghost !px-4 !py-2 !text-xs">
            Family tree: {familyTreeById.get(e.familyTree)?.title}
          </Link>
        )}
        {e.dynasty && (
          <Link to={`/dynasties/${e.dynasty}`} className="btn-ghost !px-4 !py-2 !text-xs">
            {dynastyById.get(e.dynasty)?.name}
          </Link>
        )}
        {e.locations?.map((l) => (
          <Link key={l} to={`/map/${l}`} className="btn-ghost !px-4 !py-2 !text-xs">
            📍 {locationById.get(l)?.name}
          </Link>
        ))}
      </div>
      <SourceList refs={e.sources} title="Source traditions" />
    </div>
  );
}
