# Tech Stack

## Language and runtime

- TypeScript (strict), running server-side on Node.js.

## Framework (recommended): Express

- The most popular and battle-tested Node framework, which fits the reliability goal.
- Server-rendered pages with EJS templates, with HTMX for light interactivity. This avoids a heavy SPA build and works well in modern browsers.
- Alternatives considered: Fastify (faster, smaller ecosystem), Next.js (heavier than needed).

## Data

- SQLite: a single-file, zero-setup database that suits demos and course use.
- All persisted timestamps are UTC, whether the store is persistent (SQLite) or transient (a cache such as Redis). Standardize on ISO 8601 strings with a `Z` suffix (for example `2026-10-27T02:01:18Z`), unless there is a specific need to deviate; record the reason in the feature's `requirements.md`. Convert to the viewer's local time zone only when rendering.

## Testing

- Vitest for app testing: it runs TypeScript directly, starts fast, and has a watch mode.

## Tooling

- `tsc` for builds (already configured).
- Pico CSS as the CSS framework: classless, semantic-HTML-first styling with built-in light and dark themes and responsive defaults. Small custom stylesheets add only what Pico does not cover.

## Conventions

- Define component and template props as a standalone, named TypeScript type (or interface). Do not write prop definitions inline.
