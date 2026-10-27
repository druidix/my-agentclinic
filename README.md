# AgentClinic - An SDD tutorial

[![CI](https://github.com/druidix/my-agentclinic/actions/workflows/ci.yml/badge.svg)](https://github.com/druidix/my-agentclinic/actions/workflows/ci.yml)

## Input from stakeholders

- Mary in engineering wants a reliable site with a popular stack based on TypeScript, giving agents and staff a dashboard for easy access.
- Susan in product has a set of features about agents and their ailments, therapies, and booking appointments.
- Steve in marketing wants an attractive site that works well with a modern browser.

## Getting started

Requires Node 22 or later.

```bash
npm install
npm run dev            # dev server with reload on http://localhost:3000
npm run build && npm start   # compiled server
npm test               # Vitest + supertest
npm run typecheck      # type-check src and tests
npm run smoke          # start the built app and check /health and the Pico CSS (run build first)
```

Set `PORT` to use a different port, for example `PORT=4000 npm start`.

## Project layout

- `src/`: the Express app (`app.ts`), routers (`routes/`), and the nav and sections (`sections.ts`).
- `views/`: EJS templates and partials.
- `public/css/app.css`: our CSS; [Pico CSS](https://picocss.com) is served from `node_modules` at `/vendor/pico`.
- `tests/`: Vitest tests.
- `specs/`: the project constitution (`mission.md`, `tech-stack.md`, `roadmap.md`) and one folder per feature with its plan, requirements, and validation.
- `CHANGELOG.md`: commits grouped by date.

