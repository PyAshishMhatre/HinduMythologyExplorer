import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { appStorage } from './storage';

export type ContentType = 'character' | 'story' | 'event' | 'lesson' | 'tree' | 'timeline' | 'location' | 'dynasty' | 'quiz';

export interface VisitEntry {
  type: ContentType;
  id: string;
  ts: number;
}
export interface QuizResult {
  score: number;
  total: number;
  ts: number;
  best: number;
}

interface ProgressState {
  recent: VisitEntry[];
  bookmarks: { type: ContentType; id: string }[];
  completedLessons: string[];
  lessonSection: Record<string, number>;
  storyChapter: Record<string, number>;
  completedStories: string[];
  quizResults: Record<string, QuizResult>;
  visited: Record<string, number>; // `${type}:${id}` -> count
  streak: { current: number; longest: number; lastDay: string | null };
  currentLesson: string | null;
  lastStory: string | null;

  visit: (type: ContentType, id: string) => void;
  toggleBookmark: (type: ContentType, id: string) => void;
  isBookmarked: (type: ContentType, id: string) => boolean;
  setLessonSection: (lessonId: string, idx: number) => void;
  completeLesson: (lessonId: string) => void;
  setStoryChapter: (storyId: string, idx: number, total: number) => void;
  recordQuiz: (quizId: string, score: number, total: number) => void;
  reset: () => void;
  importState: (json: string) => boolean;
}

const today = () => new Date().toISOString().slice(0, 10);
const dayDiff = (a: string, b: string) => Math.round((Date.parse(b) - Date.parse(a)) / 86400000);

function bumpStreak(s: ProgressState['streak']): ProgressState['streak'] {
  const t = today();
  if (s.lastDay === t) return s;
  const current = s.lastDay && dayDiff(s.lastDay, t) === 1 ? s.current + 1 : 1;
  return { current, longest: Math.max(s.longest, current), lastDay: t };
}

const initial = {
  recent: [] as VisitEntry[],
  bookmarks: [] as { type: ContentType; id: string }[],
  completedLessons: [] as string[],
  lessonSection: {} as Record<string, number>,
  storyChapter: {} as Record<string, number>,
  completedStories: [] as string[],
  quizResults: {} as Record<string, QuizResult>,
  visited: {} as Record<string, number>,
  streak: { current: 0, longest: 0, lastDay: null as string | null },
  currentLesson: null as string | null,
  lastStory: null as string | null,
};

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...initial,
      visit: (type, id) =>
        set((s) => {
          const key = `${type}:${id}`;
          const recent = [{ type, id, ts: Date.now() }, ...s.recent.filter((r) => !(r.type === type && r.id === id))].slice(0, 30);
          return {
            recent,
            visited: { ...s.visited, [key]: (s.visited[key] ?? 0) + 1 },
            streak: bumpStreak(s.streak),
            lastStory: type === 'story' ? id : s.lastStory,
            currentLesson: type === 'lesson' ? id : s.currentLesson,
          };
        }),
      toggleBookmark: (type, id) =>
        set((s) => ({
          bookmarks: s.bookmarks.some((b) => b.type === type && b.id === id)
            ? s.bookmarks.filter((b) => !(b.type === type && b.id === id))
            : [{ type, id }, ...s.bookmarks],
        })),
      isBookmarked: (type, id) => get().bookmarks.some((b) => b.type === type && b.id === id),
      setLessonSection: (lessonId, idx) =>
        set((s) => ({ lessonSection: { ...s.lessonSection, [lessonId]: Math.max(idx, s.lessonSection[lessonId] ?? 0) } })),
      completeLesson: (lessonId) =>
        set((s) => ({
          completedLessons: s.completedLessons.includes(lessonId) ? s.completedLessons : [...s.completedLessons, lessonId],
          streak: bumpStreak(s.streak),
        })),
      setStoryChapter: (storyId, idx, total) =>
        set((s) => {
          const prev = s.storyChapter[storyId] ?? 0;
          const furthest = Math.max(prev, idx);
          const done = furthest >= total - 1;
          return {
            storyChapter: { ...s.storyChapter, [storyId]: furthest },
            completedStories: done && !s.completedStories.includes(storyId) ? [...s.completedStories, storyId] : s.completedStories,
            lastStory: storyId,
          };
        }),
      recordQuiz: (quizId, score, total) =>
        set((s) => {
          const prev = s.quizResults[quizId];
          return {
            quizResults: { ...s.quizResults, [quizId]: { score, total, ts: Date.now(), best: Math.max(score, prev?.best ?? 0) } },
            streak: bumpStreak(s.streak),
          };
        }),
      reset: () => set({ ...initial }),
      importState: (json) => {
        try {
          const data = JSON.parse(json);
          const st = data?.state ?? data;
          if (typeof st !== 'object' || !st) return false;
          const pick: Partial<typeof initial> = {};
          for (const k of Object.keys(initial) as (keyof typeof initial)[]) if (k in st) (pick as Record<string, unknown>)[k] = st[k];
          set(pick);
          return true;
        } catch {
          return false;
        }
      },
    }),
    { name: 'hme-progress', storage: appStorage, version: 1 },
  ),
);
