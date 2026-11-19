import { characters, lessons, quizzes, stories } from '../data';
import { useProgress } from '../store/progress';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  glyph: string;
  progress: number; // 0..1
}

type P = ReturnType<typeof useProgress.getState>;

const passed = (p: P, quizId: string) => {
  const r = p.quizResults[quizId];
  return r ? r.best / r.total >= 0.8 : false;
};
const frac = (n: number, d: number) => Math.min(1, d ? n / d : 0);

export function computeAchievements(p: P): Achievement[] {
  const visitedChars = characters.filter((c) => p.visited[`character:${c.id}`]).length;
  const passedCount = quizzes.filter((q) => passed(p, q.id)).length;
  const ramStories = stories.filter((s) => s.category === 'ramayana');
  const mbStories = stories.filter((s) => s.category === 'mahabharata');
  const puranic = stories.filter((s) => !['ramayana', 'mahabharata'].includes(s.category));
  const done = (ids: string[]) => ids.filter((id) => p.completedStories.includes(id)).length;
  return [
    { id: 'cosmic-explorer', title: 'Cosmic Explorer', description: 'Complete Lesson 1 and pass the Origins quiz.', glyph: '✦', progress: (Number(p.completedLessons.includes('lesson-1')) + Number(passed(p, 'quiz-origins'))) / 2 },
    { id: 'sage-scholar', title: 'Sage Scholar', description: 'Complete Lesson 2 and pass the Lineages quiz.', glyph: '☸', progress: (Number(p.completedLessons.includes('lesson-2')) + Number(passed(p, 'quiz-lineages'))) / 2 },
    { id: 'solar-expert', title: 'Solar Dynasty Expert', description: 'Pass the Solar Dynasty quiz and read The Descent of Ganga.', glyph: '☀', progress: (Number(passed(p, 'quiz-solar')) + Number(p.completedStories.includes('descent-of-ganga'))) / 2 },
    { id: 'ramayana-explorer', title: 'Ramayana Explorer', description: 'Finish every Ramayana story.', glyph: '🏹', progress: frac(done(ramStories.map((s) => s.id)), ramStories.length) },
    { id: 'mahabharata-scholar', title: 'Mahabharata Scholar', description: 'Finish every Mahabharata story and pass the Kuru quiz.', glyph: '☬', progress: (frac(done(mbStories.map((s) => s.id)), mbStories.length) + Number(passed(p, 'quiz-kuru'))) / 2 },
    { id: 'puranic-storyteller', title: 'Puranic Storyteller', description: 'Finish every Puranic story.', glyph: '❂', progress: frac(done(puranic.map((s) => s.id)), puranic.length) },
    { id: 'character-collector', title: 'Keeper of Names', description: 'Visit 50 character profiles.', glyph: '◈', progress: frac(visitedChars, 50) },
    { id: 'streak', title: 'Tapasvin', description: 'Learn on 7 consecutive days.', glyph: '🔥', progress: frac(p.streak.longest, 7) },
    { id: 'mythology-master', title: 'Mythology Master', description: 'Complete every lesson and pass every quiz.', glyph: '❖', progress: (frac(p.completedLessons.length, lessons.length) + frac(passedCount, quizzes.length)) / 2 },
  ];
}

export function topicMastery(p: P) {
  const topics = [...new Set(quizzes.map((q) => q.topic))];
  return topics.map((t) => {
    const qs = quizzes.filter((q) => q.topic === t);
    const score = qs.reduce((a, q) => a + (p.quizResults[q.id]?.best ?? 0), 0);
    const total = qs.reduce((a, q) => a + q.questions.length, 0);
    return { topic: t, score, total, pct: total ? score / total : 0 };
  });
}
