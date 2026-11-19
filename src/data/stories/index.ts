import type { Story } from '../types';
import { puranicStories } from './puranic';
import { ramayanaStories } from './ramayana';
import { mahabharataStories } from './mahabharata';

export const stories: Story[] = [...puranicStories, ...ramayanaStories, ...mahabharataStories];
export const storyById = new Map(stories.map((s) => [s.id, s]));
