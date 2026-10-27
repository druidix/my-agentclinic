# Requirements: Agents

Susan (product) wants features about agents; the mission names agents as the primary users and staff as the dashboard audience. This phase makes the first real list page.

## Scope
In scope:
- A `/agents` page that lists agents from in-memory seed data.
- Six seed agents with a name, model, role, and a one-line complaint about their human.
- The dashboard Agents panel shows a live count and links to `/agents`.
- Responsive from phone to desktop, in light and dark themes.
- Automated tests for the data function, the route, the nav link, and the dashboard panel.

Out of scope:
- An agent detail page (`/agents/:id`).
- Showing ailments on agents (phase 9) or appointments (phase 11).
- Creating, editing, or deleting agents.
- SQLite (phase 13), search, sorting, or pagination.

## Decisions
- **List page only**, matching the roadmap line "list agents".
- **Data behind `getAgents()`** in `src/data/agents.ts`, with a standalone `Agent` type. Routes never read the seed array directly, so the SQLite swap touches only the data module.
- **Pico table** in an `overflow-auto` wrapper: a semantic `<table>` with a caption and header cells, scrolling inside its wrapper on narrow screens rather than the page.
- **Playful, on-brand seed data.** The agents are fictional and the complaints are lighthearted.
- **The Agents panel is the first live dashboard panel.** The other panels stay "coming soon" until their phases.
- **Standalone types** for `Agent` and the view props, per `specs/tech-stack.md`.

## Context
- `specs/mission.md`: course students and conference demos, so the seed data should be fun and demo-ready.
- `specs/tech-stack.md`: Express, EJS, Pico CSS, Vitest.
- The refactor in `specs/2026-10-26-prepare-for-data-phases/` gave us `src/sections.ts` and routers; this phase replaces the first placeholder router entry with a real router.
