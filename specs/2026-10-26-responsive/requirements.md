# Requirements: Responsive design

> **Superseded in part:** the CSS in this spec was replaced by Pico CSS in `specs/2026-10-26-pico-css/`. The stylesheet files and class names named here no longer exist.

Product requires the app to conform to responsive design.

## Scope
In scope:
- The layout, header, nav, footer, home page, and placeholder pages work from phone (about 375px) to desktop (1280px and wider).
- No horizontal scrolling at any width.
- Nav links and buttons are touch-friendly on small screens (at least 44px tall).
- Automated tests for the viewport tag, stylesheet links, and presence of the responsive rules.

Out of scope:
- A collapsible or JavaScript-driven menu.
- Layout for pages that do not exist yet. Each later phase builds its pages responsive from the start.
- Accessibility auditing and visual polish (final polish phase).

## Decisions
- **Wrapping nav, no JavaScript.** The header stacks on narrow screens and the nav wraps. This is the simplest and most robust option for six short links.
- **Plain CSS with media queries**, in the existing per-concern files. No framework and no build step.
- **A single small-screen breakpoint** (`max-width: 40rem`) plus a wide-screen adjustment, to keep the CSS easy to read for course students.
- **Tap target minimum of 44px** on small screens, following common touch guidelines.
- **Tests check the markup and the served CSS**, not pixel layout. Visual checks stay manual.

## Context
- `specs/mission.md`: Steve (marketing) wants an attractive site that works well in a modern browser, and demos may run on phones and tablets.
- `specs/tech-stack.md`: plain CSS, Express, EJS.
- Phase 2 shipped the layout with a viewport meta tag and a basic wrapping nav. Responsive design was deferred to the polish phase and is now required, so it moves to this phase.
- The roadmap is updated: responsive design is phase 5 and is removed from the polish phase.
