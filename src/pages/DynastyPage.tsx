import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { dynastyById, characterById, characters, events, familyTreeById } from '../data';
import { BookmarkButton, Breadcrumbs, CharacterChip, PageHeader, Section, SourceList } from '../components/ui';
import FamilyTree from '../components/graph/FamilyTree';
import { Emblem } from '../components/ui/Emblem';
import { useProgress } from '../store/progress';
import NotFound from './NotFound';

export default function DynastyPage() {
  const { id = '' } = useParams();
  const d = dynastyById.get(id);
  const visit = useProgress((s) => s.visit);
  useEffect(() => {
    if (d) visit('dynasty', d.id);
  }, [d, visit]);
  if (!d) return <NotFound />;
  const tree = familyTreeById.get(d.familyTree)!;
  const members = characters.filter((c) => c.dynasty === d.id);
  const evs = events.filter((e) => e.dynasty === d.id).sort((a, b) => a.order - b.order);
  return (
    <div>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Dynasties', to: '/dynasties' }, { label: d.name }]} />
      <PageHeader eyebrow={d.sanskritName} title={d.name} subtitle={d.description} actions={<BookmarkButton type="dynasty" id={d.id} />} />
      <Section title="The principal line" eyebrow="Abridged">
        <div className="flex flex-wrap items-center gap-2">
          {d.line.map((x, i) => {
            const c = characterById.get(x)!;
            return (
              <span key={x} className="flex items-center gap-2">
                {i > 0 && <span className="text-gold/50">→</span>}
                <Link to={`/characters/${x}`} className="card card-hover flex items-center gap-2 py-1.5 pl-1.5 pr-3">
                  <Emblem name={c.name} category={c.category} size={32} />
                  <span className="text-sm">{c.name}</span>
                </Link>
              </span>
            );
          })}
        </div>
        <p className="mt-3 text-sm text-muted">{d.origin}</p>
      </Section>
      <Section title="Family tree">
        <FamilyTree tree={tree} />
        <Link to={`/family-tree/${tree.id}`} className="mt-2 inline-block text-sm text-gold hover:text-saffron">
          Open full-screen tree →
        </Link>
      </Section>
      <Section title="Notes on the genealogy">
        <ul className="max-w-3xl space-y-2">
          {d.notes.map((n) => (
            <li key={n} className="flex gap-2 text-parchment/85">
              <span className="text-gold">✦</span>
              {n}
            </li>
          ))}
        </ul>
      </Section>
      {evs.length > 0 && (
        <Section title="Events">
          <div className="grid gap-2 md:grid-cols-2">
            {evs.map((e) => (
              <Link key={e.id} to={`/events/${e.id}`} className="card card-hover p-4">
                <div className="font-serif text-lg">{e.title}</div>
                <div className="text-xs text-muted">{e.summary}</div>
              </Link>
            ))}
          </div>
        </Section>
      )}
      <Section title="Members">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((c) => (
            <CharacterChip key={c.id} id={c.id} />
          ))}
        </div>
      </Section>
      <SourceList refs={d.sources} />
    </div>
  );
}
