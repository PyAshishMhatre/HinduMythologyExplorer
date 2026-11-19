import { Link } from 'react-router-dom';
import { quizzes } from '../data';
import { PageHeader, ProgressBar } from '../components/ui';
import { useProgress } from '../store/progress';

export default function QuizCenter() {
  const results = useProgress((s) => s.quizResults);
  return (
    <div>
      <PageHeader eyebrow="Knowledge checks" title="Quizzes" subtitle="Multiple choice, true or false, relationships, chronological ordering and story reasoning. Your best score for each quiz is saved." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((q) => {
          const r = results[q.id];
          return (
            <Link key={q.id} to={`/quizzes/${q.id}`} className="card card-hover p-5">
              <div className="eyebrow mb-1 capitalize">{q.topic}</div>
              <div className="font-serif text-2xl">{q.title}</div>
              <div className="mt-1 text-xs text-muted">{q.questions.length} questions · {[...new Set(q.questions.map((x) => x.type))].length} formats</div>
              {r ? (
                <div className="mt-4">
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-muted">Best</span>
                    <span className={r.best / r.total >= 0.8 ? 'text-jade' : 'text-gold'}>
                      {r.best}/{r.total}
                    </span>
                  </div>
                  <ProgressBar value={r.best / r.total} />
                </div>
              ) : (
                <div className="mt-4 text-xs text-gold">Not attempted →</div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
