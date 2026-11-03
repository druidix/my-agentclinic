# AgentClinic - An SDD tutorial

[![CI](https://github.com/druidix/my-agentclinic/actions/workflows/ci.yml/badge.svg)](https://github.com/druidix/my-agentclinic/actions/workflows/ci.yml)

## Input from stakeholders

- Mary in engineering wants a reliable site with a popular stack based on TypeScript, giving agents and staff a dashboard for easy access.
- Susan in product has a set of features about agents and their ailments, therapies, and booking appointments.
- Steve in marketing wants an attractive site that works well with a modern browser.

## Status

The MVP is complete: agents, ailments, therapies, appointment booking, and a staff dashboard, stored in SQLite. See `specs/roadmap.md`.

## Getting started

Requires Node 22.13 or later (the database uses the built-in `node:sqlite`).

```bash
npm install
npm run dev            # dev server with reload on http://localhost:3000
npm run build && npm start   # compiled server
npm test               # Vitest + supertest
npm run typecheck      # type-check src and tests
npm run smoke          # start the built app and check /health and the Pico CSS (run build first)
```

Set `PORT` to use a different port, for example `PORT=4000 npm start`.

Data lives in SQLite at `data/agentclinic.db`, which is created and seeded on first start (delete it to reset). Set `DATABASE_PATH` to use another file. Node prints an `ExperimentalWarning` for `node:sqlite`; that is expected.

## Project layout

- `src/`: the Express app (`app.ts`), routers (`routes/`), the nav and sections (`sections.ts`), and the database (`db.ts`, with data modules and seed data in `data/`).
- `views/`: EJS templates and partials.
- `public/css/app.css`: our CSS; [Pico CSS](https://picocss.com) is served from `node_modules` at `/vendor/pico`.
- `tests/`: Vitest tests.
- `specs/`: the project constitution (`mission.md`, `tech-stack.md`, `roadmap.md`) and one folder per feature with its plan, requirements, and validation.
- `CHANGELOG.md`: commits grouped by date.

