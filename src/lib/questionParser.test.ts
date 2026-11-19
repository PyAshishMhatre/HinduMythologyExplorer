import { describe, expect, it } from 'vitest';
import { answerQuestion } from './questionParser';
import { findCharacters } from './names';

describe('name resolution', () => {
  it('finds characters including possessives and alternate names', () => {
    expect(findCharacters("Who was Ravana's father?")).toEqual(['ravana']);
    expect(findCharacters('How are the Pandavas related to Krishna? and Partha')).toEqual(expect.arrayContaining(['krishna', 'arjuna']));
    expect(findCharacters('Who were the parents of Bhishma')).toEqual(['bhishma']);
  });
});

describe('question parser', () => {
  it("Ravana's father", () => {
    const a = answerQuestion("Who was Ravana's father?")!;
    expect(a.answer).toMatch(/Vishrava/);
  });
  it('parents of Bhishma', () => {
    const a = answerQuestion('Who were the parents of Bhishma?')!;
    expect(a.answer).toMatch(/Shantanu/);
    expect(a.answer).toMatch(/Ganga/);
  });
  it('father of Krishna', () => {
    expect(answerQuestion('Who was the father of Krishna?')!.answer).toMatch(/Vasudeva/);
  });
  it('Krishna and Arjuna relation', () => {
    const a = answerQuestion('How are Krishna and Arjuna related?')!;
    expect(a.answer).toMatch(/cousin/);
    expect(a.path?.length).toBeGreaterThan(0);
  });
  it('who cursed Indra', () => {
    const a = answerQuestion('Who cursed Indra?')!;
    expect(a.answer).toMatch(/Gautama|Durvasa/);
  });
  it('before Rama\'s birth', () => {
    const a = answerQuestion("What happened before Rama's birth?")!;
    expect(a.answer).toMatch(/Sacrifice/i);
  });
  it('samudra manthana', () => {
    const a = answerQuestion('What happened during Samudra Manthana?')!;
    expect(a.answer).toMatch(/Churning/i);
  });
  it('Karna after the war', () => {
    const a = answerQuestion('What happened to Karna after the war?')!;
    expect(a.answer).toMatch(/Karna/);
  });
});
