import {
  characters, characterById, relationships, events, eventById, stories, storyById, lessons, quizzes, quizById,
  glossaryById, locations, locationById, familyTrees, familyTreeById, dynasties, dynastyById, sourceById,
} from '../data';
import type { SourceRef } from '../data/types';
import { PARENT_TYPES } from './graph';

const LINK_RE = /\[\[(\w+):([\w-]+)(?:\|[^\]]+)?\]\]/g;

/** Returns a list of human-readable integrity errors. Empty = valid. */
export function validateData(): string[] {
  const errs: string[] = [];
  const dup = (label: string, ids: string[]) => {
    const seen = new Set<string>();
    for (const id of ids) {
      if (seen.has(id)) errs.push(`Duplicate ${label} id: ${id}`);
      seen.add(id);
    }
  };
  dup('character', characters.map((c) => c.id));
  dup('relationship', relationships.map((r) => r.id));
  dup('event', events.map((e) => e.id));
  dup('story', stories.map((s) => s.id));
  dup('location', locations.map((l) => l.id));

  const ch = (ctx: string, id: string) => !characterById.has(id) && errs.push(`${ctx}: unknown character "${id}"`);
  const ev = (ctx: string, id: string) => !eventById.has(id) && errs.push(`${ctx}: unknown event "${id}"`);
  const st = (ctx: string, id: string) => !storyById.has(id) && errs.push(`${ctx}: unknown story "${id}"`);
  const lo = (ctx: string, id: string) => !locationById.has(id) && errs.push(`${ctx}: unknown location "${id}"`);
  const srcs = (ctx: string, refs?: SourceRef[]) => refs?.forEach((r) => !sourceById.has(r.sourceId) && errs.push(`${ctx}: unknown source "${r.sourceId}"`));

  const text = (ctx: string, s: string | undefined) => {
    if (!s) return;
    for (const m of s.matchAll(LINK_RE)) {
      const [, kind, id] = m;
      const ok =
        kind === 'char' ? characterById.has(id)
        : kind === 'event' ? eventById.has(id)
        : kind === 'story' ? storyById.has(id)
        : kind === 'term' ? glossaryById.has(id)
        : kind === 'place' ? locationById.has(id)
        : kind === 'dynasty' ? dynastyById.has(id)
        : kind === 'source' ? sourceById.has(id)
        : kind === 'tree' ? familyTreeById.has(id)
        : false;
      if (!ok) errs.push(`${ctx}: broken link [[${kind}:${id}]]`);
    }
  };

  for (const c of characters) {
    srcs(`character ${c.id}`, c.sources);
    c.biography.forEach((p) => text(`character ${c.id}`, p));
    text(`character ${c.id}`, c.description);
    c.associatedLocations?.forEach((l) => lo(`character ${c.id}`, l));
    if (c.dynasty && !dynastyById.has(c.dynasty)) errs.push(`character ${c.id}: unknown dynasty ${c.dynasty}`);
  }
  for (const r of relationships) {
    ch(`relationship ${r.id}`, r.source);
    ch(`relationship ${r.id}`, r.target);
    srcs(`relationship ${r.id}`, r.sources);
  }
  for (const e of events) {
    e.characters.forEach((c) => ch(`event ${e.id}`, c));
    [...(e.preceding ?? []), ...(e.following ?? []), ...(e.parallelWith ?? [])].forEach((x) => ev(`event ${e.id}`, x));
    e.locations?.forEach((l) => lo(`event ${e.id}`, l));
    e.stories?.forEach((s) => st(`event ${e.id}`, s));
    if (e.familyTree && !familyTreeById.has(e.familyTree)) errs.push(`event ${e.id}: unknown tree ${e.familyTree}`);
    if (e.dynasty && !dynastyById.has(e.dynasty)) errs.push(`event ${e.id}: unknown dynasty ${e.dynasty}`);
    srcs(`event ${e.id}`, e.sources);
    e.narrative.forEach((p) => text(`event ${e.id}`, p));
  }
  for (const s of stories) {
    s.characters.forEach((c) => ch(`story ${s.id}`, c));
    s.events?.forEach((x) => ev(`story ${s.id}`, x));
    s.relatedStories?.forEach((x) => st(`story ${s.id}`, x));
    if (s.quizId && !quizById.has(s.quizId)) errs.push(`story ${s.id}: unknown quiz ${s.quizId}`);
    if (s.familyTree && !familyTreeById.has(s.familyTree)) errs.push(`story ${s.id}: unknown tree ${s.familyTree}`);
    srcs(`story ${s.id}`, s.sources);
    text(`story ${s.id}`, s.introduction);
    for (const c of s.chapters) {
      c.narrative.forEach((p) => text(`story ${s.id}/${c.id}`, p));
      c.events?.forEach((x) => ev(`story ${s.id}/${c.id}`, x));
      c.concepts?.forEach((t) => !glossaryById.has(t) && errs.push(`story ${s.id}/${c.id}: unknown term ${t}`));
    }
  }
  for (const l of lessons) {
    l.characters.forEach((c) => ch(`lesson ${l.id}`, c));
    l.stories?.forEach((s) => st(`lesson ${l.id}`, s));
    if (!quizById.has(l.quizId)) errs.push(`lesson ${l.id}: unknown quiz ${l.quizId}`);
    for (const sec of l.sections) {
      sec.body.forEach((p) => text(`lesson ${l.id}`, p));
      sec.graph?.forEach((c) => ch(`lesson ${l.id} graph`, c));
    }
    srcs(`lesson ${l.id}`, l.sources);
  }
  for (const q of quizzes) {
    if (q.questions.length !== 5) errs.push(`quiz ${q.id}: expected 5 questions, has ${q.questions.length}`);
    for (const qq of q.questions) {
      if (qq.type === 'order') {
        if (!qq.items || qq.items.length < 2) errs.push(`quiz ${q.id}/${qq.id}: order question needs items`);
      } else if (qq.type === 'truefalse') {
        if (qq.answer !== 0 && qq.answer !== 1) errs.push(`quiz ${q.id}/${qq.id}: truefalse answer must be 0/1`);
      } else if (!qq.options || qq.answer === undefined || qq.answer >= qq.options.length) {
        errs.push(`quiz ${q.id}/${qq.id}: invalid options/answer`);
      }
    }
  }
  for (const t of familyTrees) t.members.forEach((m) => ch(`tree ${t.id}`, m));
  for (const d of dynasties) {
    d.line.forEach((m) => ch(`dynasty ${d.id}`, m));
    if (!familyTreeById.has(d.familyTree)) errs.push(`dynasty ${d.id}: unknown tree`);
  }
  for (const l of locations) {
    l.characters?.forEach((c) => ch(`location ${l.id}`, c));
    l.events?.forEach((e) => ev(`location ${l.id}`, e));
    l.stories?.forEach((s) => st(`location ${l.id}`, s));
    l.connectedTo?.forEach((x) => lo(`location ${l.id}`, x));
  }

  // Cycle check on parent graph
  const parents = new Map<string, string[]>();
  for (const r of relationships) if (PARENT_TYPES.includes(r.type)) parents.set(r.target, [...(parents.get(r.target) ?? []), r.source]);
  const state = new Map<string, number>();
  const visit = (id: string, path: string[]): void => {
    if (state.get(id) === 2) return;
    if (state.get(id) === 1) {
      errs.push(`Parent cycle: ${[...path, id].join(' → ')}`);
      return;
    }
    state.set(id, 1);
    for (const p of parents.get(id) ?? []) visit(p, [...path, id]);
    state.set(id, 2);
  };
  for (const c of characters) visit(c.id, []);

  return errs;
}
