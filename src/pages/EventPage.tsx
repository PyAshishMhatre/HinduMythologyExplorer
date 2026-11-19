import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { eventById, eraById } from '../data';
import EventDetail from '../components/timeline/EventDetail';
import { BookmarkButton, Breadcrumbs } from '../components/ui';
import { useProgress } from '../store/progress';
import NotFound from './NotFound';

export default function EventPage() {
  const { id = '' } = useParams();
  const e = eventById.get(id);
  const visit = useProgress((s) => s.visit);
  useEffect(() => {
    if (e) visit('event', e.id);
  }, [e, visit]);
  if (!e) return <NotFound />;
  const era = eraById.get(e.era)!;
  return (
    <div className="max-w-4xl">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Timeline', to: '/timeline' }, { label: era.name, to: `/timeline/master?era=${era.id}` }, { label: e.title }]} />
      <div className="mb-4 flex justify-end gap-2">
        <BookmarkButton type="event" id={e.id} />
        <Link to={`/timeline/master?focus=${e.id}`} className="btn-ghost">
          Show on timeline
        </Link>
      </div>
      <EventDetail e={e} />
    </div>
  );
}
