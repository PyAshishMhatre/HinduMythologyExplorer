import {
  characters,
  characterById,
  dynasties,
  dynastyById,
  eventById,
  events,
  familyTrees,
  familyTreeById,
  glossary,
  glossaryById,
  lessons,
  lessonById,
  locations,
  locationById,
  quizzes,
  quizById,
  stories,
  storyById,
  timelines,
  sourceById,
} from '../data';

export const SITE_URL = 'https://hindumythologyguide.com';
export const SITE_NAME = 'Hindu Mythology Guide';
const DEFAULT_DESC =
  'Explore Hindu mythology as one connected universe: interactive timelines, family trees, character profiles, stories from the Ramayana, Mahabharata and Puranas, quizzes and a sacred-geography map.';

export interface PageMeta {
  title: string;
  description: string;
  noindex?: boolean;
}

type Named = { name?: string; title?: string; term?: string; textName?: string } | undefined;

function lookupName(type: string, id: string): string {
  const found: Named =
    type === 'char' ? characterById.get(id)
    : type === 'event' ? eventById.get(id)
    : type === 'story' ? storyById.get(id)
    : type === 'term' ? glossaryById.get(id)
    : type === 'place' ? locationById.get(id)
    : type === 'dynasty' ? dynastyById.get(id)
    : type === 'tree' ? familyTreeById.get(id)
    : type === 'source' ? sourceById.get(id)
    : undefined;
  return found?.name ?? found?.title ?? found?.term ?? found?.textName ?? id.replace(/-/g, ' ');
}

/** Remove [[type:id|label]] markup, leaving readable text. */
export function plain(text: string): string {
  return text
    .replace(/\[\[([a-z]+):([^|\]]+)(?:\|([^\]]+))?\]\]/g, (_m, t: string, id: string, label?: string) => label ?? lookupName(t, id))
    .replace(/\s+/g, ' ')
    .trim();
}

function clip(text: string, max = 158): string {
  const s = plain(text);
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  const sp = cut.lastIndexOf(' ');
  return `${cut.slice(0, sp > 100 ? sp : cut.length).replace(/[,;:\s]+$/, '')}…`;
}

const STATIC: Record<string, PageMeta> = {
  '/': { title: `${SITE_NAME} – Interactive Hindu Mythology Explorer`, description: DEFAULT_DESC },
  '/universe': { title: `The Mythological Universe | ${SITE_NAME}`, description: 'Seven pathways into Hindu mythology: cosmic origins, gods and avatars, sages, dynasties, the Ramayana, the Mahabharata and sacred places.' },
  '/timeline': { title: `Hindu Mythology Timeline | ${SITE_NAME}`, description: 'An interactive timeline of Hindu mythology in narrative order, from creation through the Ramayana and Mahabharata, with parallel lanes and filters.' },
  '/family-tree': { title: `Hindu Mythology Family Trees | ${SITE_NAME}`, description: 'Interactive family trees of the Solar and Lunar dynasties, the Kuru and Yadava lines, Rama’s family, Ravana’s lineage, the sages and the divine families.' },
  '/characters': { title: `Hindu Mythology Characters | ${SITE_NAME}`, description: 'Profiles of more than 170 gods, sages, kings, heroes and demons from the Vedas, Puranas, Ramayana and Mahabharata, with family, stories and sources.' },
  '/stories': { title: `Hindu Mythology Stories | ${SITE_NAME}`, description: 'Chapter-by-chapter retellings of Samudra Manthana, Narasimha, Vamana, the Ramayana, the Mahabharata and more, with different traditions shown side by side.' },
  '/gods-avatars': { title: `Gods and Avatars | ${SITE_NAME}`, description: 'The Trimurti, the devas, the goddesses and the avatars of Vishnu, and how they relate to one another across traditions.' },
  '/dynasties': { title: `Dynasties of Hindu Mythology | ${SITE_NAME}`, description: 'The Suryavansha (Solar), Chandravansha (Lunar), Kuru, Yadava and other royal lineages of Hindu mythology.' },
  '/relationships': { title: `How Everything Connects – Relationship Explorer | ${SITE_NAME}`, description: 'Pick any two characters from Hindu mythology and see exactly how they are related, step by step, with kinship terms and sources.' },
  '/map': { title: `Sacred Geography Map | ${SITE_NAME}`, description: 'A map of places in Hindu mythology, from Ayodhya and Lanka to Kurukshetra, with how traditions identify them today.' },
  '/learn': { title: `Learn Hindu Mythology – 6-Module Course | ${SITE_NAME}`, description: 'A structured six-module curriculum on Hindu mythology with readings, relationship maps, recaps and quizzes.' },
  '/quizzes': { title: `Hindu Mythology Quizzes | ${SITE_NAME}`, description: 'Test your knowledge of Hindu mythology with multiple-choice, true/false, relationship and ordering quizzes, with explanations.' },
  '/glossary': { title: `Glossary of Hindu Mythology Terms | ${SITE_NAME}`, description: 'Plain-language definitions of dharma, karma, avatar, yuga and other key terms in Hindu mythology.' },
  '/compare': { title: `Compare Characters | ${SITE_NAME}`, description: 'Compare any two characters from Hindu mythology side by side.' },
  '/compare-traditions': { title: `Compare Traditions and Versions | ${SITE_NAME}`, description: 'See how the Valmiki Ramayana, Vyasa’s Mahabharata, the Puranas and regional tellings differ on the same story.' },
  '/sources': { title: `Sources and Confidence Levels | ${SITE_NAME}`, description: 'The texts behind this guide and how each claim is graded, from directly attested to later tradition and disputed.' },
  '/search': { title: `Search | ${SITE_NAME}`, description: DEFAULT_DESC, noindex: true },
  '/progress': { title: `Your Progress | ${SITE_NAME}`, description: DEFAULT_DESC, noindex: true },
  '/settings': { title: `Settings | ${SITE_NAME}`, description: DEFAULT_DESC, noindex: true },
};

/** Meta for a pathname, or null when unknown (falls back to the default). */
export function metaFor(pathname: string): PageMeta | null {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  if (STATIC[path]) return STATIC[path];
  const [, section, id, chapter] = path.split('/');
  switch (section) {
    case 'characters': {
      const c = characterById.get(id);
      return c ? { title: `${c.name} – Story, Family and Sources | ${SITE_NAME}`, description: clip(`${c.title}. ${c.description}`) } : null;
    }
    case 'stories': {
      const s = storyById.get(id);
      if (!s) return null;
      const ch = chapter ? s.chapters[parseInt(chapter, 10) - 1] : null;
      return {
        title: `${ch ? `${s.title}: ${ch.title}` : `${s.title}${s.subtitle ? ` – ${s.subtitle}` : ''}`} | ${SITE_NAME}`,
        description: clip(ch ? ch.narrative[0] ?? s.introduction : s.introduction),
      };
    }
    case 'events': {
      const e = eventById.get(id);
      return e ? { title: `${e.title} | ${SITE_NAME}`, description: clip(e.summary) } : null;
    }
    case 'dynasties': {
      const d = dynastyById.get(id);
      return d ? { title: `${d.name} | ${SITE_NAME}`, description: clip(d.description) } : null;
    }
    case 'family-tree': {
      const t = familyTreeById.get(id);
      return t ? { title: `${t.title} – Family Tree | ${SITE_NAME}`, description: clip(t.description) } : null;
    }
    case 'timeline': {
      const t = timelines.find((x) => x.id === id);
      return t ? { title: `${t.title} – Timeline | ${SITE_NAME}`, description: clip(t.description) } : null;
    }
    case 'learn': {
      const l = lessonById.get(id);
      return l ? { title: `${l.title} – ${l.subtitle} | ${SITE_NAME}`, description: clip(l.intro) } : null;
    }
    case 'quizzes': {
      const q = quizById.get(id);
      return q ? { title: `${q.title} – Quiz | ${SITE_NAME}`, description: `Test your knowledge: ${q.title}. Five questions with explanations.` } : null;
    }
    case 'glossary': {
      const g = glossaryById.get(id);
      return g ? { title: `${g.term} – Meaning | ${SITE_NAME}`, description: clip(g.short) } : null;
    }
    case 'map': {
      const l = locationById.get(id);
      return l ? { title: `${l.name} – Sacred Geography | ${SITE_NAME}`, description: clip(l.significance) } : null;
    }
    case 'compare-traditions': {
      const s = storyById.get(id);
      return s ? { title: `${s.title}: Different Traditions | ${SITE_NAME}`, description: `How different texts and traditions tell the story of ${s.title}, compared side by side.` } : null;
    }
    default:
      return null;
  }
}

/** All indexable URL paths, for the sitemap. */
export function sitemapPaths(): string[] {
  const out = Object.entries(STATIC).filter(([, m]) => !m.noindex).map(([p]) => p);
  out.push(...characters.map((c) => `/characters/${c.id}`));
  out.push(...stories.map((s) => `/stories/${s.id}`));
  out.push(...stories.flatMap((s) => s.chapters.map((_, i) => `/stories/${s.id}/${i + 1}`)));
  out.push(...stories.filter((s) => s.variations?.length).map((s) => `/compare-traditions/${s.id}`));
  out.push(...events.map((e) => `/events/${e.id}`));
  out.push(...dynasties.map((d) => `/dynasties/${d.id}`));
  out.push(...familyTrees.map((t) => `/family-tree/${t.id}`));
  out.push(...timelines.map((t) => `/timeline/${t.id}`));
  out.push(...lessons.map((l) => `/learn/${l.id}`));
  out.push(...quizzes.map((q) => `/quizzes/${q.id}`));
  out.push(...glossary.map((g) => `/glossary/${g.id}`));
  out.push(...locations.map((l) => `/map/${l.id}`));
  return out;
}

/** Apply title, description, canonical and robots tags to the document. */
export function applyMeta(pathname: string) {
  const m = metaFor(pathname) ?? { title: `Page not found | ${SITE_NAME}`, description: DEFAULT_DESC, noindex: true };
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const url = `${SITE_URL}${path === '/' ? '/' : path}`;
  document.title = m.title;
  const set = (sel: string, attr: string, key: string, value: string, tag = 'meta') => {
    let el = document.head.querySelector<HTMLElement>(sel);
    if (!el) {
      el = document.createElement(tag);
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute(tag === 'link' ? 'href' : 'content', value);
  };
  set('meta[name="description"]', 'name', 'description', m.description);
  set('meta[name="robots"]', 'name', 'robots', m.noindex ? 'noindex, follow' : 'index, follow');
  set('meta[property="og:title"]', 'property', 'og:title', m.title);
  set('meta[property="og:description"]', 'property', 'og:description', m.description);
  set('meta[property="og:url"]', 'property', 'og:url', url);
  set('meta[name="twitter:title"]', 'name', 'twitter:title', m.title);
  set('meta[name="twitter:description"]', 'name', 'twitter:description', m.description);
  set('link[rel="canonical"]', 'rel', 'canonical', url, 'link');
}
