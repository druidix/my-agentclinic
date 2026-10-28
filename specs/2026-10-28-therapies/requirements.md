# Requirements: Therapies

Susan (product) wants features for agents, ailments, and therapies. This phase adds therapies and links them to ailments in both directions, which sets up booking in phases 11 and 12.

## Scope
In scope:
- A `/therapies` page listing therapies with a description, a duration, and the ailments each one treats.
- Six seed therapies (lighthearted, on-brand), together covering all six seed ailments.
- Ailment names on `/therapies` link to the matching `/ailments` article; each ailment on `/ailments` lists the therapies that help and links to them.
- The dashboard Therapies panel shows a live count and links to `/therapies`.
- Responsive from phone to desktop, in light and dark themes.
- Automated tests for the data, the joins, the routes, the links, the nav link, and the dashboard panel.

Out of scope:
- A therapy detail page (`/therapies/:id`).
- Appointments (phases 11 and 12); no "book" button yet.
- Price or cost fields.
- Creating, editing, or deleting therapies; SQLite (phase 13); search or sorting.

## Decisions
- **`ailmentIds` on each therapy**, with a standalone `Therapy` type, mirroring `Ailment.agentIds`. The many-to-many link maps onto a join table in phase 13.
- **`durationMinutes`** (a positive integer) so booking can later show and use session length. This is a duration, not a timestamp, so the UTC rule in `specs/tech-stack.md` does not apply here; times arrive with appointments in phase 11.
- **Join functions, not joins in templates.** `getTherapiesWithAilments()` and `getTherapiesForAilment()` keep ids out of views and keep the SQLite swap inside the data layer.
- **Row anchors** on both pages (`ailment-<id>`, `therapy-<id>`) so cross-links land on the item, as with `agent-<id>`.
- **Pico `<article>` per therapy**, matching the ailments page.
- **The Therapies panel goes live**; Appointments stays a placeholder.
- **Standalone types** for `Therapy`, the joined record, and the view props, per `specs/tech-stack.md`.

## Context
- `specs/mission.md`: course students and conference demos, so seed data should be fun and demo-ready.
- `specs/tech-stack.md`: Express, EJS, Pico CSS, Vitest.
- Phase 9 (`specs/2026-10-26-ailments/`) set the pattern: typed data module, `getX()` function, a join function, a router per resource, anchors, and a live dashboard panel.
