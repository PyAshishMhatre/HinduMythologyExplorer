import { Link, useLocation } from 'react-router-dom';
import { useProgress } from '../store/progress';
import { resolve, TYPE_ICON } from '../lib/content';
import { Icon } from '../components/ui/Icon';
import { characterById, eventById, storyById, featured } from '../data';
import { neighborIds } from '../lib/graph';

function Related() {
  const { pathname } = useLocation();
  const [, section, id] = pathname.split('/');
  let items: { title: string; to: string; sub: string }[] = [];
  if (section === 'characters' && id && characterById.has(id)) {
    items = neighborIds(id)
      .slice(0, 8)
      .map((n) => ({ title: characterById.get(n)!.name, to: `/characters/${n}`, sub: characterById.get(n)!.title }));
  } else if (section === 'stories' && id && storyById.has(id)) {
    const s = storyById.get(id)!;
    items = (s.relatedStories ?? []).map((r) => ({ title: storyById.get(r)!.title, to: `/stories/${r}`, sub: 'Related story' }));
  } else if (section === 'events' && id && eventById.has(id)) {
    const e = eventById.get(id)!;
    items = [...(e.preceding ?? []), ...(e.following ?? [])].map((x) => ({ title: eventById.get(x)!.title, to: `/events/${x}`, sub: e.preceding?.includes(x) ? 'Before' : 'After' }));
  }
  if (!items.length) {
    items = featured.slice(0, 4).map((f) => ({ title: f.question, to: f.link, sub: 'Featured discovery' }));
  }
  return (
    <section>
      <div className="eyebrow mb-2">Next discoveries</div>
      <ul className="space-y-1">
        {items.map((i) => (
          <li key={i.to + i.title}>
            <Link to={i.to} className="block rounded-lg px-2 py-1.5 hover:bg-gold/5">
              <div className="truncate text-sm text-parchment/90">{i.title}</div>
              <div className="truncate text-[11px] text-muted">{i.sub}</div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ContextPanel() {
  const recent = useProgress((s) => s.recent);
  const bookmarks = useProgress((s) => s.bookmarks);
  return (
    <aside className="hidden w-72 shrink-0 overflow-y-auto border-l border-gold/10 bg-ink/40 p-5 xl:block">
      <Related />
      <div className="divider my-5" />
      <section>
        <div className="eyebrow mb-2">Recently explored</div>
        {recent.length === 0 && <p className="text-xs text-muted">Your trail through the universe will appear here.</p>}
        <ul className="space-y-0.5">
          {recent.slice(0, 8).map((r) => {
            const c = resolve(r.type, r.id);
            if (!c) return null;
            return (
              <li key={`${r.type}:${r.id}`}>
                <Link to={c.to} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-parchment/80 hover:bg-gold/5">
                  <Icon name={TYPE_ICON[r.type]} className="h-3.5 w-3.5 shrink-0 text-gold/60" />
                  <span className="truncate">{c.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
      {bookmarks.length > 0 && (
        <>
          <div className="divider my-5" />
          <section>
            <div className="eyebrow mb-2">Bookmarks</div>
            <ul className="space-y-0.5">
              {bookmarks.slice(0, 10).map((b) => {
                const c = resolve(b.type, b.id);
                if (!c) return null;
                return (
                  <li key={`${b.type}:${b.id}`}>
                    <Link to={c.to} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-parchment/80 hover:bg-gold/5">
                      <Icon name="bookmark" filled className="h-3.5 w-3.5 shrink-0 text-saffron/80" />
                      <span className="truncate">{c.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        </>
      )}
    </aside>
  );
}
