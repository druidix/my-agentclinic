# Tech Stack

## Language and runtime

- TypeScript (strict), running server-side on Node.js.

## Framework (recommended): Express

- The most popular and battle-tested Node framework, which fits the reliability goal.
- Server-rendered pages with EJS templates, with HTMX for light interactivity. This avoids a heavy SPA build and works well in modern browsers.
- Alternatives considered: Fastify (faster, smaller ecosystem), Next.js (heavier than needed).

## Data

- SQLite: a single-file, zero-setup database that suits demos and course use.

## Testing

- Vitest for app testing: it runs TypeScript directly, starts fast, and has a watch mode.

## Tooling

- `tsc` for builds (already configured).
- Pico CSS as the CSS framework: classless, semantic-HTML-first styling with built-in light and dark themes and responsive defaults. Small custom stylesheets add only what Pico does not cover.
