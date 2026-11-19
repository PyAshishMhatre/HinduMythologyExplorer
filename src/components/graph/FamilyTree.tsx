import { useCallback, useEffect, useMemo, useState } from 'react';
import { Background, Controls, MiniMap, ReactFlow, ReactFlowProvider, useReactFlow, type Edge, type Node } from '@xyflow/react';
import { Link, useNavigate } from 'react-router-dom';
import type { FamilyTree as Tree } from '../../data/types';
import { characterById } from '../../data';
import { EDGE_STYLE, hasChildrenIn, layoutTree, visibleMembers } from '../../lib/treeLayout';
import { ancestorsOf, descendantsOf } from '../../lib/graph';
import { nodeTypes } from './nodes';
import { Emblem, CATEGORY_LABEL } from '../ui/Emblem';
import { Icon } from '../ui/Icon';
import { useSettings } from '../../store/settings';

function Legend() {
  const keys = ['parent', 'divine-parent', 'niyoga-parent', 'legal-parent', 'adoptive-parent', 'mind-born', 'ancestor-of', 'spouse'];
  return (
    <div className="card pointer-events-auto flex flex-wrap gap-x-4 gap-y-1.5 !bg-ink/90 px-4 py-2.5 text-[11px] text-parchment/80">
      {keys.map((k) => (
        <span key={k} className="flex items-center gap-1.5">
          <svg width="26" height="6">
            <line x1="0" y1="3" x2="26" y2="3" stroke={EDGE_STYLE[k].stroke} strokeWidth={EDGE_STYLE[k].width + 0.4} strokeDasharray={EDGE_STYLE[k].dash} />
          </svg>
          {EDGE_STYLE[k].label}
        </span>
      ))}
    </div>
  );
}

function TreeInner({ tree, initialSelect }: { tree: Tree; initialSelect?: string }) {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<string | null>(initialSelect ?? null);
  const [dir, setDir] = useState<'TB' | 'LR'>('TB');
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<'lineage' | 'none'>('lineage');
  const flow = useReactFlow();
  const nav = useNavigate();
  const reduceMotion = useSettings((s) => s.reduceMotion);

  const toggle = useCallback((id: string) => {
    setCollapsed((c) => {
      const n = new Set(c);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }, []);

  const memberSet = useMemo(() => new Set(tree.members), [tree]);
  const { visible, hiddenCount } = useMemo(() => visibleMembers(tree.members, collapsed), [tree, collapsed]);
  const layout = useMemo(() => layoutTree(visible, dir), [visible, dir]);

  const lineage = useMemo(() => {
    if (!selected || mode === 'none') return null;
    return { anc: new Set(ancestorsOf(selected)), desc: new Set(descendantsOf(selected)) };
  }, [selected, mode]);

  const nodes: Node[] = useMemo(
    () =>
      layout.nodes.map((n) => {
        if (n.kind === 'union') {
          const [a, b] = n.id.slice(2).split('+');
          const dim = lineage ? ![a, b].some((x) => x === selected || lineage.anc.has(x) || lineage.desc.has(x)) : false;
          return { id: n.id, type: 'union', position: { x: n.x, y: n.y }, data: { horizontal: dir === 'LR', dim }, draggable: false, selectable: false };
        }
        const hl = !lineage ? null : lineage.anc.has(n.id) ? 'ancestor' : lineage.desc.has(n.id) ? 'descendant' : null;
        return {
          id: n.id,
          type: 'person',
          position: { x: n.x, y: n.y },
          data: {
            id: n.id,
            selected: n.id === selected,
            highlight: hl,
            dim: !!lineage && n.id !== selected && !hl,
            canCollapse: hasChildrenIn(n.id, memberSet),
            collapsed: collapsed.has(n.id),
            hiddenChildren: hiddenCount.get(n.id),
            onToggle: toggle,
            horizontal: dir === 'LR',
          },
        };
      }),
    [layout, selected, lineage, collapsed, hiddenCount, toggle, dir, memberSet],
  );

  const edges: Edge[] = useMemo(
    () =>
      layout.edges.map((e) => {
        const st = EDGE_STYLE[e.type] ?? EDGE_STYLE.parent;
        const endpoints = [e.source, e.target].flatMap((x) => (x.startsWith('u:') ? x.slice(2).split('+') : [x]));
        const inLine = (x: string) => x === selected || !!lineage?.anc.has(x) || !!lineage?.desc.has(x);
        const lit = !lineage || (e.type === 'spouse' ? endpoints.some(inLine) : endpoints.filter(inLine).length >= 2);
        return {
          id: e.id,
          source: e.source,
          target: e.target,
          type: e.id.startsWith('direct:') ? 'default' : 'smoothstep',
          animated: false,
          label: e.id.startsWith('direct:') ? '⚭' : e.type === 'ancestor-of' ? '⋯ abridged' : e.type === 'niyoga-parent' ? 'niyoga' : e.type === 'legal-parent' ? 'legal' : e.type === 'divine-parent' ? 'divine' : e.type === 'adoptive-parent' ? 'adopted' : e.type === 'mind-born' ? 'mind-born' : undefined,
          labelStyle: { fill: 'rgb(var(--c-muted))', fontSize: 10 },
          labelBgStyle: { fill: 'rgb(var(--c-ink))', fillOpacity: 0.85 },
          labelBgPadding: [4, 2] as [number, number],
          style: { stroke: st.stroke, strokeWidth: st.width, strokeDasharray: st.dash, opacity: lit ? 1 : 0.15 },
        };
      }),
    [layout, lineage, selected, visible],
  );

  useEffect(() => {
    const t = setTimeout(() => flow.fitView({ padding: 0.15, duration: reduceMotion ? 0 : 400 }), 50);
    return () => clearTimeout(t);
  }, [tree.id, dir, flow, reduceMotion]);

  useEffect(() => {
    if (initialSelect) {
      const t = setTimeout(() => flow.fitView({ nodes: [{ id: initialSelect }], padding: 2, duration: 500, maxZoom: 1.1 }), 300);
      return () => clearTimeout(t);
    }
  }, [initialSelect, flow]);

  const matches = query.trim().length > 1 ? tree.members.filter((m) => characterById.get(m)?.name.toLowerCase().includes(query.toLowerCase())) : [];
  const focusOn = (id: string) => {
    if (!visible.has(id)) setCollapsed(new Set());
    setSelected(id);
    setQuery('');
    setTimeout(() => flow.fitView({ nodes: [{ id }], padding: 2.5, duration: 500, maxZoom: 1.2 }), 80);
  };

  const sel = selected ? characterById.get(selected) : null;

  return (
    <div className="relative h-[calc(100vh-14rem)] min-h-[520px] w-full overflow-hidden rounded-2xl border border-gold/15 bg-ink/50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={(_, n) => n.type === 'person' && setSelected((s) => (s === n.id ? null : n.id))}
        onNodeDoubleClick={(_, n) => n.type === 'person' && nav(`/characters/${n.id}`)}
        onPaneClick={() => setSelected(null)}
        nodesDraggable={false}
        nodesConnectable={false}
        minZoom={0.1}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
        fitView
      >
        <Background color="rgb(var(--c-gold) / 0.12)" gap={28} size={1} />
        <Controls showInteractive={false} position="bottom-left" />
        <MiniMap pannable zoomable nodeColor={(n) => (n.type === 'union' ? 'transparent' : 'rgb(201 162 74 / 0.6)')} maskColor="rgb(0 0 0 / 0.5)" position="bottom-right" />
      </ReactFlow>

      <div className="pointer-events-none absolute inset-x-3 top-3 flex flex-wrap items-start justify-between gap-2">
        <div className="pointer-events-auto relative w-64">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find in this tree…" className="input !bg-ink/90 !py-2" />
          {matches.length > 0 && (
            <div className="card absolute left-0 right-0 top-11 z-10 max-h-64 overflow-auto !bg-ink/95">
              {matches.map((m) => (
                <button key={m} onClick={() => focusOn(m)} className="block w-full px-3 py-2 text-left text-sm hover:bg-gold/10">
                  {characterById.get(m)!.name}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="pointer-events-auto flex flex-wrap gap-1.5">
          <button className="chip !py-1.5" onClick={() => setDir((d) => (d === 'TB' ? 'LR' : 'TB'))}>
            {dir === 'TB' ? '↕ Vertical' : '↔ Horizontal'}
          </button>
          <button className={`chip !py-1.5 ${mode === 'lineage' ? 'chip-active' : ''}`} onClick={() => setMode((m) => (m === 'lineage' ? 'none' : 'lineage'))}>
            Highlight lineage
          </button>
          <button className="chip !py-1.5" onClick={() => setCollapsed(new Set())}>
            Expand all
          </button>
          <button className="chip !py-1.5" onClick={() => flow.fitView({ padding: 0.15, duration: 400 })}>
            Fit
          </button>
        </div>
      </div>

      {sel && (
        <div className="card absolute right-3 top-16 z-10 w-72 !bg-ink/95 p-4 shadow-2xl">
          <button className="absolute right-2 top-2 rounded p-1 text-muted hover:text-parchment" onClick={() => setSelected(null)} aria-label="Close">
            <Icon name="close" className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-3">
            <Emblem name={sel.name} category={sel.category} size={52} />
            <div>
              <div className="eyebrow !text-[10px]">{CATEGORY_LABEL[sel.category]}</div>
              <div className="font-serif text-xl leading-tight">{sel.name}</div>
            </div>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-parchment/80 line-clamp-5">{sel.description}</p>
          {lineage && (
            <div className="mt-2 flex gap-3 text-[11px]">
              <span className="text-lapis">● {lineage.anc.size} ancestors</span>
              <span className="text-jade">● {lineage.desc.size} descendants</span>
            </div>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            <Link to={`/characters/${sel.id}`} className="btn-primary !px-3 !py-1.5 !text-xs">
              Open profile
            </Link>
            <Link to={`/relationships/${sel.id}`} className="btn-ghost !px-3 !py-1.5 !text-xs">
              Connections
            </Link>
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute bottom-3 left-14 right-44 hidden justify-center md:flex">
        <Legend />
      </div>
    </div>
  );
}

export default function FamilyTree(props: { tree: Tree; initialSelect?: string }) {
  return (
    <ReactFlowProvider>
      <TreeInner key={props.tree.id} {...props} />
    </ReactFlowProvider>
  );
}
