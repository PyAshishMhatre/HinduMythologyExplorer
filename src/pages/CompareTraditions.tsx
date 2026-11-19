import { Link, useParams } from 'react-router-dom';
import { characters, lessons, stories, sourceById, sources } from '../data';
import type { Variation } from '../data/types';
import { PageHeader } from '../components/ui';

interface Item {
  v: Variation;
  from: { label: string; to: string };
}

const ALL: Item[] = [
  ...stories.flatMap((s) => (s.variations ?? []).map((v) => ({ v, from: { label: s.title, to: `/stories/${s.id}` } }))),
  ...characters.flatMap((c) => (c.variations ?? []).map((v) => ({ v, from: { label: c.name, to: `/characters/${c.id}` } }))),
  ...lessons.flatMap((l) => (l.variations ?? []).map((v) => ({ v, from: { label: l.title, to: `/learn/${l.id}` } }))),
];

export default function CompareTraditions() {
  const { id } = useParams();
  const story = id ? stories.find((s) => s.id === id) : null;
  const items = story ? ALL.filter((i) => i.from.to === `/stories/${story.id}`) : ALL;
  const textual = sources.filter((s) => ['Itihasa', 'Later', 'Regional'].includes(s.category));

  return (
    <div>
      <PageHeader
        eyebrow="Compare traditions"
        title={story ? `Versions of “${story.title}”` : 'Different Traditions and Versions'}
        subtitle="Hindu mythology is not one book. Here the primary account and an alternative are set side by side, with the meaningful difference, what they share, and why it matters. No version is labelled universally correct."
      />
      {story && (
        <Link to="/compare-traditions" className="mb-4 inline-block text-sm text-gold hover:text-saffron">
          ← All comparisons
        </Link>
      )}
      <div className="space-y-6">
        {items.map(({ v, from }, i) => (
          <div key={i} className="card overflow-hidden">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-gold/10 px-5 py-3">
              <h2 className="font-serif text-2xl">{v.title}</h2>
              <Link to={from.to} className="text-xs text-gold hover:text-saffron">
                from {from.label} →
              </Link>
            </div>
            <div className="grid md:grid-cols-2">
              <div className="border-gold/10 p-5 md:border-r">
                <div className="mb-2 inline-block rounded-full border border-jade/40 px-2.5 py-0.5 text-xs text-jade">{v.primary.tradition}</div>
                <p className="leading-relaxed text-parchment/85">{v.primary.account}</p>
              </div>
              <div className="p-5">
                <div className="mb-2 inline-block rounded-full border border-saffron/40 px-2.5 py-0.5 text-xs text-saffron">{v.alternate.tradition}</div>
                <p className="leading-relaxed text-parchment/85">{v.alternate.account}</p>
              </div>
            </div>
            <div className="grid gap-4 border-t border-gold/10 bg-gold/[0.03] px-5 py-4 text-sm md:grid-cols-3">
              <div>
                <div className="eyebrow mb-1 !text-[10px]">The difference</div>
                {v.difference}
              </div>
              <div>
                <div className="eyebrow mb-1 !text-[10px]">Shared narrative</div>
                {v.shared ?? '—'}
              </div>
              <div>
                <div className="eyebrow mb-1 !text-[10px]">Why it matters</div>
                {v.whyItMatters ?? '—'}
              </div>
            </div>
          </div>
        ))}
      </div>
      {!story && (
        <section className="mt-12">
          <h2 className="mb-3 font-serif text-3xl">The textual landscape</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {textual.map((s) => (
              <div key={s.id} className="card p-4">
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-xl">{s.textName}</span>
                  <span className="text-xs text-muted">{s.category}{s.tradition ? ` · ${s.tradition}` : ''}</span>
                </div>
                <p className="mt-1 text-sm text-parchment/75">{sourceById.get(s.id)?.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
