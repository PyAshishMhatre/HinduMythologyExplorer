import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { storyById, quizById, eraById, glossaryById, familyTreeById, eventById } from '../data';
import { BookmarkButton, Breadcrumbs, CharacterChip, ProgressBar, SourceList, VariationBox } from '../components/ui';
import { Prose } from '../components/ui/RichText';
import Quiz from '../components/quiz/Quiz';
import { Icon } from '../components/ui/Icon';
import { useProgress } from '../store/progress';
import { useSettings, type ReadingMode } from '../store/settings';
import NotFound from './NotFound';

function ReadingModeSwitch() {
  const mode = useSettings((s) => s.readingMode);
  const set = useSettings((s) => s.set);
  const modes: { id: ReadingMode; label: string }[] = [
    { id: 'standard', label: 'Standard' },
    { id: 'focus', label: 'Distraction-free' },
    { id: 'compact', label: 'Compact' },
  ];
  return (
    <div className="flex rounded-full border border-gold/15 bg-ink/40 p-0.5 text-xs">
      {modes.map((m) => (
        <button key={m.id} onClick={() => set({ readingMode: m.id })} className={`rounded-full px-3 py-1 ${mode === m.id ? 'bg-gold/20 text-parchment' : 'text-muted hover:text-parchment'}`}>
          {m.label}
        </button>
      ))}
    </div>
  );
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = document.getElementById('main-scroll');
    if (!el) return;
    const on = () => setP(el.scrollHeight <= el.clientHeight ? 1 : el.scrollTop / (el.scrollHeight - el.clientHeight));
    on();
    el.addEventListener('scroll', on, { passive: true });
    return () => el.removeEventListener('scroll', on);
  });
  return p;
}

export default function StoryReader() {
  const { id = '', chapter } = useParams();
  const story = storyById.get(id);
  const nav = useNavigate();
  const visit = useProgress((s) => s.visit);
  const setStoryChapter = useProgress((s) => s.setStoryChapter);
  const mode = useSettings((s) => s.readingMode);
  const scroll = useScrollProgress();

  const n = chapter ? parseInt(chapter, 10) : 0; // 0 = overview, 1..N = chapters, N+1 = conclusion
  useEffect(() => {
    if (story) visit('story', story.id);
  }, [story, visit]);
  useEffect(() => {
    if (story && n >= 1 && n <= story.chapters.length) setStoryChapter(story.id, n - 1, story.chapters.length);
  }, [story, n, setStoryChapter]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!story || (e.target as HTMLElement)?.tagName === 'INPUT') return;
      if (e.key === 'ArrowRight' && n <= story.chapters.length) nav(`/stories/${story.id}/${n + 1}`);
      if (e.key === 'ArrowLeft' && n > 0) nav(n === 1 ? `/stories/${story.id}` : `/stories/${story.id}/${n - 1}`);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [story, n, nav]);

  if (!story || Number.isNaN(n) || n < 0 || n > story.chapters.length + 1) return <NotFound />;
  const era = eraById.get(story.era)!;
  const total = story.chapters.length;
  const ch = n >= 1 && n <= total ? story.chapters[n - 1] : null;
  const quiz = story.quizId ? quizById.get(story.quizId) : null;
  const compact = mode === 'compact';
  const proseCls = compact ? 'text-[15px] [&_p]:!mb-2.5 [&_p]:!leading-relaxed' : mode === 'focus' ? 'text-[19px]' : 'text-[17px]';
  const overall = n === 0 ? 0 : n > total ? 1 : (n - 1 + scroll) / total;

  return (
    <div className={mode === 'focus' ? 'mx-auto max-w-3xl' : ''}>
      <div className="fixed left-0 right-0 top-0 z-30 h-0.5">
        <div className="h-full bg-gradient-to-r from-gold to-saffron transition-all" style={{ width: `${overall * 100}%` }} />
      </div>
      {mode !== 'focus' && (
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Stories', to: '/stories' }, { label: story.title, to: n ? `/stories/${story.id}` : undefined }, ...(ch ? [{ label: `Chapter ${n}` }] : n > total ? [{ label: 'Conclusion' }] : [])]} />
      )}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs">
          {mode === 'focus' && (
            <Link to="/stories" className="chip">
              ← Stories
            </Link>
          )}
          <span className="rounded-full px-2.5 py-0.5 font-medium text-ink" style={{ background: era.color }}>
            {era.name}
          </span>
          <span className="text-muted">{story.readingMinutes} min read</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ReadingModeSwitch />
          <BookmarkButton type="story" id={story.id} />
        </div>
      </div>

      <div className={`grid gap-8 ${mode === 'standard' ? 'lg:grid-cols-[1fr_260px]' : ''}`}>
        <div className="min-w-0">
          {n === 0 && (
            <>
              <h1 className="font-serif text-5xl font-semibold leading-tight">{story.title}</h1>
              {story.subtitle && <div className="mt-2 text-xl text-gold/80">{story.subtitle}</div>}
              <div className="divider my-6" />
              <Prose paragraphs={[story.introduction]} className={proseCls} />
              <div className="my-8">
                <div className="eyebrow mb-3">Chapters</div>
                <ol className="space-y-2">
                  {story.chapters.map((c, i) => (
                    <li key={c.id}>
                      <Link to={`/stories/${story.id}/${i + 1}`} className="card card-hover flex items-center gap-4 px-4 py-3">
                        <span className="font-serif text-2xl text-gold/70">{i + 1}</span>
                        <span className="font-serif text-lg">{c.title}</span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link to={`/stories/${story.id}/${total + 1}`} className="card card-hover flex items-center gap-4 px-4 py-3">
                      <span className="font-serif text-2xl text-gold/70">✦</span>
                      <span className="font-serif text-lg">Meaning, versions, sources {quiz ? '& knowledge check' : ''}</span>
                    </Link>
                  </li>
                </ol>
              </div>
              <Link to={`/stories/${story.id}/1`} className="btn-primary">
                Begin reading <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            </>
          )}

          {ch && (
            <>
              <div className="eyebrow mb-2">
                Chapter {n} of {total}
              </div>
              <h1 className={`font-serif font-semibold leading-tight ${compact ? 'text-3xl' : 'text-4xl md:text-5xl'}`}>{ch.title}</h1>
              <div className="divider my-6" />
              <Prose paragraphs={ch.narrative} className={proseCls} />
              {(ch.concepts?.length || ch.events?.length) && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {ch.concepts?.map((t) => (
                    <Link key={t} to={`/glossary/${t}`} className="chip hover:border-gold/60">
                      📖 {glossaryById.get(t)?.term}
                    </Link>
                  ))}
                  {ch.events?.map((e) => (
                    <Link key={e} to={`/events/${e}`} className="chip hover:border-gold/60">
                      ◷ {eventById.get(e)?.title}
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}

          {n > total && (
            <>
              <div className="eyebrow mb-2">After the story</div>
              <h1 className="font-serif text-4xl font-semibold">Meaning and memory</h1>
              <div className="divider my-6" />
              {story.consequences && (
                <section className="mb-8">
                  <h2 className="mb-3 font-serif text-2xl">Consequences</h2>
                  <ul className="space-y-1.5">
                    {story.consequences.map((c) => (
                      <li key={c} className="flex gap-2 text-parchment/85">
                        <span className="text-gold">→</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              {story.whyItMatters && (
                <section className="mb-8">
                  <h2 className="mb-2 font-serif text-2xl">Why the story matters</h2>
                  <p className="leading-relaxed text-parchment/85">{story.whyItMatters}</p>
                </section>
              )}
              {story.philosophicalMeaning && (
                <section className="mb-8">
                  <h2 className="mb-2 font-serif text-2xl">Philosophical meaning</h2>
                  <p className="leading-relaxed text-parchment/85">{story.philosophicalMeaning}</p>
                </section>
              )}
              {story.variations && story.variations.length > 0 && (
                <section className="mb-8 space-y-4">
                  <div className="flex items-baseline justify-between">
                    <h2 className="font-serif text-2xl">Different traditions and versions</h2>
                    <Link to={`/compare-traditions/${story.id}`} className="text-sm text-gold hover:text-saffron">
                      Compare side by side →
                    </Link>
                  </div>
                  {story.variations.map((v) => (
                    <VariationBox key={v.title} v={v} />
                  ))}
                </section>
              )}
              <section className="mb-8">
                <SourceList refs={story.sources} />
              </section>
              {quiz && (
                <section className="mb-8">
                  <h2 className="mb-1 font-serif text-2xl">Knowledge check</h2>
                  <p className="mb-4 text-sm text-muted">Five questions. Answers and explanations appear separately after you submit.</p>
                  <Quiz quiz={quiz} />
                </section>
              )}
              {story.relatedStories && (
                <section>
                  <h2 className="mb-3 font-serif text-2xl">Continue exploring</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {story.relatedStories.map((r) => (
                      <Link key={r} to={`/stories/${r}`} className="card card-hover p-4">
                        <div className="font-serif text-lg">{storyById.get(r)?.title}</div>
                        <div className="text-xs text-muted">{storyById.get(r)?.subtitle}</div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

          {n > 0 && (
            <div className="mt-12 flex items-center justify-between gap-3 border-t border-gold/10 pt-6">
              <Link to={n === 1 ? `/stories/${story.id}` : `/stories/${story.id}/${n - 1}`} className="btn-ghost">
                <Icon name="chevronLeft" className="h-4 w-4" /> {n === 1 ? 'Overview' : 'Previous chapter'}
              </Link>
              <span className="hidden text-xs text-muted sm:block">← → arrow keys</span>
              {n <= total && (
                <Link to={`/stories/${story.id}/${n + 1}`} className="btn-primary">
                  {n === total ? 'Conclusion & quiz' : 'Next chapter'} <Icon name="chevronRight" className="h-4 w-4" />
                </Link>
              )}
            </div>
          )}
        </div>

        {mode === 'standard' && (
          <aside className="space-y-5 lg:sticky lg:top-4 lg:self-start">
            <div className="card p-4">
              <div className="eyebrow mb-2 !text-[10px]">Progress</div>
              <ProgressBar value={overall} />
              <ol className="mt-3 space-y-0.5 text-sm">
                {story.chapters.map((c, i) => (
                  <li key={c.id}>
                    <Link to={`/stories/${story.id}/${i + 1}`} className={`block truncate rounded px-2 py-1 ${n === i + 1 ? 'bg-gold/15 text-parchment' : 'text-parchment/60 hover:text-parchment'}`}>
                      {i + 1}. {c.title}
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <div className="eyebrow mb-2 !text-[10px]">Characters</div>
              <div className="space-y-2">
                {story.characters.slice(0, 8).map((c) => (
                  <CharacterChip key={c} id={c} />
                ))}
              </div>
            </div>
            {story.familyTree && (
              <Link to={`/family-tree/${story.familyTree}`} className="card card-hover block p-4 text-sm">
                <Icon name="tree" className="mb-1 h-4 w-4 text-gold" />
                {familyTreeById.get(story.familyTree)?.title}
              </Link>
            )}
          </aside>
        )}
      </div>
    </div>
  );
}
