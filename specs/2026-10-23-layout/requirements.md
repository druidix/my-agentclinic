# Requirements: Layout

> **Superseded in part:** the CSS in this spec was replaced by Pico CSS in `specs/2026-10-26-pico-css/`. The stylesheet files and class names named here no longer exist.

## Scope
In scope:
- A shared EJS layout used by every page.
- Header with the brand name and nav links: Home, Dashboard, Agents, Ailments, Therapies, Appointments.
- Footer with the project name and the mission tagline.
- A stylesheet in `public/`: modern, with automatic light and dark themes via `prefers-color-scheme`.
- Placeholder pages for sections that don't exist yet, so no nav link is broken.
- Active nav link highlighting.

Out of scope (later phases):
- Real dashboard, agent, ailment, therapy, or appointment content (later phases).
- Responsive and mobile layout (done later, in the responsive design phase).
- HTMX and client-side JavaScript.
- Data and SQLite.
- Automated tests.

## Decisions
- **EJS with `express-ejs-layouts`**: the layout wraps every page automatically.
- **Plain CSS**, no framework or build step. The theme uses CSS custom properties.
- **Dark mode** uses `prefers-color-scheme` only, with no toggle and no JavaScript.
- **Paths** to `views/` and `public/` are resolved from `__dirname` so `npm run dev` and `npm start` behave the same.
- Placeholder pages share one template, with the title passed in.
- `/health` stays unchanged.

## Context
- `specs/mission.md`: the audience is course students and conference-booth demos, so the site should look good immediately. Steve (marketing) wants an attractive site that works in modern browsers.
- `specs/tech-stack.md`: Express with EJS, plain CSS.
- Phase 1 left an inline HTML page in `src/index.ts`, which this phase replaces with a view.
