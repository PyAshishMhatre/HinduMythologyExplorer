import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { quizById } from '../data';
import Quiz from '../components/quiz/Quiz';
import { Breadcrumbs, PageHeader } from '../components/ui';
import { useProgress } from '../store/progress';
import NotFound from './NotFound';

export default function QuizPage() {
  const { id = '' } = useParams();
  const q = quizById.get(id);
  const visit = useProgress((s) => s.visit);
  useEffect(() => {
    if (q) visit('quiz', q.id);
  }, [q, visit]);
  if (!q) return <NotFound />;
  return (
    <div className="mx-auto max-w-3xl">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Quizzes', to: '/quizzes' }, { label: q.title }]} />
      <PageHeader eyebrow={`Knowledge check · ${q.topic}`} title={q.title} subtitle="Answer all five questions, then check your answers. Explanations appear after you submit." />
      <Quiz key={q.id} quiz={q} />
    </div>
  );
}
