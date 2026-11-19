import { relationships } from '../data/relationships';
import { characterById } from '../data/characters';
import type { Relationship, RelationshipType } from '../data/types';

export const PARENT_TYPES: RelationshipType[] = [
  'parent',
  'divine-parent',
  'adoptive-parent',
  'niyoga-parent',
  'legal-parent',
  'mind-born',
  'ancestor-of',
];
export const SYMMETRIC_TYPES: RelationshipType[] = ['spouse', 'sibling', 'half-sibling', 'friend', 'enemy', 'ally'];
export const FAMILY_TYPES: RelationshipType[] = [...PARENT_TYPES, 'spouse', 'sibling', 'half-sibling'];

/** A traversable edge from the perspective of `from`. */
export interface Edge {
  from: string;
  to: string;
  rel: Relationship;
  /** 'up' = to is an ancestor/parent of from, 'down' = to is child, 'side' = symmetric, 'out'/'in' = directed non-family */
  dir: 'up' | 'down' | 'side' | 'out' | 'in';
}

const adjacency = new Map<string, Edge[]>();
function push(id: string, e: Edge) {
  const list = adjacency.get(id);
  if (list) list.push(e);
  else adjacency.set(id, [e]);
}

for (const r of relationships) {
  if (PARENT_TYPES.includes(r.type)) {
    push(r.target, { from: r.target, to: r.source, rel: r, dir: 'up' });
    push(r.source, { from: r.source, to: r.target, rel: r, dir: 'down' });
  } else if (SYMMETRIC_TYPES.includes(r.type)) {
    push(r.source, { from: r.source, to: r.target, rel: r, dir: 'side' });
    push(r.target, { from: r.target, to: r.source, rel: r, dir: 'side' });
  } else {
    push(r.source, { from: r.source, to: r.target, rel: r, dir: 'out' });
    push(r.target, { from: r.target, to: r.source, rel: r, dir: 'in' });
  }
}

export function edgesOf(id: string): Edge[] {
  return adjacency.get(id) ?? [];
}

function uniq(ids: string[]) {
  return [...new Set(ids)];
}

export function parentsOf(id: string, types: RelationshipType[] = PARENT_TYPES): Edge[] {
  return edgesOf(id).filter((e) => e.dir === 'up' && types.includes(e.rel.type));
}
export function childrenOf(id: string, types: RelationshipType[] = PARENT_TYPES): Edge[] {
  return edgesOf(id).filter((e) => e.dir === 'down' && types.includes(e.rel.type));
}
export function spousesOf(id: string): Edge[] {
  return edgesOf(id).filter((e) => e.rel.type === 'spouse');
}
export function siblingsOf(id: string): Edge[] {
  return edgesOf(id).filter((e) => e.rel.type === 'sibling' || e.rel.type === 'half-sibling');
}
export function otherRelations(id: string): Edge[] {
  return edgesOf(id).filter((e) => !FAMILY_TYPES.includes(e.rel.type));
}

export function ancestorsOf(id: string): string[] {
  const seen = new Set<string>();
  const stack = [id];
  while (stack.length) {
    const cur = stack.pop()!;
    for (const e of parentsOf(cur)) {
      if (!seen.has(e.to)) {
        seen.add(e.to);
        stack.push(e.to);
      }
    }
  }
  return [...seen];
}

export function descendantsOf(id: string): string[] {
  const seen = new Set<string>();
  const stack = [id];
  while (stack.length) {
    const cur = stack.pop()!;
    for (const e of childrenOf(cur)) {
      if (!seen.has(e.to)) {
        seen.add(e.to);
        stack.push(e.to);
      }
    }
  }
  return [...seen];
}

export function neighborIds(id: string, types?: RelationshipType[]): string[] {
  return uniq(edgesOf(id).filter((e) => !types || types.includes(e.rel.type)).map((e) => e.to));
}

export function relationshipsAmong(ids: string[]): Relationship[] {
  const set = new Set(ids);
  return relationships.filter((r) => set.has(r.source) && set.has(r.target));
}

export function name(id: string): string {
  return characterById.get(id)?.name ?? id;
}

/** Human-readable label for an edge from the perspective of `from` → "X is <label> of from" */
export function edgeLabel(e: Edge): string {
  const t = e.rel.type;
  if (e.rel.label && e.dir !== 'up' && e.dir !== 'in') return e.rel.label;
  switch (t) {
    case 'parent':
      return e.dir === 'up' ? 'parent' : 'child';
    case 'divine-parent':
      return e.dir === 'up' ? 'divine parent' : 'divine-born child';
    case 'adoptive-parent':
      return e.dir === 'up' ? 'adoptive parent' : 'adopted child';
    case 'niyoga-parent':
      return e.dir === 'up' ? 'biological father (niyoga)' : 'child by niyoga';
    case 'legal-parent':
      return e.dir === 'up' ? 'legal father' : 'legal child';
    case 'mind-born':
      return e.dir === 'up' ? 'mind-born from' : 'mind-born son';
    case 'ancestor-of':
      return e.dir === 'up' ? 'ancestor (abridged)' : 'descendant (abridged)';
    case 'spouse':
      return 'spouse';
    case 'sibling':
      return 'sibling';
    case 'half-sibling':
      return 'half-sibling';
    case 'teacher':
      return e.dir === 'out' ? 'student' : 'teacher';
    case 'friend':
      return 'friend';
    case 'enemy':
      return 'enemy';
    case 'ally':
      return 'ally';
    case 'avatar-of':
      return e.dir === 'out' ? 'avatar source' : 'avatar';
    case 'manifestation-of':
      return e.dir === 'out' ? 'manifests' : 'manifestation';
    case 'consort-of':
      return 'consort';
    case 'curse':
      return e.dir === 'out' ? 'cursed' : 'cursed by';
    case 'boon':
      return e.dir === 'out' ? 'granted boon to' : 'received boon from';
    case 'killed':
      return e.dir === 'out' ? 'killed' : 'killed by';
    default:
      return e.rel.label ?? 'connected';
  }
}

/** Sentence for an edge: "<to> is the <label> of <from>" in natural terms. */
export function edgeSentence(e: Edge): string {
  const a = name(e.from);
  const b = name(e.to);
  const t = e.rel.type;
  const L = e.rel.label;
  switch (t) {
    case 'parent':
    case 'divine-parent':
    case 'adoptive-parent':
    case 'niyoga-parent':
    case 'legal-parent':
    case 'mind-born':
    case 'ancestor-of': {
      const kind = edgeLabel({ ...e, dir: 'up' });
      return e.dir === 'up' ? `${b} is the ${kind} of ${a}` : `${b} is the ${edgeLabel({ ...e, dir: 'down' })} of ${a}`;
    }
    case 'spouse':
      return `${a} and ${b} are married`;
    case 'sibling':
      return `${a} and ${b} are ${L ?? 'siblings'}`;
    case 'half-sibling':
      return `${a} and ${b} are ${L ?? 'half-siblings'}`;
    case 'friend':
      return `${a} and ${b} are ${L ?? 'friends'}`;
    case 'enemy':
      return `${a} and ${b} are ${L ?? 'enemies'}`;
    case 'ally':
      return e.dir === 'side' && L ? `${name(e.rel.source)} is ${name(e.rel.target)}'s ${L}` : `${a} and ${b} are allies`;
    case 'teacher':
      return `${name(e.rel.source)} ${L ?? 'taught'} ${name(e.rel.target)}`.replace(' taught the', ' taught the');
    case 'avatar-of':
      return `${name(e.rel.source)} is an avatar of ${name(e.rel.target)}`;
    case 'manifestation-of':
      return `${name(e.rel.source)} is a manifestation of ${name(e.rel.target)}`;
    case 'curse':
      return `${name(e.rel.source)} cursed ${name(e.rel.target)}`;
    case 'boon':
      return `${name(e.rel.source)} granted a boon to ${name(e.rel.target)}`;
    case 'killed':
      return `${name(e.rel.source)} killed ${name(e.rel.target)}`;
    default:
      return `${name(e.rel.source)} — ${L ?? 'connected to'} — ${name(e.rel.target)}`;
  }
}
