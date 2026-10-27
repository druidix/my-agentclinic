# Requirements: Ailments

Susan (product) wants features about agents and their ailments. This phase adds the second list page and the first link between two kinds of data.

## Scope
In scope:
- An `/ailments` page listing ailments with a description and the agents who have each one.
- Seed ailments (lighthearted, on-brand), each linked to one or more of the six seed agents.
- Agent names on the page link to the matching row on `/agents`.
- The dashboard Ailments panel shows a live count and links to `/ailments`.
- Responsive from phone to desktop, in light and dark themes.
- Automated tests for the data, the join, the route, the links, the nav link, and the dashboard panel.

Out of scope:
- An ailment detail page (`/ailments/:id`).
- Therapies for ailments (phase 10) and appointments (phase 11).
- Showing ailments on the agents page; the agents table keeps its columns.
- Creating, editing, or deleting ailments; SQLite (phase 13); search or sorting.

## Decisions
- **One list with agents inline**, matching the roadmap line "list ailments and show which agents have them".
- **`agentIds` on each ailment**, in `src/data/ailments.ts`, with a standalone `Ailment` type. A many-to-many link maps cleanly onto a join table in phase 13.
- **A join function, not a join in the template.** `getAilmentsWithAgents()` resolves ids to agents, so views never touch ids and the SQLite swap stays inside the data layer.
- **Pico `<article>` per ailment**, which reads well on a phone and fits several agents per ailment better than a table column.
- **Row anchors on the agents page.** Each agent row gets `id="agent-<id>"` so the links land on the row. This is the only change to the agents page, and it is invisible.
- **The Ailments panel goes live** like the Agents panel did; Therapies and Appointments stay placeholders.
- **Standalone types** for `Ailment`, the joined record, and the view props, per `specs/tech-stack.md`.

## Context
- `specs/mission.md`: course students and conference demos, so the seed data should be fun and demo-ready.
- `specs/tech-stack.md`: Express, EJS, Pico CSS, Vitest.
- Phase 8 (`specs/2026-10-26-agents/`) set the pattern: typed data module, `getX()` function, a router per resource, a live dashboard panel, and the `placeholder` flag in `src/sections.ts`.
