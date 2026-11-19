import { Handle, Position, type NodeProps } from '@xyflow/react';
import { memo } from 'react';
import { characterById } from '../../data';
import { Emblem } from '../ui/Emblem';

export interface PersonData extends Record<string, unknown> {
  id: string;
  dim?: boolean;
  selected?: boolean;
  highlight?: 'ancestor' | 'descendant' | 'path' | null;
  hiddenChildren?: number;
  canCollapse?: boolean;
  collapsed?: boolean;
  onToggle?: (id: string) => void;
  horizontal?: boolean;
}

export const PersonNode = memo(function PersonNode({ data }: NodeProps) {
  const d = data as PersonData;
  const c = characterById.get(d.id);
  if (!c) return null;
  const ring =
    d.selected ? 'border-saffron shadow-[0_0_0_2px_rgb(var(--c-saffron)/0.5),0_0_30px_rgb(var(--c-saffron)/0.35)]'
    : d.highlight === 'ancestor' ? 'border-lapis/80 shadow-[0_0_18px_rgb(var(--c-lapis)/0.35)]'
    : d.highlight === 'descendant' ? 'border-jade/80 shadow-[0_0_18px_rgb(var(--c-jade)/0.35)]'
    : d.highlight === 'path' ? 'border-gold shadow-[0_0_22px_rgb(var(--c-gold)/0.45)]'
    : 'border-gold/25';
  const tgt = d.horizontal ? Position.Left : Position.Top;
  const src = d.horizontal ? Position.Right : Position.Bottom;
  return (
    <div className={`relative flex h-16 w-[188px] cursor-pointer items-center gap-2.5 rounded-2xl border bg-panel/95 px-2.5 transition ${ring} ${d.dim ? 'opacity-25' : ''}`}>
      <Handle type="target" position={tgt} className="!h-1 !w-1 !border-0 !bg-transparent" />
      <Emblem name={c.name} category={c.category} size={42} />
      <div className="min-w-0 flex-1">
        <div className="truncate font-serif text-[15px] font-semibold leading-tight text-parchment">{c.name}</div>
        <div className="truncate text-[10px] leading-snug text-muted">{c.title}</div>
      </div>
      {d.canCollapse && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            d.onToggle?.(d.id);
          }}
          className="absolute -bottom-2.5 left-1/2 z-10 flex h-5 min-w-5 -translate-x-1/2 items-center justify-center rounded-full border border-gold/40 bg-ink px-1.5 text-[10px] text-gold hover:bg-gold/20"
          title={d.collapsed ? 'Expand descendants' : 'Collapse descendants'}
        >
          {d.collapsed ? `+${d.hiddenChildren ?? ''}` : '−'}
        </button>
      )}
      <Handle type="source" position={src} className="!h-1 !w-1 !border-0 !bg-transparent" />
    </div>
  );
});

export const UnionNode = memo(function UnionNode({ data }: NodeProps) {
  const d = data as { horizontal?: boolean; dim?: boolean };
  return (
    <div className={`h-2.5 w-2.5 rounded-full border border-bronze bg-bronze/60 ${d.dim ? 'opacity-25' : ''}`} title="Marriage">
      <Handle type="target" position={d.horizontal ? Position.Left : Position.Top} className="!h-1 !w-1 !border-0 !bg-transparent" />
      <Handle type="source" position={d.horizontal ? Position.Right : Position.Bottom} className="!h-1 !w-1 !border-0 !bg-transparent" />
    </div>
  );
});

export const nodeTypes = { person: PersonNode, union: UnionNode };
