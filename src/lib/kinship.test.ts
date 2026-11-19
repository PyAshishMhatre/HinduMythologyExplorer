import { describe, expect, it } from 'vitest';
import { findConnection } from './kinship';
import { ancestorsOf, childrenOf, descendantsOf, parentsOf } from './graph';

describe('graph inverses', () => {
  it('derives children from parent links', () => {
    expect(childrenOf('dasharatha').map((e) => e.to)).toEqual(expect.arrayContaining(['rama', 'bharata', 'lakshmana', 'shatrughna']));
    expect(parentsOf('rama').map((e) => e.to)).toEqual(expect.arrayContaining(['dasharatha', 'kausalya']));
  });
  it('finds ancestors across abridged links', () => {
    const a = ancestorsOf('rama');
    expect(a).toContain('ikshvaku');
    expect(a).toContain('vaivasvata-manu');
    expect(a).toContain('kashyapa');
  });
  it('finds descendants', () => {
    expect(descendantsOf('arjuna')).toEqual(expect.arrayContaining(['abhimanyu', 'parikshit', 'janamejaya']));
  });
});

describe('kinship', () => {
  it('Krishna and Arjuna are first cousins', () => {
    const r = findConnection('arjuna', 'krishna')!;
    expect(r.familyOnly).toBe(true);
    expect(r.label).toMatch(/first cousin/);
  });
  it('Parikshit is Arjuna\'s grandchild', () => {
    const r = findConnection('arjuna', 'parikshit')!;
    expect(r.label).toMatch(/grandchild/);
  });
  it('Ravana and Kubera are half-siblings', () => {
    const r = findConnection('ravana', 'kubera')!;
    expect(r.path).toHaveLength(1);
    expect(r.label).toMatch(/half-sibling/);
  });
  it('Rama descends from Ikshvaku', () => {
    const r = findConnection('rama', 'ikshvaku')!;
    expect(r.familyOnly).toBe(true);
    expect(r.label).toMatch(/parent/);
    expect(r.label).toMatch(/abridged/);
  });
  it('Bhishma is great-uncle of the Pandavas (by half-blood)', () => {
    const r = findConnection('arjuna', 'bhishma')!;
    expect(r.familyOnly).toBe(true);
    expect(r.label).toMatch(/uncle/);
  });
  it('connects non-family via narrative links', () => {
    const r = findConnection('hanuman', 'ravana');
    expect(r).not.toBeNull();
  });
});
