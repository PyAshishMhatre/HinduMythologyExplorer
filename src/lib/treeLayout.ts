import dagre from 'dagre';
import { relationships } from '../data/relationships';
import type { Relationship, RelationshipType } from '../data/types';
import { PARENT_TYPES } from './graph';

export const NODE_W = 188;
export const NODE_H = 64;
export const UNION = 10;

export interface LNode {
  id: string;
  kind: 'person' | 'union';
  x: number;
  y: number;
  hiddenChildren?: number;
}
export interface LEdge {
  id: string;
  source: string;
  target: string;
  type: RelationshipType | 'union';
  rel?: Relationship;
}

export const EDGE_STYLE: Record<string, { stroke: string; dash?: string; width: number; label: string }> = {
  parent: { stroke: 'rgb(var(--c-gold))', width: 1.8, label: 'Biological parent' },
  'divine-parent': { stroke: 'rgb(var(--c-lapis))', dash: '7 5', width: 1.8, label: 'Divine parentage' },
  'adoptive-parent': { stroke: 'rgb(var(--c-jade))', dash: '2 5', width: 1.8, label: 'Adoptive / foster' },
  'niyoga-parent': { stroke: 'rgb(var(--c-saffron))', dash: '2 4', width: 1.8, label: 'Niyoga (biological, not legal)' },
  'legal-parent': { stroke: 'rgb(var(--c-muted))', dash: '6 3 2 3', width: 1.5, label: 'Legal / social father' },
  'mind-born': { stroke: 'rgb(var(--c-jade))', dash: '10 4', width: 1.5, label: 'Mind-born / emanation' },
  'ancestor-of': { stroke: 'rgb(var(--c-gold) / 0.7)', dash: '1 6', width: 2.2, label: 'Generations abridged' },
  spouse: { stroke: 'rgb(var(--c-bronze))', width: 1.4, label: 'Marriage' },
  union: { stroke: 'rgb(var(--c-gold))', width: 1.8, label: 'Child of the couple' },
  'manifestation-of': { stroke: 'rgb(var(--c-vermilion) / 0.8)', dash: '3 3', width: 1.3, label: 'Manifestation / form' },
  'avatar-of': { stroke: 'rgb(var(--c-lapis) / 0.8)', dash: '3 3', width: 1.3, label: 'Avatar' },
};

/** Compute which members are visible given collapsed nodes. */
export function visibleMembers(members: string[], collapsed: Set<string>): { visible: Set<string>; hiddenCount: Map<string, number> } {
  const set = new Set(members);
  const children = new Map<string, string[]>();
  for (const r of relationships) {
    if (PARENT_TYPES.includes(r.type) && set.has(r.source) && set.has(r.target)) {
      children.set(r.source, [...(children.get(r.source) ?? []), r.target]);
    }
  }
  const hidden = new Set<string>();
  const hiddenCount = new Map<string, number>();
  for (const c of collapsed) {
    const stack = [...(children.get(c) ?? [])];
    const local = new Set<string>();
    while (stack.length) {
      const x = stack.pop()!;
      if (local.has(x)) continue;
      local.add(x);
      stack.push(...(children.get(x) ?? []));
    }
    local.forEach((x) => hidden.add(x));
    hiddenCount.set(c, local.size);
  }
  // A hidden node stays visible if it has a parent that is visible and not collapsed (e.g. via mother).
  let changed = true;
  while (changed) {
    changed = false;
    for (const r of relationships) {
      if (!PARENT_TYPES.includes(r.type)) continue;
      if (hidden.has(r.target) && set.has(r.source) && !hidden.has(r.source) && !collapsed.has(r.source) && r.type !== 'ancestor-of') {
        // keep hidden only if every visible parent is collapsed
        const parents = relationships.filter((x) => PARENT_TYPES.includes(x.type) && x.target === r.target && set.has(x.source));
        if (parents.every((p) => hidden.has(p.source) || collapsed.has(p.source))) continue;
        hidden.delete(r.target);
        changed = true;
      }
    }
  }
  const visible = new Set(members.filter((m) => !hidden.has(m)));
  return { visible, hiddenCount };
}

export function hasChildrenIn(id: string, members: Set<string>) {
  return relationships.some((r) => PARENT_TYPES.includes(r.type) && r.source === id && members.has(r.target));
}

export function layoutTree(members: Set<string>, direction: 'TB' | 'LR' = 'TB'): { nodes: LNode[]; edges: LEdge[] } {
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: direction, nodesep: 28, ranksep: 70, marginx: 20, marginy: 20 });
  g.setDefaultEdgeLabel(() => ({}));
  for (const m of members) g.setNode(m, { width: NODE_W, height: NODE_H });

  const rels = relationships.filter((r) => members.has(r.source) && members.has(r.target));
  const spouses = rels.filter((r) => r.type === 'spouse');
  const isSpouse = (a: string, b: string) => spouses.some((s) => (s.source === a && s.target === b) || (s.source === b && s.target === a));
  const parentRels = rels.filter((r) => PARENT_TYPES.includes(r.type));
  const edges: LEdge[] = [];
  const unions = new Map<string, { a: string; b: string }>();
  const unionId = (a: string, b: string) => `u:${[a, b].sort().join('+')}`;

  const childIds = [...new Set(parentRels.map((r) => r.target))];
  for (const c of childIds) {
    const prs = parentRels.filter((r) => r.target === c);
    const used = new Set<string>();
    // find a spouse pair among parents linked by 'parent' type
    for (let i = 0; i < prs.length; i++) {
      for (let j = i + 1; j < prs.length; j++) {
        const a = prs[i], b = prs[j];
        if (used.has(a.id) || used.has(b.id)) continue;
        if (isSpouse(a.source, b.source) && a.type === 'parent' && b.type === 'parent') {
          const u = unionId(a.source, b.source);
          if (!unions.has(u)) unions.set(u, { a: a.source, b: b.source });
          edges.push({ id: `${u}->${c}`, source: u, target: c, type: 'union', rel: a });
          used.add(a.id);
          used.add(b.id);
        }
      }
    }
    for (const r of prs) {
      if (used.has(r.id)) continue;
      edges.push({ id: r.id, source: r.source, target: c, type: r.type, rel: r });
    }
  }
  // Childless marriages: a direct spouse link, not given to the layout engine as a rank constraint.
  const directSpouse: LEdge[] = [];
  for (const s of spouses) {
    const u = unionId(s.source, s.target);
    if (!unions.has(u)) directSpouse.push({ id: s.id, source: s.source, target: s.target, type: 'spouse', rel: s });
  }
  for (const [u, { a, b }] of unions) {
    g.setNode(u, { width: UNION, height: UNION });
    const sp = spouses.find((s) => (s.source === a && s.target === b) || (s.source === b && s.target === a));
    edges.push({ id: `${a}->${u}`, source: a, target: u, type: 'spouse', rel: sp });
    edges.push({ id: `${b}->${u}`, source: b, target: u, type: 'spouse', rel: sp });
  }
  for (const e of edges) g.setEdge(e.source, e.target, { minlen: e.type === 'spouse' ? 1 : 1, weight: e.type === 'spouse' ? 3 : e.type === 'union' ? 2 : 1 });
  dagre.layout(g);

  const nodes: LNode[] = g.nodes().map((id) => {
    const n = g.node(id);
    const isU = id.startsWith('u:');
    const w = isU ? UNION : NODE_W;
    const h = isU ? UNION : NODE_H;
    return { id, kind: isU ? 'union' : 'person', x: n.x - w / 2, y: n.y - h / 2 };
  });
  return { nodes, edges: [...edges, ...directSpouse.map((e) => ({ ...e, id: `direct:${e.id}` }))] };
}
