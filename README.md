# Hindu Mythology Explorer

*Explore the stories. Discover the connections. Understand the universe.*

A local-first, offline-capable React application for exploring Hindu mythology as one interconnected universe — timelines, family trees, relationship graphs, character profiles, chapter-based stories, a structured curriculum, quizzes and a sacred-geography map. No backend, accounts, paid APIs or AI services.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
```

Other commands:

| Command | Purpose |
|---|---|
| `npm run build` | Type-check and build to `dist/` |
| `npm run preview` | Serve the production build locally (works fully offline) |
| `npm test` | Unit tests: kinship engine, question parser, data integrity |
| `npm run validate` | Content-database integrity check only |
| `npm run typecheck` | TypeScript only |

Requires Node 18+ (developed on Node 24).

## Architecture

- **React 18 + TypeScript + Vite**, **Tailwind CSS** (theme tokens as CSS variables → Midnight & Parchment themes), **React Router** (every entity has a stable URL), **Framer Motion** (subtle transitions).
- **@xyflow/react + dagre** — interactive family trees (collapse/expand, ancestor/descendant highlighting, search, zoom/pan, minimap) and relationship networks.
- **MiniSearch** — local full-text search + a rule-based **question parser** ("Who was Ravana's father?", "How are Krishna and Arjuna related?").
- **Zustand + persist** — progress, bookmarks, recent items, quiz scores, streaks and settings in `localStorage`, behind one storage adapter (`src/store/storage.ts`) so it can be swapped for IndexedDB or sync later.
- **Fonts bundled** via `@fontsource`; character portraits are generated SVG emblems — no network needed at runtime.

### Content model

All content lives in typed TypeScript modules under `src/data`, referenced only by `id`:

```
characters/   divine, sages, puranic, ramayana, mahabharata  (Character)
relationships.ts   typed edges: parent, divine-parent, niyoga-parent, legal-parent,
                   adoptive-parent, mind-born, ancestor-of, spouse, sibling, teacher,
                   ally, enemy, curse, boon, killed, avatar-of, manifestation-of, …
events.ts     narrative-ordered events (no invented dates) with preceding/following/parallel
stories/      chapter-based stories with variations, sources and quiz
lessons.ts    six-module curriculum          quizzes.ts   5 questions each
lineages.ts   family trees, dynasties, timelines
locations.ts  map places + identification confidence
glossary.ts, sources.ts, eras.ts, featured.ts, pathways.ts
```

Every source reference carries a **confidence level**: attested · tradition · later interpretation · regional/folk · modern scholarship · disputed. References go to kanda/parva/skandha level and to chapter/verse only where reliably established.

Narrative text supports inline links that become hover/click popovers:
`[[char:rama]]`, `[[char:rama|Raghava]]`, `[[event:gita]]`, `[[story:samudra-manthana]]`, `[[term:dharma]]`, `[[place:lanka]]`, `[[dynasty:suryavansha]]`, `[[source:rigveda]]`.

### Folder structure

```
src/
  app/          App (routes, lazy-loaded pages), Layout, Sidebar, ContextPanel, ErrorBoundary
  components/   ui/ (RichText, Emblem, badges, sources, variations…), graph/ (FamilyTree, RelGraph),
                timeline/, quiz/, search/
  pages/        Home, Universe, TimelineExplorer, EventPage, FamilyTreeExplorer, CharacterExplorer,
                CharacterProfile, StoryExplorer, StoryReader, RelationshipExplorer, GeographyExplorer,
                GodsAvatars, Dynasties, DynastyPage, LearningPath, LessonPage, QuizCenter, QuizPage,
                ProgressPage, Glossary, Compare, CompareTraditions, SearchPage, Sources, Settings
  lib/          graph.ts, kinship.ts, treeLayout.ts, search.ts, names.ts, questionParser.ts,
                achievements.ts, validate.ts (+ tests)
  store/        progress.ts, settings.ts, storage.ts
  data/         content database (see above)
```

## Features

- **Home** — cosmic hero, seven pathways, continue-learning panel, featured discoveries.
- **Timeline** — horizontal (zoom from era overview to events; Ctrl+wheel), parallel lanes with overlap markers, vertical, by-era and list views; filters by era, source, character, dynasty, deva/asura/sage, category and story; slide-over event detail.
- **Family trees** (9) — divine, sages, Solar, Lunar, Kuru, Yadava, Rama's family, Ravana's lineage, vanaras. Biological, divine, niyoga, legal, adoptive, mind-born and abridged links styled distinctly.
- **How Everything Connects** — step-by-step kinship paths with kinship terms ("first cousin", "great-uncle"), alternative connections (e.g. by marriage), click any edge for its explanation and source.
- **Characters** (~170) — identity, family, biography, stories, timeline, connections, significance, sources & "Different Traditions and Versions"; compare any two characters.
- **Stories** (15) — chapter reader with progress, inline popovers, three reading modes, keyboard navigation, consequences, meaning, variations, sources, knowledge check.
- **Learning path** — six lessons (one per module) with embedded relationship maps, recap and quiz.
- **Quizzes** (9) — multiple choice, true/false, relationship, chronological ordering (drag or arrows), reasoning; separate answer section.
- **Progress** — completed lessons/stories, streaks, achievements, topic mastery, bookmarks, recent items; export/import JSON in Settings.
- **Map**, **Glossary**, **Sources**, **Compare traditions**, **Search** with direct answers.

## Adding content

1. **Character** — add an object to the right file in `src/data/characters/` (unique `id`, `category`, `title`, `description`, `biography[]`, `sources[]`). Use `ref(sourceId, section, confidence)`.
2. **Relationships** — add `rel(source, type, target, explanation, { sources, confidence })` to `relationships.ts`. Store parent links once (parent → child); inverses are derived. Use `ancestor-of` when generations are skipped.
3. **Event** — add to `events.ts` with an `order` number placing it in narrative sequence, plus `preceding`/`following`.
4. **Story** — create chapters in `src/data/stories/*.ts`; add a `quizId` and `variations` where traditions differ.
5. **Family tree** — add member ids to a tree in `lineages.ts`; layout is automatic.
6. Run `npm run validate` — it reports broken ids, broken `[[links]]`, unknown sources, quiz shape errors and parent cycles.

## Limitations & planned work

- Genealogies are **abridged** where Puranic lists differ (marked in the UI); intermediate kings of the Solar/Lunar lines are not all modelled.
- Lesson 1 is written at full depth (~22 min); lessons 2–6 are complete but shorter (~14–18 min), relying on the linked stories for full narratives.
- Map uses a stylised outline with approximate positions — it is not a GIS map.
- Portraits are generated emblems; an `image` field is ready for real artwork.
- Some married-in spouses in large family trees are laid out away from their partner (connected by a curved marriage link).
- Search is keyword/rule-based, not natural-language AI; the architecture leaves room for a local AI layer later.
