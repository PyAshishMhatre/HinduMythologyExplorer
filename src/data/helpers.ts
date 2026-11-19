import type { Confidence, Relationship, RelationshipType, SourceRef } from './types';

/** Source reference shorthand. */
export function ref(
  sourceId: string,
  section?: string,
  confidence: Confidence = 'attested',
  note?: string,
): SourceRef {
  return { sourceId, section, confidence, note };
}

/** Relationship shorthand. id is derived deterministically. */
export function rel(
  source: string,
  type: RelationshipType,
  target: string,
  explanation: string,
  opts: { confidence?: Confidence; sources?: SourceRef[]; label?: string; tradition?: string } = {},
): Relationship {
  return {
    id: `${source}--${type}--${target}`,
    source,
    target,
    type,
    explanation,
    confidence: opts.confidence ?? 'attested',
    sources: opts.sources,
    label: opts.label,
    tradition: opts.tradition,
  };
}
