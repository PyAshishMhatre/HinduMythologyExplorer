import { characters, events, stories } from '../data';

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’']/g, "'")
    .replace(/\(.*?\)/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

interface NameEntry {
  key: string;
  id: string;
}
const charNames: NameEntry[] = [];
for (const c of characters) {
  const all = [c.name, ...(c.alternateNames ?? [])];
  for (const n of all) {
    const k = norm(n);
    if (k.length >= 3) charNames.push({ key: k, id: c.id });
  }
  // id as name (e.g. "vaivasvata manu")
  charNames.push({ key: c.id.replace(/-/g, ' '), id: c.id });
}
// common spelling variants
const variants: Record<string, string> = {
  surpanakha: 'shurpanakha', vasishtha: 'vashistha', vasistha: 'vashistha', ravan: 'ravana', ram: 'rama', sita: 'sita',
  krsna: 'krishna', arjun: 'arjuna', bhim: 'bhima', karan: 'karna', duryodhan: 'duryodhana', hanumanji: 'hanuman',
  draupati: 'draupadi', yudhisthira: 'yudhishthira', bhisma: 'bhishma', dronacharya: 'drona', kumbhkaran: 'kumbhakarna',
  vibhishan: 'vibhishana', lakshman: 'lakshmana', laxman: 'lakshmana', dashrath: 'dasharatha', kaushalya: 'kausalya',
  ganesh: 'ganesha', kartikeya: 'kartikeya', murugan: 'kartikeya', parashuram: 'parashurama', vishwamitra: 'vishvamitra',
  shantanu: 'shantanu', santanu: 'shantanu', ashwathama: 'ashwatthama', gandhari: 'gandhari', shakuni: 'shakuni',
};
for (const [k, id] of Object.entries(variants)) charNames.push({ key: k, id });
charNames.sort((a, b) => b.key.length - a.key.length);

/** Find character ids mentioned in free text, in order of appearance. */
export function findCharacters(text: string): string[] {
  const q = ` ${norm(text).replace(/[^a-z0-9' ]/g, ' ')} `.replace(/'s /g, ' ');
  const hits: { id: string; pos: number; len: number }[] = [];
  const taken: [number, number][] = [];
  for (const { key, id } of charNames) {
    let from = 0;
    while (true) {
      const pos = q.indexOf(` ${key} `, from);
      if (pos < 0) break;
      const end = pos + key.length + 1;
      if (!taken.some(([a, b]) => pos < b && end > a)) {
        taken.push([pos, end]);
        hits.push({ id, pos, len: key.length });
      }
      from = pos + 1;
    }
  }
  const out: string[] = [];
  for (const h of hits.sort((a, b) => a.pos - b.pos)) if (!out.includes(h.id)) out.push(h.id);
  return out;
}

const eventKeys = events.map((e) => ({ id: e.id, words: norm(e.title).split(/[^a-z]+/).filter((w) => w.length > 3) }));
const storyKeys = stories.map((s) => ({ id: s.id, words: norm(`${s.title} ${s.subtitle ?? ''}`).split(/[^a-z]+/).filter((w) => w.length > 3) }));

function bestByWords(text: string, keys: { id: string; words: string[] }[]) {
  const q = norm(text);
  let best: { id: string; score: number } | null = null;
  for (const k of keys) {
    const score = k.words.filter((w) => q.includes(w)).length / Math.max(2, k.words.length);
    if (score > 0 && (!best || score > best.score)) best = { id: k.id, score };
  }
  return best && best.score >= 0.25 ? best.id : null;
}
export const findEvent = (t: string) => bestByWords(t, eventKeys);
export const findStory = (t: string) => bestByWords(t, storyKeys);
export { norm };
