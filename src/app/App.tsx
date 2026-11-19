import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './Layout';
import { useSettings } from '../store/settings';
import Home from '../pages/Home';

const Universe = lazy(() => import('../pages/Universe'));
const TimelineExplorer = lazy(() => import('../pages/TimelineExplorer'));
const EventPage = lazy(() => import('../pages/EventPage'));
const FamilyTreeExplorer = lazy(() => import('../pages/FamilyTreeExplorer'));
const CharacterExplorer = lazy(() => import('../pages/CharacterExplorer'));
const CharacterProfile = lazy(() => import('../pages/CharacterProfile'));
const StoryExplorer = lazy(() => import('../pages/StoryExplorer'));
const StoryReader = lazy(() => import('../pages/StoryReader'));
const GodsAvatars = lazy(() => import('../pages/GodsAvatars'));
const Dynasties = lazy(() => import('../pages/Dynasties'));
const DynastyPage = lazy(() => import('../pages/DynastyPage'));
const RelationshipExplorer = lazy(() => import('../pages/RelationshipExplorer'));
const GeographyExplorer = lazy(() => import('../pages/GeographyExplorer'));
const LearningPath = lazy(() => import('../pages/LearningPath'));
const LessonPage = lazy(() => import('../pages/LessonPage'));
const QuizCenter = lazy(() => import('../pages/QuizCenter'));
const QuizPage = lazy(() => import('../pages/QuizPage'));
const ProgressPage = lazy(() => import('../pages/ProgressPage'));
const Glossary = lazy(() => import('../pages/Glossary'));
const Compare = lazy(() => import('../pages/Compare'));
const CompareTraditions = lazy(() => import('../pages/CompareTraditions'));
const SearchPage = lazy(() => import('../pages/SearchPage'));
const Sources = lazy(() => import('../pages/Sources'));
const Settings = lazy(() => import('../pages/Settings'));
const NotFound = lazy(() => import('../pages/NotFound'));

function Loading() {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold/20 border-t-gold" />
    </div>
  );
}

export default function App() {
  const theme = useSettings((s) => s.theme);
  const reduceMotion = useSettings((s) => s.reduceMotion);
  const fontScale = useSettings((s) => s.fontScale);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle('reduce-motion', reduceMotion);
    document.documentElement.style.fontSize = `${16 * fontScale}px`;
  }, [theme, reduceMotion, fontScale]);

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
        return;
      }
    }
    document.getElementById('main-scroll')?.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/universe" element={<Universe />} />
          <Route path="/timeline" element={<TimelineExplorer />} />
          <Route path="/timeline/:timelineId" element={<TimelineExplorer />} />
          <Route path="/events/:id" element={<EventPage />} />
          <Route path="/family-tree" element={<FamilyTreeExplorer />} />
          <Route path="/family-tree/:treeId" element={<FamilyTreeExplorer />} />
          <Route path="/characters" element={<CharacterExplorer />} />
          <Route path="/characters/:id" element={<CharacterProfile />} />
          <Route path="/stories" element={<StoryExplorer />} />
          <Route path="/stories/:id" element={<StoryReader />} />
          <Route path="/stories/:id/:chapter" element={<StoryReader />} />
          <Route path="/gods-avatars" element={<GodsAvatars />} />
          <Route path="/dynasties" element={<Dynasties />} />
          <Route path="/dynasties/:id" element={<DynastyPage />} />
          <Route path="/relationships" element={<RelationshipExplorer />} />
          <Route path="/relationships/:pair" element={<RelationshipExplorer />} />
          <Route path="/map" element={<GeographyExplorer />} />
          <Route path="/map/:locationId" element={<GeographyExplorer />} />
          <Route path="/learn" element={<LearningPath />} />
          <Route path="/learn/:lessonId" element={<LessonPage />} />
          <Route path="/quizzes" element={<QuizCenter />} />
          <Route path="/quizzes/:id" element={<QuizPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/glossary/:term" element={<Glossary />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/compare/:pair" element={<Compare />} />
          <Route path="/compare-traditions" element={<CompareTraditions />} />
          <Route path="/compare-traditions/:id" element={<CompareTraditions />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/sources" element={<Sources />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
