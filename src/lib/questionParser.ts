import { characterById, eventById, storyById } from '../data';
import type { RelationshipType } from '../data/types';
import { childrenOf, edgesOf, name, parentsOf, siblingsOf, spousesOf, type Edge } from './graph';
import { findConnection } from './kinship';
import { findCharacters, findEvent, findStory, norm } from './names';

export interface DirectAnswer {
  question: string;
  answer: string;
  /** Links to show with the answer. */
  links: { label: string; to: string }[];
  /** Optional step-by-step relationship path. */
  path?: Edge[];
}

const PARENT_KIND: Record<string, RelationshipType[] | 'any'> = {
  father: ['parent', 'divine-parent', 'niyoga-parent', 'legal-parent', 'adoptive-parent', 'mind-born'],
  mother: ['parent', 'adoptive-parent'],
  parents: 'any',
  parent: 'any',
};

const MALE_HINT = /(father|husband|son|brother)/;
const FEMALE = new Set(['devi', 'saraswati', 'lakshmi', 'sati', 'parvati', 'durga', 'ganga', 'aditi', 'diti', 'anasuya', 'tara-brihaspati', 'ahalya', 'kausalya', 'kaikeyi', 'sumitra', 'sita', 'urmila', 'mandavi', 'shrutakirti', 'anjana', 'tara-kishkindha', 'shabari', 'kaikesi', 'mandodari', 'shurpanakha', 'ila', 'urvashi', 'devayani', 'sharmishtha', 'shakuntala', 'satyavati', 'amba', 'ambika', 'ambalika', 'gandhari', 'kunti', 'madri', 'draupadi', 'kripi', 'hidimbi', 'subhadra', 'uttara', 'devaki', 'yashoda', 'rukmini']);

export const isFemale = (id: string) => FEMALE.has(id);

function list(ids: string[]) {
  const n = ids.map(name);
  if (n.length <= 1) return n.join('');
  return `${n.slice(0, -1).join(', ')} and ${n[n.length - 1]}`;
}

function charLinks(ids: string[]) {
  return ids.map((id) => ({ label: name(id), to: `/characters/${id}` }));
}

export function answerQuestion(raw: string): DirectAnswer | null {
  const q = norm(raw);
  if (q.length < 4) return null;
  const chars = findCharacters(raw);

  // How are X and Y related?
  if (/(how (are|is|was|were)|relation|related|connect)/.test(q) && chars.length >= 2) {
    const [a, b] = chars;
    const r = findConnection(a, b);
    if (!r) return { question: raw, answer: `No recorded connection between ${name(a)} and ${name(b)} yet.`, links: charLinks([a, b]) };
    const alt = r.alternatives.length ? ` Also: ${r.alternatives.map((x) => x.label).join('; ')}.` : '';
    return {
      question: raw,
      answer: r.familyOnly ? `${name(b)} is ${name(a)}'s ${r.label}.${alt}` : `${name(a)} and ${name(b)} are ${r.label}.${alt}`,
      links: [...charLinks([a, b]), { label: 'Open in Relationship Explorer', to: `/relationships/${a}-${b}` }],
      path: r.path,
    };
  }

  // Who cursed / killed X; whom did X curse / kill
  const act = /(curse|kill|slay|slew|boon)/.exec(q)?.[1];
  if (act && chars.length >= 1) {
    const type: RelationshipType = act === 'curse' ? 'curse' : act === 'boon' ? 'boon' : 'killed';
    const target = chars[0];
    const passive = /^who (cursed|killed|slew|gave)|who (granted|gave) .* boon/.test(q) || new RegExp(`(cursed|killed|slew|slain) ${''}`).test(q) && q.indexOf(act) < q.indexOf(name(target).toLowerCase());
    const incoming = edgesOf(target).filter((e) => e.rel.type === type && e.dir === 'in');
    const outgoing = edgesOf(target).filter((e) => e.rel.type === type && e.dir === 'out');
    const use = passive || !outgoing.length ? incoming : outgoing;
    if (use.length) {
      const verb = type === 'curse' ? 'cursed' : type === 'boon' ? 'granted a boon to' : 'killed';
      const sentences = use.map((e) => (e.dir === 'in' ? `${name(e.to)} ${verb} ${name(target)}: ${e.rel.explanation}` : `${name(target)} ${verb} ${name(e.to)}: ${e.rel.explanation}`));
      return { question: raw, answer: sentences.join(' '), links: charLinks([target, ...use.map((e) => e.to)]) };
    }
  }

  // Parent / spouse / children / siblings of X
  const kin = /(father|mother|parents?|wife|wives|husband|spouse|consort|children|sons?|daughters?|brothers?|sisters?|siblings?|teacher|guru|grandfather|ancestors?)/.exec(q)?.[1];
  if (kin && chars.length >= 1) {
    const id = chars[chars.length === 1 ? 0 : 0];
    const c = characterById.get(id)!;
    let edges: Edge[] = [];
    let label = kin;
    if (kin in PARENT_KIND || kin === 'parents') {
      const types = PARENT_KIND[kin];
      edges = parentsOf(id).filter((e) => types === 'any' || types.includes(e.rel.type));
      if (kin === 'father') edges = edges.filter((e) => !isFemale(e.to));
      if (kin === 'mother') edges = edges.filter((e) => isFemale(e.to));
    } else if (/wife|wives|husband|spouse|consort/.test(kin)) {
      edges = spousesOf(id);
      label = 'spouse';
    } else if (/children|son|daughter/.test(kin)) {
      edges = childrenOf(id);
      if (/^son/.test(kin)) edges = edges.filter((e) => !isFemale(e.to));
      if (/^daughter/.test(kin)) edges = edges.filter((e) => isFemale(e.to));
    } else if (/brother|sister|sibling/.test(kin)) {
      edges = siblingsOf(id);
      if (/brother/.test(kin)) edges = edges.filter((e) => !isFemale(e.to));
      if (/sister/.test(kin)) edges = edges.filter((e) => isFemale(e.to));
    } else if (/teacher|guru/.test(kin)) {
      edges = edgesOf(id).filter((e) => e.rel.type === 'teacher' && e.dir === 'in');
    } else if (/grandfather/.test(kin)) {
      edges = parentsOf(id).flatMap((p) => parentsOf(p.to)).filter((e) => !isFemale(e.to));
    } else if (/ancestor/.test(kin)) {
      edges = parentsOf(id);
    }
    void MALE_HINT;
    const ids = [...new Set(edges.map((e) => e.to))];
    if (ids.length) {
      const detail = edges
        .filter((e, i) => edges.findIndex((x) => x.to === e.to) === i)
        .map((e) => `${name(e.to)} — ${e.rel.explanation}`)
        .join(' ');
      return {
        question: raw,
        answer: `${c.name}'s ${label}${ids.length > 1 && !label.endsWith('s') ? 's' : ''}: ${list(ids)}. ${detail}`,
        links: [...charLinks([id, ...ids]), { label: 'See family tree', to: `/characters/${id}#family` }],
      };
    }
  }

  // What happened before / after / during X
  const when = /\bbefore\b/.test(q) ? 'before' : /\bafter\b/.test(q) ? 'after' : /\bduring\b/.test(q) ? 'during' : /happen/.test(q) ? 'happened' : undefined;
  if (when) {
    const evId = findEvent(raw);
    if (when === 'after' && chars.length && /war|death|end|later|fate/.test(q)) {
      const c = characterById.get(chars[0])!;
      if (c.deathOrFate) return { question: raw, answer: `${c.name}: ${c.deathOrFate}`, links: charLinks([c.id]) };
    }
    // "before Rama's birth" → birth event of character
    let ev = evId ? eventById.get(evId) : undefined;
    if (!ev && chars.length) {
      const target = chars[0];
      ev = [...eventById.values()].filter((e) => e.characters.includes(target)).sort((a, b) => a.order - b.order)[0];
      if (/birth|born/.test(q)) ev = [...eventById.values()].find((e) => e.category === 'birth' && e.characters[0] === target) ?? ev;
    }
    if (ev) {
      if (when === 'before' && ev.preceding?.length) {
        const pre = ev.preceding.map((p) => eventById.get(p)!).filter(Boolean);
        return { question: raw, answer: `Before "${ev.title}": ${pre.map((p) => `${p.title} — ${p.summary}`).join(' ')}`, links: [ev, ...pre].map((e) => ({ label: e.title, to: `/events/${e.id}` })) };
      }
      if (when === 'after' && ev.following?.length) {
        const fol = ev.following.map((p) => eventById.get(p)!).filter(Boolean);
        return { question: raw, answer: `After "${ev.title}": ${fol.map((p) => `${p.title} — ${p.summary}`).join(' ')}`, links: [ev, ...fol].map((e) => ({ label: e.title, to: `/events/${e.id}` })) };
      }
      const st = ev.stories?.[0] ? storyById.get(ev.stories[0]) : undefined;
      return { question: raw, answer: `${ev.title}: ${ev.summary}`, links: [{ label: ev.title, to: `/events/${ev.id}` }, ...(st ? [{ label: `Read: ${st.title}`, to: `/stories/${st.id}` }] : [])] };
    }
    const sid = findStory(raw);
    if (sid) {
      const s = storyById.get(sid)!;
      return { question: raw, answer: `${s.title}: ${s.introduction}`, links: [{ label: `Read: ${s.title}`, to: `/stories/${s.id}` }] };
    }
  }

  // "Who is X?"
  if (/^(who|what) (is|was|are|were)/.test(q) && chars.length === 1) {
    const c = characterById.get(chars[0])!;
    return { question: raw, answer: `${c.name} — ${c.title}. ${c.description}`, links: charLinks([c.id]) };
  }
  return null;
}
