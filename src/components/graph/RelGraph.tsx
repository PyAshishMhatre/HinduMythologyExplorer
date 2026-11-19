import { useEffect, useMemo, useState } from 'react';
import { Background, Controls, ReactFlow, ReactFlowProvider, useReactFlow, MarkerType, type Edge, type Node } from '@xyflow/react';
import { useNavigate } from 'react-router-dom';
import dagre from 'dagre';
import { edgesOf, edgeSentence, relationshipsAmong, type Edge as GEdge } from '../../lib/graph';
import { NODE_H, NODE_W, EDGE_STYLE } from '../../lib/treeLayout';
import { nodeTypes } from './nodes';
import type { Relationship, RelationshipType } from '../../data/types';
import { characterById } from '../../data';
import { ConfidenceBadge } from '../ui';
import { Icon } from '../ui/Icon';
import { sourceById } from '../../data';

export const REL_COLOR: Partial<Record<RelationshipType, string>> = {
  parent: 'rgb(var(--c-gold))', 'divine-parent': 'rgb(var(--c-lapis))', 'adoptive-parent': 'rgb(var(--c-jade))', 'niyoga-parent': 'rgb(var(--c-saffron))',
  'legal-parent': 'rgb(var(--c-muted))', 'mind-born': 'rgb(var(--c-jade))', 'ancestor-of': 'rgb(var(--c-gold) / 0.7)', spouse: 'rgb(var(--c-bronze))',
  sibling: '#c8b6ff', 'half-sibling': '#a99be0', teacher: '#7fd1ff', friend: '#7be0a6', ally: '#62c48e', enemy: 'rgb(var(--c-vermilion))',
  killed: '#ff6b5a', curse: '#d27bff', boon: '#ffd36b', 'avatar-of': 'rgb(var(--c-lapis))', 'manifestation-of': '#ff9fb0', narrative: 'rgb(var(--c-muted))',
};

export const REL_LABEL: Partial<Record<RelationshipType, string>> = {
  parent: 'parent', 'divine-parent': 'divine parent', 'adoptive-parent': 'adoptive parent', 'niyoga-parent': 'niyoga father', 'legal-parent': 'legal father',
  'mind-born': 'mind-born', 'ancestor-of': 'ancestor', spouse: 'spouse', sibling: 'sibling', 'half-sibling': 'half-sibling', teacher: 'teacher',
  friend: 'friend', ally: 'ally', enemy: 'enemy', killed: 'killed', curse: 'cursed', boon: 'boon', 'avatar-of': 'avatar of', 'manifestation-of': 'form of', narrative: 'story link',
};

interface Props {
  focus: string[];
  /** Explicit relationship path to highlight. */
  path?: GEdge[];
  includeNeighbors?: boolean;
  types?: RelationshipType[];
  height?: string;
  compact?: boolean;
}

function layout(ids: string[], rels: Relationship[], center?: string) {
  if (center && ids.length > 1) {
    // radial
    const others = ids.filter((i) => i !== center);
    const R = Math.max(260, others.length * 34);
    const pos: Record<string, { x: number; y: number }> = { [center]: { x: 0, y: 0 } };
    others.forEach((id, i) => {
      const a = (i / others.length) * Math.PI * 2 - Math.PI / 2;
      pos[id] = { x: Math.cos(a) * R, y: Math.sin(a) * R * 0.75 };
    });
    return pos;
  }
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: 'LR', nodesep: 30, ranksep: 90 });
  g.setDefaultEdgeLabel(() => ({}));
  ids.forEach((id) => g.setNode(id, { width: NODE_W, height: NODE_H }));
  rels.forEach((r) => g.setEdge(r.source, r.target));
  dagre.layout(g);
  const pos: Record<string, { x: number; y: number }> = {};
  ids.forEach((id) => {
    const n = g.node(id);
    pos[id] = { x: n.x - NODE_W / 2, y: n.y - NODE_H / 2 };
  });
  return pos;
}

function Inner({ focus, path, includeNeighbors = true, types, height = '520px', compact }: Props) {
  const [active, setActive] = useState<Relationship | null>(null);
  const flow = useReactFlow();
  const nav = useNavigate();

  const { ids, rels } = useMemo(() => {
    const set = new Set(focus);
    path?.forEach((e) => {
      set.add(e.from);
      set.add(e.to);
    });
    if (includeNeighbors && focus.length === 1 && !path) {
      edgesOf(focus[0])
        .filter((e) => !types || types.includes(e.rel.type))
        .forEach((e) => set.add(e.to));
    }
    const ids = [...set].filter((i) => characterById.has(i));
    let rels = path ? path.map((e) => e.rel) : relationshipsAmong(ids);
    if (!path && focus.length === 1) rels = rels.filter((r) => r.source === focus[0] || r.target === focus[0]);
    if (types) rels = rels.filter((r) => types.includes(r.type));
    // dedupe parallel edges between same pair: keep up to 2
    const seen = new Map<string, number>();
    rels = rels.filter((r) => {
      const k = [r.source, r.target].sort().join('|');
      const n = seen.get(k) ?? 0;
      seen.set(k, n + 1);
      return n < 2;
    });
    return { ids, rels };
  }, [focus, path, includeNeighbors, types]);

  const pos = useMemo(() => layout(ids, rels, focus.length === 1 && !path ? focus[0] : undefined), [ids, rels, focus, path]);
  const pathIds = useMemo(() => new Set(path?.flatMap((e) => [e.from, e.to]) ?? []), [path]);

  const nodes: Node[] = ids.map((id) => ({
    id,
    type: 'person',
    position: pos[id] ?? { x: 0, y: 0 },
    data: { id, selected: focus.includes(id), highlight: pathIds.has(id) && !focus.includes(id) ? 'path' : null, horizontal: false },
  }));
  const edges: Edge[] = rels.map((r) => {
    const col = REL_COLOR[r.type] ?? 'rgb(var(--c-muted))';
    const st = EDGE_STYLE[r.type];
    return {
      id: r.id,
      source: r.source,
      target: r.target,
      type: 'straight',
      label: compact ? undefined : r.label ?? REL_LABEL[r.type],
      labelStyle: { fill: col, fontSize: 10.5, fontWeight: 500 },
      labelBgStyle: { fill: 'rgb(var(--c-ink))', fillOpacity: 0.9 },
      labelBgPadding: [5, 3] as [number, number],
      labelBgBorderRadius: 6,
      style: { stroke: col, strokeWidth: active?.id === r.id ? 3 : 1.6, strokeDasharray: st?.dash, cursor: 'pointer' },
      markerEnd: ['spouse', 'sibling', 'half-sibling', 'friend', 'ally', 'enemy'].includes(r.type) ? undefined : { type: MarkerType.ArrowClosed, color: col, width: 16, height: 16 },
      interactionWidth: 18,
      data: { rel: r },
    };
  });

  useEffect(() => {
    const t = setTimeout(() => flow.fitView({ padding: 0.2, duration: 300 }), 60);
    return () => clearTimeout(t);
  }, [ids.join(','), flow]);

  const sentence = active ? edgeSentence({ from: active.source, to: active.target, rel: active, dir: 'out' }) : '';

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-gold/15 bg-ink/50" style={{ height }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onEdgeClick={(_, e) => setActive((e.data as { rel: Relationship }).rel)}
        onNodeClick={(_, n) => nav(`/characters/${n.id}`)}
        onPaneClick={() => setActive(null)}
        nodesConnectable={false}
        minZoom={0.15}
        proOptions={{ hideAttribution: true }}
        fitView
      >
        <Background color="rgb(var(--c-gold) / 0.1)" gap={28} size={1} />
        {!compact && <Controls showInteractive={false} position="bottom-left" />}
      </ReactFlow>
      {!compact && !active && <div className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-ink/80 px-3 py-1 text-[11px] text-muted">Click a connection to see why · click a person to open profile</div>}
      {active && (
        <div className="card absolute bottom-3 left-14 right-3 z-10 !bg-ink/95 p-4 shadow-2xl md:left-auto md:w-96">
          <button className="absolute right-2 top-2 rounded p-1 text-muted hover:text-parchment" onClick={() => setActive(null)} aria-label="Close">
            <Icon name="close" className="h-4 w-4" />
          </button>
          <div className="eyebrow mb-1 !text-[10px]">Explain this connection</div>
          <div className="pr-6 font-serif text-lg leading-snug">{sentence}</div>
          <p className="mt-2 text-sm leading-relaxed text-parchment/80">{active.explanation}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-muted">
            <ConfidenceBadge c={active.confidence} />
            {active.sources?.map((s, i) => (
              <span key={i}>
                {sourceById.get(s.sourceId)?.textName}
                {s.section ? `, ${s.section}` : ''}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function RelGraph(props: Props) {
  return (
    <ReactFlowProvider>
      <Inner {...props} />
    </ReactFlowProvider>
  );
}
