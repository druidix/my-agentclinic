# Tech Stack

## Language and runtime

- TypeScript (strict), running server-side on Node.js.

## Framework (recommended): Express

- The most popular and battle-tested Node framework, which fits the reliability goal.
- Server-rendered pages with EJS templates, with HTMX for light interactivity. This avoids a heavy SPA build and works well in modern browsers.
- Alternatives considered: Fastify (faster, smaller ecosystem), Next.js (heavier than needed).

## Data

- SQLite: a single-file, zero-setup database that suits demos and course use.

## Tooling

- `tsc` for builds (already configured).
- Plain CSS, designed to look attractive and responsive.
