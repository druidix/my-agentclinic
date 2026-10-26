# Requirements: Dashboard shell

Mary (engineering) wants a dashboard for easy access by agents and staff. This phase builds the page and its layout, with no data yet.

## Scope
In scope:
- A `/dashboard` page with four placeholder panels: Agents, Ailments, Therapies, Appointments.
- Each panel has a title and a "coming soon" note that names the phase that fills it.
- Responsive from phone to desktop, in light and dark themes.
- Automated tests for the route, the panels, and the active nav link.

Out of scope:
- Any real or seed data (phases 7 to 10).
- Links from panels to their list pages.
- Charts, counts, or interactivity.
- Authentication for staff.

## Decisions
- **Dedicated view and route.** `/dashboard` gets its own `dashboard.ejs`; the other nav pages stay on the placeholder view.
- **No fake data.** Panels say "coming soon" so nothing has to be removed later.
- **Panels defined in the route.** A small array of title and note keeps the view simple and easy for later phases to extend.
- **Plain CSS grid**, in `components.css`, using existing tokens. No framework and no JavaScript.
- **Tests check markup and the served CSS**, not pixel layout. Visual checks stay manual.

## Context
- `specs/mission.md` and `specs/tech-stack.md`: Express, EJS, plain CSS, Vitest.
- Phase 5 made the layout responsive; new components must follow the same breakpoints (`max-width: 40rem`) and 44px touch targets.
- The Dashboard nav link already exists and currently renders the generic placeholder.
