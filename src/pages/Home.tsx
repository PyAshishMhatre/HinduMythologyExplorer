import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Starfield } from '../components/ui/Starfield';
import { featured, lessons, stories, characterById, storyById, lessonById, characters, events } from '../data';
import { pathways } from '../data/pathways';
import { useProgress } from '../store/progress';
import { CharacterChip, ProgressBar } from '../components/ui';
import { Icon } from '../components/ui/Icon';
import { useSettings } from '../store/settings';

function ContinueLearning() {
  const p = useProgress();
  const completed = p.completedLessons;
  const current = (p.currentLesson && lessonById.get(p.currentLesson)) || lessons.find((l) => !completed.includes(l.id)) || lessons[0];
  const next = lessons.find((l) => !completed.includes(l.id) && l.id !== current.id);
  const last = p.lastStory ? storyById.get(p.lastStory) : null;
  const lastCh = last ? p.storyChapter[last.id] ?? 0 : 0;
  const recentChars = p.recent.filter((r) => r.type === 'character').slice(0, 4);
  const pct = completed.length / lessons.length;
  const secPct = (p.lessonSection[current.id] ?? 0) / Math.max(1, current.sections.length - 1);

  return (
    <section className="mb-14">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <div className="eyebrow">Your journey</div>
          <h2 className="font-serif text-3xl">Continue learning</h2>
        </div>
        <Link to="/progress" className="text-sm text-gold hover:text-saffron">
          View progress →
        </Link>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Link to={`/learn/${current.id}`} className="card card-hover group relative overflow-hidden p-6 lg:col-span-2">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/10 blur-2xl" />
          <div className="eyebrow mb-2">{completed.includes(current.id) ? 'Revisit' : 'Current lesson'} · Module {current.module}</div>
          <div className="font-serif text-2xl leading-snug">{current.title}</div>
          <p className="mt-1 text-sm text-parchment/70">{current.subtitle}</p>
          <div className="mt-5 flex items-center gap-4">
            <ProgressBar value={completed.includes(current.id) ? 1 : secPct} className="max-w-xs" />
            <span className="text-xs text-muted">{current.minutes} min</span>
          </div>
          <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold group-hover:text-saffron">
            {p.lessonSection[current.id] ? 'Resume' : 'Begin'} lesson <Icon name="arrowRight" className="h-4 w-4" />
          </div>
        </Link>
        <div className="card space-y-4 p-6">
          <div>
            <div className="mb-1 flex justify-between text-xs text-muted">
              <span>Curriculum progress</span>
              <span>
                {completed.length}/{lessons.length} lessons
              </span>
            </div>
            <ProgressBar value={pct} />
          </div>
          {last && (
            <Link to={`/stories/${last.id}/${lastCh + 1}`} className="block rounded-xl border border-gold/10 p-3 hover:border-gold/40">
              <div className="eyebrow !text-[10px]">Last story</div>
              <div className="font-serif text-lg leading-tight">{last.title}</div>
              <div className="text-xs text-muted">
                Chapter {lastCh + 1} of {last.chapters.length}
              </div>
            </Link>
          )}
          {next && (
            <Link to={`/learn/${next.id}`} className="block rounded-xl border border-gold/10 p-3 hover:border-gold/40">
              <div className="eyebrow !text-[10px]">Recommended next</div>
              <div className="font-serif text-lg leading-tight">{next.title}</div>
            </Link>
          )}
        </div>
      </div>
      {recentChars.length > 0 && (
        <div className="mt-4">
          <div className="mb-2 text-xs text-muted">Recently explored characters</div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {recentChars.map((r) => characterById.has(r.id) && <CharacterChip key={r.id} id={r.id} />)}
          </div>
        </div>
      )}
    </section>
  );
}

export default function Home() {
  const reduce = useSettings((s) => s.reduceMotion);
  const fade = (i: number) => (reduce ? {} : { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: i * 0.06, duration: 0.5 } });
  return (
    <div>
      {/* Hero */}
      <section className="relative -mx-4 -mt-6 mb-14 overflow-hidden px-6 pb-16 pt-20 lg:-mx-8 lg:-mt-10 lg:px-12 lg:pb-24 lg:pt-28">
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-night to-night" />
        <Starfield />
        <svg className="pointer-events-none absolute -right-24 top-1/2 h-[560px] w-[560px] -translate-y-1/2 opacity-[0.13]" viewBox="0 0 200 200" aria-hidden="true">
          <g fill="none" stroke="rgb(var(--c-gold))" strokeWidth="0.5">
            {Array.from({ length: 24 }, (_, i) => (
              <ellipse key={i} cx="100" cy="100" rx="22" ry="90" transform={`rotate(${i * 7.5} 100 100)`} />
            ))}
            <circle cx="100" cy="100" r="96" />
            <circle cx="100" cy="100" r="60" />
            <circle cx="100" cy="100" r="18" />
          </g>
        </svg>
        <div className="relative max-w-3xl">
          <motion.div {...(reduce ? {} : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7 } })}>
            <div className="eyebrow mb-4">Hindu Mythology Explorer</div>
            <h1 className="font-serif text-5xl font-semibold leading-[1.05] md:text-7xl">
              Explore the Universe of <span className="bg-gradient-to-r from-gold via-saffron to-gold bg-clip-text text-transparent">Hindu Mythology</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-parchment/75">
              From the origins of creation to the great epics, discover the characters, dynasties, stories, and connections that shaped one of the world's richest mythological traditions.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/learn/lesson-1" className="btn-primary !px-6 !py-3 !text-base">
                Start Learning <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
              <Link to="/timeline" className="btn-ghost !px-6 !py-3 !text-base">
                <Icon name="timeline" className="h-4 w-4" /> Explore Timeline
              </Link>
              <Link to="/family-tree/kuru" className="btn-ghost !px-6 !py-3 !text-base">
                <Icon name="tree" className="h-4 w-4" /> Explore Family Trees
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted">
              <span>
                <b className="font-serif text-2xl text-parchment">{characters.length}</b> characters
              </span>
              <span>
                <b className="font-serif text-2xl text-parchment">{stories.length}</b> stories
              </span>
              <span>
                <b className="font-serif text-2xl text-parchment">{events.length}</b> events
              </span>
              <span>
                <b className="font-serif text-2xl text-parchment">{lessons.length}</b> lessons
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pathways */}
      <section className="mb-14">
        <div className="eyebrow">Seven pathways</div>
        <h2 className="mb-6 font-serif text-3xl">Enter the universe</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pathways.map((p, i) => (
            <motion.div key={p.id} {...fade(i)} className={i === 0 ? 'sm:col-span-2 lg:col-span-1 lg:row-span-2' : ''}>
              <div className="card card-hover group relative flex h-full flex-col overflow-hidden p-6">
                <div className="absolute -right-6 -top-6 text-[110px] leading-none opacity-[0.07] transition group-hover:opacity-[0.15]" style={{ color: p.color }} aria-hidden="true">
                  {p.glyph}
                </div>
                <div className="mb-3 h-1 w-10 rounded-full" style={{ background: p.color }} />
                <div className="text-xs tracking-wide text-muted">{p.sanskrit}</div>
                <Link to={p.to} className="font-serif text-2xl leading-tight hover:text-gold">
                  {p.title}
                </Link>
                <p className={`mt-2 flex-1 text-sm leading-relaxed text-parchment/70 ${i === 0 ? 'lg:text-base' : ''}`}>{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link to={p.to} className="chip hover:border-gold/60">
                    Explore →
                  </Link>
                  {p.links.map((l) => (
                    <Link key={l.to} to={l.to} className="chip hover:border-gold/60">
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <ContinueLearning />

      {/* Featured discoveries */}
      <section className="mb-10">
        <div className="eyebrow">Featured discoveries</div>
        <h2 className="mb-6 font-serif text-3xl">How everything connects</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((f, i) => (
            <motion.div key={f.id} {...fade(i)}>
              <Link to={f.link} className="card card-hover group block h-full p-6">
                <Icon name="link" className="mb-3 h-5 w-5 text-saffron" />
                <div className="font-serif text-xl leading-snug group-hover:text-gold">{f.question}</div>
                <p className="mt-2 text-sm leading-relaxed text-parchment/65">{f.teaser}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
