# Requirements: Prepare for the data phases

## Scope
In scope:
- One typed source of truth for the sections, with nav, panels, routes, and tests derived from it.
- A router split, so `app.ts` is configuration only.
- A real 404 page and an error handler.
- Nav matching that handles trailing slashes, case, and nested paths.
- Cleanups: Pico's `.grid`, scoped CSS, test cleanup, `engines`, `@types/node`, and `x-powered-by`.
- A smoke test of the compiled app.

Out of scope (handled in a follow-up PR):
- Updating older specs, README, `CHANGELOG.md`, and the `/changelog` skill.
- Accessibility changes (skip link, active-link contrast), security headers beyond `x-powered-by`, and Dependabot or CI pinning.

Out of scope (later phases):
- The data or repository layer (phase 8), SQLite (phase 13), and HTMX.

## Decisions
- **`src/sections.ts` is the single source of truth.** Adding a section is one array entry.
- **Standalone named types** for sections, nav items, and render props, as `specs/tech-stack.md` requires.
- **Routers per concern** under `src/routes/`; each data phase adds its own router.
- **404 and error pages render inside the layout** and never leak a stack trace.
- **Active nav rule:** a link is active when the normalized path equals its href or starts with `href + '/'`; `/` matches only itself.
- **Behavior is otherwise unchanged:** same URLs, same nav, same dashboard, same visual design.

## Context
- Source: a three-perspective review of `main` after phase 7 (correctness, structure, specs and docs).
- `specs/mission.md` and `specs/tech-stack.md`: Express, EJS, Pico CSS, Vitest.
- Phases 5 to 7 set the breakpoint (`max-width: 40rem`) and the 44px tap target; both must still hold.
