import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { lessonById, lessons, quizById, storyById } from '../data';
import { Breadcrumbs, CharacterChip, ProgressBar, SourceList, VariationBox } from '../components/ui';
import { Prose } from '../components/ui/RichText';
import RelGraph from '../components/graph/RelGraph';
import Quiz from '../components/quiz/Quiz';
import { useProgress } from '../store/progress';
import { useSettings } from '../store/settings';
import { Icon } from '../components/ui/Icon';
import NotFound from './NotFound';

export default function LessonPage() {
  const { lessonId = '' } = useParams();
  const l = lessonById.get(lessonId);
  const visit = useProgress((s) => s.visit);
  const setSection = useProgress((s) => s.setLessonSection);
  const complete = useProgress((s) => s.completeLesson);
  const done = useProgress((s) => s.completedLessons.includes(lessonId));
  const furthest = useProgress((s) => s.lessonSection[lessonId] ?? 0);
  const mode = useSettings((s) => s.readingMode);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (l) visit('lesson', l.id);
  }, [l, visit]);

  useEffect(() => {
    if (!l) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setSection(l.id, Number((e.target as HTMLElement).dataset.idx));
      },
      { rootMargin: '-40% 0px -50% 0px' },
    );
    refs.current.forEach((r) => r && obs.observe(r));
    return () => obs.disconnect();
  }, [l, setSection]);

  if (!l) return <NotFound />;
  const idx = lessons.indexOf(l);
  const next = lessons[idx + 1];
  const prev = lessons[idx - 1];
  const quiz = quizById.get(l.quizId);
  const proseCls = mode === 'compact' ? 'text-[15px]' : mode === 'focus' ? 'text-[19px]' : 'text-[17px]';

  return (
    <div className="mx-auto max-w-3xl">
      {mode !== 'focus' && <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Learning Path', to: '/learn' }, { label: `Lesson ${l.order}` }]} />}
      <div className="sticky top-0 z-20 -mx-2 mb-6 bg-night/85 px-2 py-2 backdrop-blur">
        <ProgressBar value={done ? 1 : furthest / Math.max(1, l.sections.length - 1)} />
      </div>
      <div className="eyebrow mb-2">
        Module {l.module} · Lesson {l.order} · {l.minutes} min
      </div>
      <h1 className="font-serif text-5xl font-semibold leading-tight">{l.title}</h1>
      <div className="mt-2 text-xl text-gold/80">{l.subtitle}</div>
      {mode === 'focus' && (
        <Link to="/learn" className="chip mt-3">
          ← Learning path
        </Link>
      )}
      <div className="divider my-6" />
      <p className={`mb-8 leading-relaxed text-parchment/90 ${proseCls}`}>{l.intro}</p>

      <div className="card mb-10 p-5">
        <div className="eyebrow mb-2">In this lesson</div>
        <ol className="grid gap-1 text-sm sm:grid-cols-2">
          {l.sections.map((s, i) => (
            <li key={i}>
              <a href={`#s${i}`} className={`hover:text-gold ${i <= furthest ? 'text-parchment/85' : 'text-muted'}`}>
                {s.heading}
              </a>
            </li>
          ))}
        </ol>
      </div>

      {l.sections.map((s, i) => (
        <section key={i} id={`s${i}`} data-idx={i} ref={(el) => (refs.current[i] = el)} className="mb-12 scroll-mt-28">
          <h2 className="mb-4 font-serif text-3xl">{s.heading}</h2>
          <Prose paragraphs={s.body} className={proseCls} />
          {s.aside && <div className="mt-2 rounded-xl border border-lapis/30 bg-lapis/5 p-4 text-sm text-parchment/80">💡 {s.aside}</div>}
          {s.graph && (
            <div className="mt-5">
              <div className="mb-2 text-xs text-muted">Relationship map — click a connection to learn why</div>
              <RelGraph focus={s.graph} includeNeighbors={false} height="380px" />
            </div>
          )}
        </section>
      ))}

      {l.variations?.map((v) => (
        <div key={v.title} className="mb-8">
          <VariationBox v={v} />
        </div>
      ))}

      <section className="mb-10">
        <h2 className="mb-3 font-serif text-3xl">Characters introduced</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {l.characters.map((c) => (
            <CharacterChip key={c} id={c} />
          ))}
        </div>
      </section>

      <section className="card mb-10 p-6">
        <h2 className="mb-3 font-serif text-3xl">Recap</h2>
        <ul className="space-y-2">
          {l.recap.map((r) => (
            <li key={r} className="flex gap-3 text-parchment/85">
              <span className="text-gold">✦</span>
              {r}
            </li>
          ))}
        </ul>
        {l.stories && (
          <div className="mt-5">
            <div className="eyebrow mb-2 !text-[10px]">Read the full stories</div>
            <div className="flex flex-wrap gap-2">
              {l.stories.map((s) => (
                <Link key={s} to={`/stories/${s}`} className="chip hover:border-gold/60">
                  {storyById.get(s)?.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="mb-10">
        <SourceList refs={l.sources} />
      </section>

      {quiz && (
        <section className="mb-10">
          <h2 className="mb-1 font-serif text-3xl">Knowledge check</h2>
          <p className="mb-4 text-sm text-muted">Attempt all five questions first — the answers appear separately once you submit.</p>
          <Quiz quiz={quiz} />
        </section>
      )}

      <div className="card flex flex-wrap items-center justify-between gap-3 p-5">
        <button onClick={() => complete(l.id)} disabled={done} className={done ? 'btn-ghost !border-jade/50 !text-jade' : 'btn-primary'}>
          <Icon name="check" className="h-4 w-4" /> {done ? 'Lesson complete' : 'Mark lesson complete'}
        </button>
        <div className="flex gap-2">
          {prev && (
            <Link to={`/learn/${prev.id}`} className="btn-ghost">
              ← {prev.title.split(' ').slice(0, 3).join(' ')}…
            </Link>
          )}
          {next && (
            <Link to={`/learn/${next.id}`} onClick={() => complete(l.id)} className="btn-ghost">
              Next lesson →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
