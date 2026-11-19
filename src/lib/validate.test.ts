import { describe, expect, it } from 'vitest';
import { validateData } from './validate';
import { characters, events, stories, familyTrees, glossary, quizzes, timelines } from '../data';

describe('content database', () => {
  it('has no integrity errors', () => {
    const errs = validateData();
    if (errs.length) console.error(errs.join('\n'));
    expect(errs).toEqual([]);
  });
  it('meets minimum content requirements', () => {
    expect(characters.length).toBeGreaterThanOrEqual(50);
    expect(events.length).toBeGreaterThanOrEqual(30);
    expect(stories.length).toBeGreaterThanOrEqual(15);
    expect(familyTrees.length).toBeGreaterThanOrEqual(5);
    expect(timelines.length).toBeGreaterThanOrEqual(3);
    expect(glossary.length).toBeGreaterThanOrEqual(10);
    expect(quizzes.length).toBeGreaterThanOrEqual(5);
  });
});
