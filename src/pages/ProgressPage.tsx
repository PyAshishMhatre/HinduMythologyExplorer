import { Link } from 'react-router-dom';
import { lessons, quizzes, stories, characters } from '../data';
import { PageHeader, ProgressBar } from '../components/ui';
import { useProgress } from '../store/progress';
import { computeAchievements, topicMastery } from '../lib/achievements';
import { resolve } from '../lib/content';

export default function ProgressPage() {
  const p = useProgress();
  const ach = computeAchievements(p);
  const mastery = topicMastery(p);
  const visitedChars = characters.filter((c) => p.visited[`character:${c.id}`]).length;
  const stats = [
    { label: 'Lessons completed', v: `${p.completedLessons.length}/${lessons.length}` },
    { label: 'Stories finished', v: `${p.completedStories.length}/${stories.length}` },
    { label: 'Quizzes attempted', v: `${Object.keys(p.quizResults).length}/${quizzes.length}` },
    { label: 'Characters explored', v: `${visitedChars}/${characters.length}` },
    { label: 'Current streak', v: `${p.streak.current} day${p.streak.current === 1 ? '' : 's'}` },
    { label: 'Longest streak', v: `${p.streak.longest} day${p.streak.longest === 1 ? '' : 's'}` },
  ];
  return (
    <div>
      <PageHeader eyebrow="Your journey" title="Learning Progress" subtitle="Saved locally in this browser. Export a backup from Settings." />
      <div className="mb-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {stats.map((s) => (
          <div key={s.label} className="card p-4">
            <div className="font-serif text-3xl text-gold">{s.v}</div>
            <div className="text-xs text-muted">{s.label}</div>
          </div>
        ))}
      </div>

      <h2 className="mb-4 font-serif text-3xl">Achievements</h2>
      <div className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ach.map((a) => {
          const got = a.progress >= 1;
          return (
            <div key={a.id} className={`card relative overflow-hidden p-5 ${got ? '!border-gold/60 shadow-glow' : ''}`}>
              <div className="flex items-center gap-4">
                <div className={`flex h-14 w-14 items-center justify-center rounded-full border text-2xl ${got ? 'border-gold bg-gold/20' : 'border-gold/20 bg-ink grayscale opacity-60'}`}>{a.glyph}</div>
                <div className="min-w-0 flex-1">
                  <div className="font-serif text-xl">{a.title}</div>
                  <div className="text-xs text-muted">{a.description}</div>
                  <ProgressBar value={a.progress} className="mt-2" />
                </div>
              </div>
              {got && <div className="absolute right-3 top-3 text-[10px] uppercase tracking-widest text-gold">Earned</div>}
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card p-5">
          <h2 className="mb-4 font-serif text-2xl">Topic mastery</h2>
          <div className="space-y-3">
            {mastery.map((m) => (
              <div key={m.topic}>
                <div className="mb-1 flex justify-between text-sm capitalize">
                  <span>{m.topic}</span>
                  <span className="text-muted">{Math.round(m.pct * 100)}%</span>
                </div>
                <ProgressBar value={m.pct} />
              </div>
            ))}
          </div>
        </section>
        <section className="card p-5">
          <h2 className="mb-4 font-serif text-2xl">Quiz results</h2>
          {Object.keys(p.quizResults).length === 0 && <p className="text-sm text-muted">No quizzes attempted yet.</p>}
          <ul className="space-y-1.5 text-sm">
            {quizzes
              .filter((q) => p.quizResults[q.id])
              .map((q) => {
                const r = p.quizResults[q.id];
                return (
                  <li key={q.id} className="flex justify-between">
                    <Link to={`/quizzes/${q.id}`} className="hover:text-gold">
                      {q.title}
                    </Link>
                    <span className="text-muted">
                      last {r.score}/{r.total} · best <span className="text-gold">{r.best}</span>
                    </span>
                  </li>
                );
              })}
          </ul>
        </section>
        <section className="card p-5 lg:col-span-2">
          <h2 className="mb-4 font-serif text-2xl">Recently explored</h2>
          {p.recent.length === 0 && <p className="text-sm text-muted">Nothing yet — start with Lesson 1.</p>}
          <div className="flex flex-wrap gap-2">
            {p.recent.map((r) => {
              const c = resolve(r.type, r.id);
              return c ? (
                <Link key={r.type + r.id} to={c.to} className="chip hover:border-gold/60">
                  <span className="text-[10px] uppercase text-muted">{r.type}</span> {c.title}
                </Link>
              ) : null;
            })}
          </div>
        </section>
        <section className="card p-5 lg:col-span-2">
          <h2 className="mb-4 font-serif text-2xl">Bookmarks</h2>
          {p.bookmarks.length === 0 && <p className="text-sm text-muted">Use the Bookmark button on any character, story, event or family tree.</p>}
          <div className="flex flex-wrap gap-2">
            {p.bookmarks.map((b) => {
              const c = resolve(b.type, b.id);
              return c ? (
                <Link key={b.type + b.id} to={c.to} className="chip hover:border-gold/60">
                  🔖 {c.title}
                </Link>
              ) : null;
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
