/**
 * Core content model. Every entity is referenced elsewhere ONLY by its `id` slug.
 * Narrative text fields support inline link markup:
 *   [[char:rama]]  [[char:rama|Rama of Ayodhya]]  [[event:sita-swayamvara|the swayamvara]]
 *   [[term:dharma]]  [[story:samudra-manthana]]  [[place:ayodhya]]
 */

export type Confidence =
  | 'attested' // Directly attested in the cited text
  | 'tradition' // Present in a particular textual tradition
  | 'later-interpretation' // Common later interpretation
  | 'regional-folk' // Regional or folk tradition
  | 'modern-historical' // Modern historical/academic interpretation
  | 'disputed'; // Uncertain or disputed

export type SourceCategory =
  | 'Vedic'
  | 'Upanishadic'
  | 'Itihasa'
  | 'Puranic'
  | 'Later'
  | 'Regional'
  | 'Folk'
  | 'Modern';

export interface Source {
  id: string;
  textName: string;
  category: SourceCategory;
  description: string;
  tradition?: string;
}

export interface SourceRef {
  sourceId: string;
  /** Kanda / Parva / Skandha / Mandala / Khanda etc. */
  section?: string;
  /** Only when reliably established. Never invented. */
  chapter?: string;
  verse?: string;
  confidence: Confidence;
  note?: string;
}

export type CharacterCategory =
  | 'cosmic' // Brahman / primordial principles
  | 'deity' // gods and goddesses
  | 'avatar'
  | 'deva'
  | 'asura'
  | 'rakshasa'
  | 'sage'
  | 'manu'
  | 'king'
  | 'queen'
  | 'hero'
  | 'vanara'
  | 'naga'
  | 'celestial'
  | 'other';

export interface Variation {
  title: string;
  primary: { tradition: string; account: string };
  alternate: { tradition: string; account: string };
  difference: string;
  shared?: string;
  whyItMatters?: string;
}

export interface Character {
  id: string;
  name: string;
  alternateNames?: string[];
  sanskritName?: string;
  category: CharacterCategory;
  /** Short role line, e.g. "Prince of Ayodhya, seventh avatar of Vishnu" */
  title: string;
  primaryTradition: string;
  description: string;
  /** Biography paragraphs (rich text). */
  biography: string[];
  birthStory?: string;
  powers?: string[];
  personality?: string[];
  deathOrFate?: string;
  significance?: string[];
  dynasty?: string;
  associatedLocations?: string[];
  sources: SourceRef[];
  variations?: Variation[];
  image?: string;
  tags?: string[];
  /** Marked true where genealogy is condensed/abridged across Puranic accounts. */
  abridgedLineage?: boolean;
}

export type RelationshipType =
  | 'parent' // biological parent (source is parent of target)
  | 'divine-parent' // divine fatherhood/motherhood (e.g., Surya → Karna)
  | 'adoptive-parent' // foster/adoptive (e.g., Adhiratha → Karna)
  | 'niyoga-parent' // biological father via niyoga (Vyasa → Pandu)
  | 'legal-parent' // socially/legally recognised parent (Pandu → Pandavas)
  | 'ancestor-of' // lineage link with intermediate generations abridged
  | 'mind-born' // manasaputra / emanation-born (Brahma → Marichi)
  | 'spouse'
  | 'sibling'
  | 'half-sibling'
  | 'teacher' // source is teacher of target
  | 'friend'
  | 'enemy'
  | 'ally'
  | 'avatar-of' // source is an avatar of target
  | 'manifestation-of'
  | 'consort-of' // theological consort, distinct from 'spouse' where useful
  | 'curse' // source cursed target
  | 'boon' // source granted boon to target
  | 'killed' // source killed target
  | 'narrative';

export interface Relationship {
  id: string;
  source: string;
  target: string;
  type: RelationshipType;
  /** Short label override, e.g. "charioteer & friend" */
  label?: string;
  explanation: string;
  tradition?: string;
  sources?: SourceRef[];
  confidence: Confidence;
}

export type EraId =
  | 'cosmic'
  | 'lineages'
  | 'solar'
  | 'lunar'
  | 'ramayana'
  | 'mahabharata'
  | 'puranic';

export interface Era {
  id: EraId;
  name: string;
  subtitle: string;
  description: string;
  color: string;
}

export type EventCategory =
  | 'creation'
  | 'divine-conflict'
  | 'deva-asura'
  | 'sage'
  | 'avatar'
  | 'cosmic'
  | 'dynastic'
  | 'war'
  | 'philosophical'
  | 'marriage'
  | 'birth'
  | 'exile';

export interface MythEvent {
  id: string;
  title: string;
  era: EraId;
  epic?: 'ramayana' | 'mahabharata' | 'puranas' | 'vedas';
  /** Narrative ordinal within the master sequence — NOT a date. */
  order: number;
  category: EventCategory;
  summary: string;
  narrative: string[];
  characters: string[];
  preceding?: string[];
  following?: string[];
  parallelWith?: string[];
  locations?: string[];
  stories?: string[];
  dynasty?: string;
  familyTree?: string;
  sources: SourceRef[];
  traditionNotes?: string;
}

export interface Chapter {
  id: string;
  title: string;
  /** Paragraphs (rich text). Paragraphs starting with "> " render as quotes/asides. */
  narrative: string[];
  concepts?: string[];
  events?: string[];
}

export interface Story {
  id: string;
  title: string;
  subtitle?: string;
  category:
    | 'creation'
    | 'divine-conflict'
    | 'deva-asura'
    | 'sage'
    | 'avatar'
    | 'cosmic'
    | 'dynastic'
    | 'ramayana'
    | 'mahabharata'
    | 'regional'
    | 'philosophical';
  era: EraId;
  introduction: string;
  chapters: Chapter[];
  characters: string[];
  events?: string[];
  consequences?: string[];
  whyItMatters?: string;
  philosophicalMeaning?: string;
  relatedStories?: string[];
  familyTree?: string;
  sources: SourceRef[];
  variations?: Variation[];
  quizId?: string;
  readingMinutes: number;
}

export type QuestionType = 'mcq' | 'truefalse' | 'order' | 'relationship' | 'reasoning';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  /** For mcq/relationship/reasoning/truefalse */
  options?: string[];
  /** Index of correct option (mcq etc.). For truefalse: 0 = True, 1 = False. */
  answer?: number;
  /** For 'order': items given in CORRECT order; UI shuffles them. */
  items?: string[];
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  topic: string;
  questions: QuizQuestion[];
}

export interface LessonSection {
  heading: string;
  body: string[];
  /** Optional embedded relationship map seed character ids */
  graph?: string[];
  aside?: string;
}

export interface Lesson {
  id: string;
  module: number;
  order: number;
  title: string;
  subtitle: string;
  minutes: number;
  intro: string;
  sections: LessonSection[];
  characters: string[];
  stories?: string[];
  variations?: Variation[];
  recap: string[];
  quizId: string;
  sources: SourceRef[];
  status?: 'complete' | 'in-development';
}

export interface GlossaryTerm {
  id: string;
  term: string;
  sanskrit?: string;
  short: string;
  long: string;
  related?: string[];
}

export interface Location {
  id: string;
  name: string;
  alternateNames?: string[];
  /** Position on the stylised map, 0..1000 x / 0..1100 y */
  x: number;
  y: number;
  kind: 'city' | 'forest' | 'mountain' | 'river' | 'ashram' | 'kingdom' | 'battlefield' | 'island' | 'cosmic';
  significance: string;
  modernIdentification: string;
  identificationConfidence: 'traditional' | 'commonly-identified' | 'disputed' | 'mythic';
  events?: string[];
  characters?: string[];
  stories?: string[];
  connectedTo?: string[];
}

export interface Dynasty {
  id: string;
  name: string;
  sanskritName: string;
  description: string;
  origin: string;
  /** Ordered principal line (abridged). */
  line: string[];
  familyTree: string;
  notes: string[];
  sources: SourceRef[];
}

export interface FamilyTree {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  /** Character ids included in this tree. */
  members: string[];
  /** Ids to show as tree roots (top of layout). */
  roots: string[];
  notes?: string[];
  /** Spouse links shown even if spouse is outside the main line. */
  abridged?: boolean;
}

export interface Timeline {
  id: string;
  title: string;
  description: string;
  eras: EraId[];
  /** If provided, only these events. */
  events?: string[];
}

export interface FeaturedDiscovery {
  id: string;
  question: string;
  teaser: string;
  link: string;
}
