import MiniSearch from 'minisearch';
import { characters, dynasties, events, glossary, lessons, locations, sources, stories } from '../data';

export type SearchKind = 'character' | 'event' | 'story' | 'place' | 'term' | 'dynasty' | 'lesson' | 'source';

export interface SearchDoc {
  id: string;
  kind: SearchKind;
  title: string;
  subtitle: string;
  body: string;
  aliases: string;
  to: string;
}

const strip = (s: string) => s.replace(/\[\[\w+:[\w-]+\|?([^\]]*)\]\]/g, (_m, l) => l || '');

const docs: SearchDoc[] = [
  ...characters.map((c) => ({ id: `character:${c.id}`, kind: 'character' as const, title: c.name, subtitle: c.title, body: strip([c.description, ...c.biography].join(' ')), aliases: (c.alternateNames ?? []).join(' '), to: `/characters/${c.id}` })),
  ...events.map((e) => ({ id: `event:${e.id}`, kind: 'event' as const, title: e.title, subtitle: e.summary, body: strip(e.narrative.join(' ')), aliases: '', to: `/events/${e.id}` })),
  ...stories.map((s) => ({ id: `story:${s.id}`, kind: 'story' as const, title: s.title, subtitle: s.subtitle ?? '', body: strip([s.introduction, ...s.chapters.map((c) => c.title)].join(' ')), aliases: '', to: `/stories/${s.id}` })),
  ...stories.flatMap((s) => s.chapters.map((c, i) => ({ id: `chapter:${s.id}:${c.id}`, kind: 'story' as const, title: `${s.title} — ${c.title}`, subtitle: `Chapter ${i + 1}`, body: strip(c.narrative.join(' ')), aliases: '', to: `/stories/${s.id}/${i + 1}` }))),
  ...locations.map((l) => ({ id: `place:${l.id}`, kind: 'place' as const, title: l.name, subtitle: l.significance, body: l.modernIdentification, aliases: (l.alternateNames ?? []).join(' '), to: `/map/${l.id}` })),
  ...glossary.map((g) => ({ id: `term:${g.id}`, kind: 'term' as const, title: g.term, subtitle: g.short, body: g.long, aliases: g.sanskrit ?? '', to: `/glossary/${g.id}` })),
  ...dynasties.map((d) => ({ id: `dynasty:${d.id}`, kind: 'dynasty' as const, title: d.name, subtitle: d.sanskritName, body: d.description + ' ' + d.origin, aliases: d.sanskritName, to: `/dynasties/${d.id}` })),
  ...lessons.map((l) => ({ id: `lesson:${l.id}`, kind: 'lesson' as const, title: l.title, subtitle: l.subtitle, body: strip(l.sections.map((s) => s.heading + ' ' + s.body.join(' ')).join(' ')), aliases: '', to: `/learn/${l.id}` })),
  ...sources.map((s) => ({ id: `source:${s.id}`, kind: 'source' as const, title: s.textName, subtitle: s.category, body: s.description, aliases: '', to: `/sources#${s.id}` })),
];

const mini = new MiniSearch<SearchDoc>({
  fields: ['title', 'aliases', 'subtitle', 'body'],
  storeFields: ['kind', 'title', 'subtitle', 'to'],
  searchOptions: { boost: { title: 4, aliases: 3, subtitle: 1.5 }, prefix: true, fuzzy: 0.2, combineWith: 'OR' },
});
mini.addAll(docs);

const STOP = new Set(['who', 'what', 'was', 'were', 'is', 'are', 'the', 'of', 'and', 'how', 'did', 'does', 'to', 'a', 'an', 'in', 'happened', 'after', 'before', 'during', 'related']);

export interface SearchHit {
  id: string;
  kind: SearchKind;
  title: string;
  subtitle: string;
  to: string;
  score: number;
}

export function search(query: string, kinds?: SearchKind[], limit = 40): SearchHit[] {
  const q = query
    .split(/\s+/)
    .map((w) => w.replace(/'s$/i, '').replace(/[^\p{L}\p{N}-]/gu, ''))
    .filter((w) => w && !STOP.has(w.toLowerCase()))
    .join(' ');
  if (!q) return [];
  return mini
    .search(q, kinds?.length ? { filter: (r) => kinds.includes(r.kind as SearchKind) } : undefined)
    .slice(0, limit)
    .map((r) => ({ id: r.id as string, kind: r.kind as SearchKind, title: r.title as string, subtitle: r.subtitle as string, to: r.to as string, score: r.score }));
}

export function suggest(prefix: string, limit = 8): SearchHit[] {
  return search(prefix, undefined, limit);
}

export const KIND_LABEL: Record<SearchKind, string> = {
  character: 'Character', event: 'Event', story: 'Story', place: 'Place', term: 'Concept', dynasty: 'Dynasty', lesson: 'Lesson', source: 'Source',
};
