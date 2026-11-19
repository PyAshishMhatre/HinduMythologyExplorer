import type { Character } from '../types';
import { divine } from './divine';
import { sages } from './sages';
import { puranic } from './puranic';
import { ramayana } from './ramayana';
import { mahabharata } from './mahabharata';

export const characters: Character[] = [...divine, ...sages, ...puranic, ...ramayana, ...mahabharata];

export const characterById = new Map(characters.map((c) => [c.id, c]));

export const characterGroups: { id: string; label: string; ids: string[] }[] = [
  { id: 'divine', label: 'Gods & Goddesses', ids: divine.map((c) => c.id) },
  { id: 'sages', label: 'Sages & Progenitors', ids: sages.map((c) => c.id) },
  { id: 'puranic', label: 'Puranic Figures & Avatars', ids: puranic.map((c) => c.id) },
  { id: 'ramayana', label: 'Ramayana & Solar Dynasty', ids: ramayana.map((c) => c.id) },
  { id: 'mahabharata', label: 'Mahabharata, Lunar & Yadava', ids: mahabharata.map((c) => c.id) },
];
