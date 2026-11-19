import { edgesOf, FAMILY_TYPES, PARENT_TYPES, type Edge } from './graph';
import type { RelationshipType } from '../data/types';

export interface PathResult {
  path: Edge[];
  label: string;
  familyOnly: boolean;
}

/** Edge weights: prefer blood/legal family; penalise narrative links so kin paths win. */
function weight(e: Edge): number {
  const t = e.rel.type;
  if (t === 'parent' || t === 'sibling' || t === 'half-sibling') return 1;
  if (PARENT_TYPES.includes(t)) return 1.2;
  if (t === 'spouse') return 1.5;
  return 3;
}

/** Dijkstra over the relationship graph (small graph, simple O(n^2) is fine). */
function search(a: string, b: string, allowed: (t: RelationshipType) => boolean): Edge[] | null {
  if (a === b) return [];
  const dist = new Map<string, number>([[a, 0]]);
  const prev = new Map<string, Edge>();
  const visited = new Set<string>();
  const frontier = new Set<string>([a]);
  while (frontier.size) {
    let cur = '';
    let best = Infinity;
    for (const id of frontier) {
      const d = dist.get(id)!;
      if (d < best) {
        best = d;
        cur = id;
      }
    }
    frontier.delete(cur);
    if (cur === b) break;
    visited.add(cur);
    for (const e of edgesOf(cur)) {
      if (!allowed(e.rel.type) || visited.has(e.to)) continue;
      const nd = best + weight(e);
      if (nd < (dist.get(e.to) ?? Infinity)) {
        dist.set(e.to, nd);
        prev.set(e.to, e);
        frontier.add(e.to);
      }
    }
  }
  if (!prev.has(b)) return null;
  const path: Edge[] = [];
  let cur = b;
  while (cur !== a) {
    const e = prev.get(cur)!;
    path.unshift(e);
    cur = e.from;
  }
  return path;
}

export interface ConnectionResult extends PathResult {
  /** Other meaningful connections (e.g. by marriage, or narrative), shown as "also". */
  alternatives: PathResult[];
}

const sameRoute = (x: Edge[], y: Edge[]) => x.length === y.length && x.every((e, i) => e.rel.id === y[i].rel.id);

export function findConnection(a: string, b: string): ConnectionResult | null {
  const results: PathResult[] = [];
  const blood = search(a, b, (t) => FAMILY_TYPES.includes(t) && t !== 'spouse');
  if (blood) results.push({ path: blood, label: kinshipLabel(blood), familyOnly: true });
  const family = search(a, b, (t) => FAMILY_TYPES.includes(t));
  if (family && !results.some((r) => sameRoute(r.path, family)))
    results.push({ path: family, label: kinshipLabel(family), familyOnly: true });
  const any = search(a, b, () => true);
  if (any && !results.some((r) => sameRoute(r.path, any)) && (!results.length || any.length < results[0].path.length))
    results.push({ path: any, label: any.length === 1 ? 'direct connection' : `connected in ${any.length} steps`, familyOnly: false });
  if (!results.length) return null;
  // Prefer: blood > marriage > narrative, but if a direct (1-step) non-family link exists and family path is long, keep family primary anyway.
  const [primary, ...alternatives] = results;
  return { ...primary, alternatives };
}

const ORD = ['', '', 'grand', 'great-grand', 'great-great-grand'];
function generational(n: number, base: string) {
  if (n < ORD.length) return `${ORD[n]}${base}`;
  return `${n - 2}× great-grand${base}`;
}

/**
 * Turn a family path into a kinship term, describing B relative to A
 * (i.e. "B is A's ___").
 */
export function kinshipLabel(path: Edge[]): string {
  if (path.length === 0) return 'same person';
  // Collapse sibling edges into up+down for counting.
  let up = 0;
  let down = 0;
  let spouse = 0;
  let abridged = false;
  let i = 0;
  // pattern: up* (sibling)? down*  with optional spouse at ends
  const dirs: string[] = [];
  for (const e of path) {
    if (e.rel.type === 'ancestor-of') abridged = true;
    if (e.rel.type === 'spouse') dirs.push('s');
    else if (e.rel.type === 'sibling' || e.rel.type === 'half-sibling') dirs.push('x');
    else dirs.push(e.dir === 'up' ? 'u' : 'd');
  }
  const pattern = dirs.join('');
  // Validate shape u* x? d* with spouse only at ends
  const m = /^(s?)(u*)(x?)(d*)(s?)$/.exec(pattern);
  if (!m) return `related through ${path.length} family links`;
  const [, s1, u, x, d, s2] = m;
  up = u.length + (x ? 1 : 0);
  down = d.length + (x ? 1 : 0);
  spouse = (s1 ? 1 : 0) + (s2 ? 1 : 0);
  void i;
  const suffix = abridged ? ' (lineage abridged)' : '';
  let term: string;
  if (up === 0 && down === 0) term = spouse ? 'spouse' : 'same person';
  else if (down === 0) term = up === 1 ? 'parent' : generational(up, 'parent');
  else if (up === 0) term = down === 1 ? 'child' : generational(down, 'child');
  else if (up === 1 && down === 1) term = x ? (path.find((e) => e.rel.type === 'half-sibling') ? 'half-sibling' : 'sibling') : 'sibling';
  else if (down === 1) term = `${greatPrefix(up - 2)}uncle / aunt`;
  else if (up === 1) term = `${greatPrefix(down - 2)}nephew / niece`;
  else {
    const degree = Math.min(up, down) - 1;
    const removed = Math.abs(up - down);
    const ord = ['', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh'][degree] ?? `${degree}th`;
    term = `${ord} cousin${removed ? `, ${removed}× removed` : ''}`;
  }
  if (spouse && term !== 'spouse') {
    if (s2 && !s1) term = `spouse of ${article(term)}`;
    else if (s1 && !s2) term = `${term} of spouse`;
    else term = `${term} (by marriage)`;
    if (/sibling/.test(term)) term += ' — a sibling-in-law';
    else if (/^(spouse of a |)child|child of spouse/.test(term)) term += ' — a child-in-law / step-relation';
  }
  return term + suffix;
}

function greatPrefix(n: number) {
  if (n <= 0) return '';
  if (n === 1) return 'great-';
  return `${n}× great-`;
}

function article(t: string) {
  return /^[aeiou]/i.test(t) ? `an ${t}` : `a ${t}`;
}
