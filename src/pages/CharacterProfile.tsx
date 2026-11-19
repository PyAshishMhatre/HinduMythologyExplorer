import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { characterById, dynastyById, events, familyTrees, locationById, stories, eraById } from '../data';
import { childrenOf, edgeLabel, otherRelations, parentsOf, siblingsOf, spousesOf, type Edge } from '../lib/graph';
import { BookmarkButton, Breadcrumbs, CharacterChip, Section, SourceList, VariationBox, ConfidenceBadge } from '../components/ui';
import { Emblem, CATEGORY_LABEL } from '../components/ui/Emblem';
import { Prose } from '../components/ui/RichText';
import RelGraph from '../components/graph/RelGraph';
import { useProgress } from '../store/progress';
import NotFound from './NotFound';
import { isFemale } from '../lib/questionParser';

const PRIORITY = ['parent', 'legal-parent', 'ancestor-of', 'mind-born', 'divine-parent', 'niyoga-parent', 'adoptive-parent'];

function lineageCrumbs(id: string) {
  const chain: string[] = [];
  let cur = id;
  for (let i = 0; i < 6; i++) {
    const dyn = characterById.get(cur)?.dynasty;
    const score = (e: Edge) =>
      (dyn && characterById.get(e.to)?.dynasty === dyn ? 0 : 10) + (isFemale(e.to) ? 5 : 0) + (parentsOf(e.to).length ? 0 : 3) + PRIORITY.indexOf(e.rel.type) * 0.1;
    const ps = parentsOf(cur).sort((a, b) => score(a) - score(b));
    const next = ps[0];
    if (!next || chain.includes(next.to)) break;
    chain.unshift(next.to);
    cur = next.to;
  }
  return chain;
}

function RelGroup({ title, edges }: { title: string; edges: Edge[] }) {
  if (!edges.length) return null;
  const uniq = edges.filter((e, i) => edges.findIndex((x) => x.to === e.to && x.rel.type === e.rel.type) === i);
  return (
    <div>
      <div className="eyebrow mb-2 !text-[10px]">{title}</div>
      <div className="grid gap-2 sm:grid-cols-2">
        {uniq.map((e) => (
          <div key={e.rel.id + e.to} title={e.rel.explanation}>
            <CharacterChip id={e.to} note={edgeLabel(e)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CharacterProfile() {
  const { id = '' } = useParams();
  const c = characterById.get(id);
  const visit = useProgress((s) => s.visit);
  useEffect(() => {
    if (c) visit('character', c.id);
  }, [c, visit]);

  const data = useMemo(() => {
    if (!c) return null;
    const ps = parentsOf(id);
    return {
      parents: ps.filter((e) => e.rel.type !== 'ancestor-of'),
      ancestors: ps.filter((e) => e.rel.type === 'ancestor-of'),
      spouses: spousesOf(id),
      children: childrenOf(id).filter((e) => e.rel.type !== 'ancestor-of'),
      descendants: childrenOf(id).filter((e) => e.rel.type === 'ancestor-of'),
      siblings: siblingsOf(id),
      other: otherRelations(id),
      stories: stories.filter((s) => s.characters.includes(id)),
      events: events.filter((e) => e.characters.includes(id)).sort((a, b) => a.order - b.order),
      trees: familyTrees.filter((t) => t.members.includes(id)),
      crumbs: lineageCrumbs(id),
    };
  }, [c, id]);

  if (!c || !data) return <NotFound />;
  const dyn = c.dynasty ? dynastyById.get(c.dynasty) : null;

  const nav = [
    ['identity', 'Identity'], ['family', 'Family'], ['biography', 'Biography'], ['stories', 'Stories'], ['timeline', 'Timeline'],
    ['connections', 'Connections'], ['significance', 'Significance'], ['sources', 'Sources & versions'],
  ];

  return (
    <article>
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          ...(dyn ? [{ label: dyn.name, to: `/dynasties/${dyn.id}` }] : [{ label: 'Characters', to: '/characters' }]),
          ...data.crumbs.slice(-4).map((x) => ({ label: characterById.get(x)!.name, to: `/characters/${x}` })),
          { label: c.name },
        ]}
      />

      {/* Identity */}
      <header id="identity" className="card relative mb-6 overflow-hidden p-6 md:p-8">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center">
          <Emblem name={c.name} category={c.category} size={128} />
          <div className="min-w-0 flex-1">
            <div className="eyebrow mb-1">
              {CATEGORY_LABEL[c.category]} · {c.primaryTradition}
            </div>
            <h1 className="font-serif text-5xl font-semibold leading-none">
              {c.name} {c.sanskritName && <span className="ml-2 align-middle text-2xl font-normal text-gold/80">{c.sanskritName}</span>}
            </h1>
            <div className="mt-2 text-lg text-parchment/80">{c.title}</div>
            {c.alternateNames && <div className="mt-2 text-sm text-muted">Also known as: {c.alternateNames.join(' · ')}</div>}
            <p className="mt-4 max-w-3xl leading-relaxed text-parchment/85">{c.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <BookmarkButton type="character" id={c.id} />
              <Link to={`/relationships/${c.id}`} className="btn-ghost">
                Relationship map
              </Link>
              {data.trees[0] && (
                <Link to={`/family-tree/${data.trees[0].id}?focus=${c.id}`} className="btn-ghost">
                  View in family tree
                </Link>
              )}
              <Link to={`/compare/${c.id}-vs-${c.id === 'rama' ? 'krishna' : 'rama'}`} className="btn-ghost">
                Compare
              </Link>
            </div>
            {c.abridgedLineage && <div className="mt-3 text-xs text-saffron/80">Note: this character's genealogy is abridged; Puranic lists vary in the intermediate generations.</div>}
          </div>
        </div>
      </header>

      <nav className="sticky top-0 z-20 -mx-2 mb-8 flex gap-1 overflow-x-auto border-b border-gold/10 bg-night/95 px-2 py-2 backdrop-blur">
        {nav.map(([k, l]) => (
          <a key={k} href={`#${k}`} className="whitespace-nowrap rounded-full px-3 py-1 text-xs text-parchment/70 hover:bg-gold/10 hover:text-parchment">
            {l}
          </a>
        ))}
      </nav>

      <Section id="family" eyebrow="Origins & ancestry" title="Family and lineage">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-5">
            <RelGroup title="Parents" edges={data.parents} />
            <RelGroup title="Ancestors (generations abridged)" edges={data.ancestors} />
            <RelGroup title="Spouses" edges={data.spouses} />
            <RelGroup title="Siblings" edges={data.siblings} />
            <RelGroup title="Children" edges={data.children} />
            <RelGroup title="Descendants (abridged)" edges={data.descendants} />
            {dyn && (
              <div>
                <div className="eyebrow mb-1 !text-[10px]">Dynasty</div>
                <Link to={`/dynasties/${dyn.id}`} className="text-gold hover:text-saffron">
                  {dyn.name} ({dyn.sanskritName})
                </Link>
              </div>
            )}
            {!data.parents.length && !data.spouses.length && !data.children.length && !data.siblings.length && (
              <p className="text-sm text-muted">No family relationships are recorded for this figure — divine and cosmic beings are often described through emanation or manifestation rather than birth.</p>
            )}
          </div>
          <RelGraph focus={[c.id]} height="420px" types={['parent', 'divine-parent', 'adoptive-parent', 'niyoga-parent', 'legal-parent', 'mind-born', 'ancestor-of', 'spouse', 'sibling', 'half-sibling']} />
        </div>
      </Section>

      <Section id="biography" eyebrow="Biography" title={`The story of ${c.name}`}>
        <div className="max-w-3xl">
          {c.birthStory && <Prose paragraphs={[c.birthStory]} />}
          <Prose paragraphs={c.biography} />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {c.powers && (
              <div className="card p-4">
                <div className="eyebrow mb-2 !text-[10px]">Powers & abilities</div>
                <ul className="list-inside list-disc space-y-1 text-sm text-parchment/80">{c.powers.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            )}
            {c.personality && (
              <div className="card p-4">
                <div className="eyebrow mb-2 !text-[10px]">Character</div>
                <ul className="list-inside list-disc space-y-1 text-sm text-parchment/80">{c.personality.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            )}
          </div>
          {c.deathOrFate && (
            <div className="card mt-4 p-4">
              <div className="eyebrow mb-1 !text-[10px]">Death or fate</div>
              <p className="text-sm text-parchment/85">{c.deathOrFate}</p>
            </div>
          )}
          {c.associatedLocations && (
            <div className="mt-4 flex flex-wrap gap-2">
              {c.associatedLocations.map((l) => (
                <Link key={l} to={`/map/${l}`} className="chip hover:border-gold/60">
                  📍 {locationById.get(l)?.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </Section>

      <Section id="stories" eyebrow="Major stories" title="Stories featuring this character">
        {data.stories.length ? (
          <div className="grid gap-3 md:grid-cols-2">
            {data.stories.map((s) => (
              <Link key={s.id} to={`/stories/${s.id}`} className="card card-hover p-4">
                <div className="font-serif text-xl">{s.title}</div>
                <div className="text-xs text-muted">
                  {s.chapters.length} chapters · {s.readingMinutes} min
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-parchment/70">{s.subtitle}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">No full story for this character yet — see the events below. (Planned for a future content update.)</p>
        )}
      </Section>

      <Section id="timeline" eyebrow="Narrative order" title="Timeline">
        {data.events.length ? (
          <ol className="relative space-y-3 border-l border-gold/25 pl-6">
            {data.events.map((e) => (
              <li key={e.id} className="relative">
                <span className="absolute -left-[29px] top-2 h-2.5 w-2.5 rounded-full" style={{ background: eraById.get(e.era)?.color }} />
                <Link to={`/events/${e.id}`} className="group block">
                  <div className="text-[11px] text-muted">{eraById.get(e.era)?.name}</div>
                  <div className="font-serif text-lg group-hover:text-gold">{e.title}</div>
                  <div className="text-sm text-parchment/70">{e.summary}</div>
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-sm text-muted">No timeline events recorded yet.</p>
        )}
        <Link to={`/timeline/master?character=${c.id}`} className="mt-4 inline-block text-sm text-gold hover:text-saffron">
          Open character timeline view →
        </Link>
      </Section>

      <Section id="connections" eyebrow="Teachers, allies, enemies, curses & boons" title="Other connections">
        {data.other.length ? (
          <ul className="grid gap-2 md:grid-cols-2">
            {data.other.map((e) => (
              <li key={e.rel.id + e.dir} className="card p-3.5">
                <div className="flex items-center justify-between gap-2">
                  <Link to={`/characters/${e.to}`} className="font-medium text-parchment hover:text-gold">
                    {characterById.get(e.to)?.name}
                  </Link>
                  <span className="text-[11px] uppercase tracking-wider text-gold/80">{edgeLabel(e)}</span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-parchment/70">{e.rel.explanation}</p>
                <div className="mt-1.5">
                  <ConfidenceBadge c={e.rel.confidence} />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted">No other connections recorded.</p>
        )}
      </Section>

      {c.significance && (
        <Section id="significance" eyebrow="Philosophy & culture" title="Significance">
          <ul className="max-w-3xl space-y-2">
            {c.significance.map((s) => (
              <li key={s} className="flex gap-3 text-parchment/85">
                <span className="text-gold">✦</span>
                {s}
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section id="sources" eyebrow="Textual traditions" title="Sources and variations">
        <div className="space-y-4">
          {c.variations?.map((v) => <VariationBox key={v.title} v={v} />)}
          <SourceList refs={c.sources} />
        </div>
      </Section>
    </article>
  );
}
