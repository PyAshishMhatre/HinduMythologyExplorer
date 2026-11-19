import { characterById, dynastyById, eventById, familyTreeById, glossaryById, lessonById, locationById, quizById, storyById, eraById } from '../data';
import type { ContentType } from '../store/progress';

export interface ContentRef {
  type: ContentType;
  id: string;
  title: string;
  subtitle: string;
  to: string;
}

export function resolve(type: ContentType, id: string): ContentRef | null {
  switch (type) {
    case 'character': {
      const c = characterById.get(id);
      return c ? { type, id, title: c.name, subtitle: c.title, to: `/characters/${id}` } : null;
    }
    case 'story': {
      const s = storyById.get(id);
      return s ? { type, id, title: s.title, subtitle: s.subtitle ?? '', to: `/stories/${id}` } : null;
    }
    case 'event': {
      const e = eventById.get(id);
      return e ? { type, id, title: e.title, subtitle: eraById.get(e.era)?.name ?? '', to: `/events/${id}` } : null;
    }
    case 'lesson': {
      const l = lessonById.get(id);
      return l ? { type, id, title: l.title, subtitle: `Module ${l.module}`, to: `/learn/${id}` } : null;
    }
    case 'tree': {
      const t = familyTreeById.get(id);
      return t ? { type, id, title: t.title, subtitle: 'Family tree', to: `/family-tree/${id}` } : null;
    }
    case 'location': {
      const l = locationById.get(id);
      return l ? { type, id, title: l.name, subtitle: 'Place', to: `/map/${id}` } : null;
    }
    case 'dynasty': {
      const d = dynastyById.get(id);
      return d ? { type, id, title: d.name, subtitle: d.sanskritName, to: `/dynasties/${id}` } : null;
    }
    case 'quiz': {
      const q = quizById.get(id);
      return q ? { type, id, title: q.title, subtitle: 'Quiz', to: `/quizzes/${id}` } : null;
    }
    case 'timeline':
      return { type, id, title: `Timeline: ${id}`, subtitle: 'Timeline', to: `/timeline/${id}` };
    default:
      return null;
  }
}

export const termOf = (id: string) => glossaryById.get(id);

export const TYPE_ICON: Record<ContentType, string> = {
  character: 'characters', story: 'story', event: 'event', lesson: 'learn', tree: 'tree', timeline: 'timeline', location: 'map', dynasty: 'dynasty', quiz: 'quiz',
};
