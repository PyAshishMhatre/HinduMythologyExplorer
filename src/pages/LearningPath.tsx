import { Link } from 'react-router-dom';
import { lessons, quizById } from '../data';
import { PageHeader, ProgressBar } from '../components/ui';
import { useProgress } from '../store/progress';

const MODULES = ['Cosmology & Origins', 'Ancient Sages & Lineages', 'The Ramayana Universe', 'The Mahabharata Universe', 'Puranic Stories & Avatars', 'Philosophy & Cross-Epic Connections'];

export default function LearningPath() {
  const done = useProgress((s) => s.completedLessons);
  const sections = useProgress((s) => s.lessonSection);
  const quiz = useProgress((s) => s.quizResults);
  const nextId = lessons.find((l) => !done.includes(l.id))?.id;
  return (
    <div>
      <PageHeader
        eyebrow="Structured curriculum"
        title="Learning Path"
        subtitle="Six modules from the origins of creation to the great epics and their philosophy. Each lesson takes about 15–25 minutes and ends with five knowledge-check questions. You can explore freely — your place on the path is saved."
      >
        <div className="mt-5 max-w-md">
          <div className="mb-1 flex justify-between text-xs text-muted">
            <span>Overall</span>
            <span>
              {done.length}/{lessons.length} complete
            </span>
          </div>
          <ProgressBar value={done.length / lessons.length} />
        </div>
      </PageHeader>
      <ol className="relative space-y-5 border-l border-gold/25 pl-8">
        {lessons.map((l, i) => {
          const isDone = done.includes(l.id);
          const isNext = l.id === nextId;
          const q = quiz[l.quizId];
          const sec = sections[l.id] ?? 0;
          return (
            <li key={l.id} className="relative">
              <span className={`absolute -left-[45px] top-5 flex h-8 w-8 items-center justify-center rounded-full border text-sm ${isDone ? 'border-jade bg-jade/20 text-jade' : isNext ? 'border-saffron bg-saffron/20 text-saffron' : 'border-gold/30 bg-ink text-muted'}`}>
                {isDone ? '✓' : i + 1}
              </span>
              <Link to={`/learn/${l.id}`} className={`card card-hover block p-6 ${isNext ? '!border-saffron/50' : ''}`}>
                <div className="eyebrow mb-1">
                  Module {l.module} · {MODULES[l.module - 1]}
                </div>
                <div className="font-serif text-2xl">{l.title}</div>
                <div className="text-sm text-parchment/70">{l.subtitle}</div>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted">
                  <span>{l.minutes} min</span>
                  <span>· {l.sections.length} sections</span>
                  {q && <span className="text-gold">· Quiz best {q.best}/{q.total}</span>}
                  {isNext && <span className="text-saffron">· Up next</span>}
                  {l.status === 'in-development' && <span className="text-saffron">· In development</span>}
                </div>
                {!isDone && sec > 0 && <ProgressBar value={sec / Math.max(1, l.sections.length - 1)} className="mt-3 max-w-xs" />}
                {quizById.get(l.quizId) && <div className="mt-2 text-[11px] text-muted">Knowledge check: {quizById.get(l.quizId)!.title}</div>}
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
