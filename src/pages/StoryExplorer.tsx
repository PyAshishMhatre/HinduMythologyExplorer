import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { stories, eraById } from '../data';
import { PageHeader, ProgressBar } from '../components/ui';
import { useProgress } from '../store/progress';

const CATS: { id: string; label: string; match: (c: string) => boolean }[] = [
  { id: 'all', label: 'All stories', match: () => true },
  { id: 'puranic', label: 'Puranic & cosmic', match: (c) => !['ramayana', 'mahabharata'].includes(c) },
  { id: 'ramayana', label: 'Ramayana', match: (c) => c === 'ramayana' },
  { id: 'mahabharata', label: 'Mahabharata', match: (c) => c === 'mahabharata' },
  { id: 'avatar', label: 'Avatars', match: (c) => c === 'avatar' },
  { id: 'creation', label: 'Creation', match: (c) => c === 'creation' },
  { id: 'divine-conflict', label: 'Divine conflicts', match: (c) => c === 'divine-conflict' || c === 'deva-asura' },
  { id: 'dynastic', label: 'Dynastic & sages', match: (c) => c === 'dynastic' || c === 'sage' },
];

export default function StoryExplorer() {
  const [params, setParams] = useSearchParams();
  const cat = params.get('cat') ?? 'all';
  const progress = useProgress((s) => s.storyChapter);
  const done = useProgress((s) => s.completedStories);
  const list = useMemo(() => stories.filter((s) => (CATS.find((c) => c.id === cat) ?? CATS[0]).match(s.category)), [cat]);

  return (
    <div>
      <PageHeader eyebrow="Story mode" title="Stories" subtitle="Chapter-by-chapter narratives with embedded character links, sources and the different versions told by different traditions." />
      <div className="mb-6 flex flex-wrap gap-1.5">
        {CATS.map((c) => (
          <button key={c.id} onClick={() => setParams(c.id === 'all' ? {} : { cat: c.id }, { replace: true })} className={`chip !py-1.5 ${cat === c.id ? 'chip-active' : ''}`}>
            {c.label}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.map((s) => {
          const era = eraById.get(s.era)!;
          const p = progress[s.id];
          const isDone = done.includes(s.id);
          return (
            <Link key={s.id} to={`/stories/${s.id}`} className="card card-hover group flex flex-col p-5" style={{ borderTop: `2px solid ${era.color}` }}>
              <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-muted">
                <span style={{ color: era.color }}>{era.name}</span>
                {isDone && <span className="text-jade">✓ Read</span>}
              </div>
              <div className="mt-1 font-serif text-2xl leading-tight group-hover:text-gold">{s.title}</div>
              <div className="text-sm text-gold/70">{s.subtitle}</div>
              <p className="mt-2 line-clamp-3 flex-1 text-sm text-parchment/70">{s.introduction}</p>
              <div className="mt-4 flex items-center gap-3 text-xs text-muted">
                <span>{s.chapters.length} chapters</span>
                <span>· {s.readingMinutes} min</span>
                {s.variations?.length ? <span>· {s.variations.length} version note{s.variations.length > 1 ? 's' : ''}</span> : null}
              </div>
              {p !== undefined && !isDone && <ProgressBar value={(p + 1) / s.chapters.length} className="mt-3" />}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
