# Requirements: Pico CSS

`specs/tech-stack.md` now names Pico CSS as the CSS framework. This phase moves the app onto it before the list pages (phases 8 to 11) are built.

## Scope
In scope:
- Install Pico CSS and serve it locally.
- Migrate the layout, header, nav, footer, home page, placeholder pages, and dashboard to Pico's markup and variables.
- Replace the five custom stylesheets with Pico plus one small `app.css` for what Pico lacks.
- Keep light and dark themes, the responsive layout, and 44px tap targets working.
- Update the automated tests for the new stylesheet links and rules.

Out of scope:
- New pages, features, or data.
- A custom Pico theme build (Sass) or color overhaul.
- Accessibility auditing beyond the nav checks (final polish phase).

## Decisions
- **npm package, served locally.** `@picocss/pico` is a pinned dependency served from `node_modules` at `/vendor/pico`. It works offline and makes no third-party request.
- **Standard `pico.min.css`**, not the classless build, so `.container` and `.grid` are available.
- **Migrate everything, keep minimal custom CSS.** One `app.css` replaces `tokens.css`, `base.css`, `header.css`, `footer.css`, and `components.css`, so styling is not duplicated.
- **Pico's variables replace our tokens.** Dark mode follows `prefers-color-scheme` as Pico provides it.
- **Tests check markup and served CSS**, not pixel layout. Visual checks stay manual.
- **Prop and data shapes use standalone TypeScript types**, per the conventions in `specs/tech-stack.md`.

## Context
- `specs/mission.md` and `specs/tech-stack.md`: Express, EJS, Pico CSS, Vitest.
- Phase 5 set the breakpoint (`max-width: 40rem`) and the 44px tap target; phase 6 added the dashboard panels. Both must still hold.
- `express.static` already serves `public/`; `rootDir` points at the project root from both `src/` and `dist/`, so the `node_modules` path works in dev and after a build.
