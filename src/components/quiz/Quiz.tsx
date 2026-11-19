import { useMemo, useState } from 'react';
import type { Quiz as QuizT, QuizQuestion } from '../../data/types';
import { useProgress } from '../../store/progress';
import { Icon } from '../ui/Icon';

function seededShuffle<T>(arr: T[], seed: string): T[] {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) | 0;
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    h = (h * 1103515245 + 12345) | 0;
    const j = Math.abs(h) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  // ensure not already in correct order
  if (a.every((x, i) => x === arr[i]) && a.length > 1) [a[0], a[1]] = [a[1], a[0]];
  return a;
}

const TYPE_LABEL: Record<QuizQuestion['type'], string> = {
  mcq: 'Multiple choice', truefalse: 'True or false', order: 'Chronological order', relationship: 'Relationship', reasoning: 'Story reasoning',
};

function isCorrect(q: QuizQuestion, a: number | string[] | undefined) {
  if (q.type === 'order') return Array.isArray(a) && a.every((x, i) => x === q.items![i]);
  return a === q.answer;
}

function OrderInput({ q, value, onChange, disabled }: { q: QuizQuestion; value: string[]; onChange: (v: string[]) => void; disabled: boolean }) {
  const [drag, setDrag] = useState<number | null>(null);
  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= value.length) return;
    const v = [...value];
    [v[i], v[j]] = [v[j], v[i]];
    onChange(v);
  };
  return (
    <ol className="space-y-2">
      {value.map((item, i) => (
        <li
          key={item}
          draggable={!disabled}
          onDragStart={() => setDrag(i)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => {
            if (drag === null || drag === i) return;
            const v = [...value];
            const [x] = v.splice(drag, 1);
            v.splice(i, 0, x);
            onChange(v);
            setDrag(null);
          }}
          className={`flex items-center gap-3 rounded-xl border border-gold/20 bg-ink/50 px-3 py-2 text-sm ${disabled ? '' : 'cursor-grab active:cursor-grabbing'}`}
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/15 text-xs text-gold">{i + 1}</span>
          <span className="flex-1">{item}</span>
          {!disabled && (
            <span className="flex gap-1">
              <button onClick={() => move(i, -1)} className="rounded px-1.5 text-muted hover:bg-gold/10 hover:text-parchment" aria-label="Move up">↑</button>
              <button onClick={() => move(i, 1)} className="rounded px-1.5 text-muted hover:bg-gold/10 hover:text-parchment" aria-label="Move down">↓</button>
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

export default function Quiz({ quiz, compact = false }: { quiz: QuizT; compact?: boolean }) {
  const record = useProgress((s) => s.recordQuiz);
  const prev = useProgress((s) => s.quizResults[quiz.id]);
  const initialOrders = useMemo(() => Object.fromEntries(quiz.questions.filter((q) => q.type === 'order').map((q) => [q.id, seededShuffle(q.items!, quiz.id + q.id)])), [quiz]);
  const [answers, setAnswers] = useState<Record<string, number | string[]>>(initialOrders);
  const [submitted, setSubmitted] = useState(false);

  const score = quiz.questions.filter((q) => isCorrect(q, answers[q.id])).length;
  const answeredAll = quiz.questions.every((q) => answers[q.id] !== undefined);

  const submit = () => {
    setSubmitted(true);
    record(quiz.id, score, quiz.questions.length);
  };
  const retry = () => {
    setAnswers(initialOrders);
    setSubmitted(false);
  };

  return (
    <div className="space-y-5">
      {!compact && prev && !submitted && (
        <div className="text-xs text-muted">
          Previous best: {prev.best}/{prev.total}
        </div>
      )}
      {quiz.questions.map((q, qi) => {
        const a = answers[q.id];
        const opts = q.type === 'truefalse' ? ['True', 'False'] : q.options;
        return (
          <div key={q.id} className="card p-5">
            <div className="mb-1 flex items-center gap-2">
              <span className="eyebrow !text-[10px]">Question {qi + 1} · {TYPE_LABEL[q.type]}</span>
            </div>
            <div className="mb-4 font-serif text-xl leading-snug">{q.prompt}</div>
            {q.type === 'order' ? (
              <OrderInput q={q} value={(a as string[]) ?? q.items!} onChange={(v) => setAnswers({ ...answers, [q.id]: v })} disabled={submitted} />
            ) : (
              <div className="grid gap-2 sm:grid-cols-2">
                {opts!.map((o, oi) => {
                  const chosen = a === oi;
                  const right = submitted && oi === q.answer;
                  const wrong = submitted && chosen && oi !== q.answer;
                  return (
                    <button
                      key={oi}
                      disabled={submitted}
                      onClick={() => setAnswers({ ...answers, [q.id]: oi })}
                      className={`rounded-xl border px-4 py-2.5 text-left text-sm transition ${
                        right ? 'border-jade bg-jade/15' : wrong ? 'border-vermilion bg-vermilion/15' : chosen ? 'border-gold bg-gold/15' : 'border-gold/15 bg-ink/40 hover:border-gold/40'
                      }`}
                    >
                      {o}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {!submitted ? (
        <div className="flex items-center gap-3">
          <button className="btn-primary disabled:opacity-40" disabled={!answeredAll} onClick={submit}>
            <Icon name="check" className="h-4 w-4" /> Check my answers
          </button>
          {!answeredAll && <span className="text-xs text-muted">Answer every question to see results.</span>}
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gold/10 bg-gold/5 px-5 py-4">
            <div>
              <div className="eyebrow">Answers & explanations</div>
              <div className="font-serif text-3xl">
                {score} / {quiz.questions.length}{' '}
                <span className="text-base text-muted">{score === quiz.questions.length ? '— perfect' : score >= 4 ? '— well done' : score >= 3 ? '— good progress' : '— revisit the story and try again'}</span>
              </div>
            </div>
            <button className="btn-ghost" onClick={retry}>
              Try again
            </button>
          </div>
          <ol className="divide-y divide-gold/10">
            {quiz.questions.map((q, i) => {
              const ok = isCorrect(q, answers[q.id]);
              return (
                <li key={q.id} className="flex gap-3 px-5 py-3.5 text-sm">
                  <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] ${ok ? 'bg-jade/25 text-jade' : 'bg-vermilion/25 text-vermilion'}`}>{ok ? '✓' : '✗'}</span>
                  <div>
                    <div className="text-parchment/90">
                      {i + 1}. {q.prompt}
                    </div>
                    <div className="mt-0.5 text-gold">
                      Answer: {q.type === 'order' ? q.items!.join(' → ') : q.type === 'truefalse' ? (q.answer === 0 ? 'True' : 'False') : q.options![q.answer!]}
                    </div>
                    <div className="mt-0.5 text-muted">{q.explanation}</div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </div>
  );
}
