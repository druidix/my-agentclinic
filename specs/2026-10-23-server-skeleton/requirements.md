# Requirements: Server skeleton

## Scope
In scope:
- An Express server written in strict TypeScript.
- `GET /`: plain HTML page saying "Hello AgentClinic".
- `GET /health`: JSON `{ "status": "ok" }`.
- `PORT` environment variable, default 3000.
- npm scripts: `dev`, `build`, `start`.

Out of scope (later phases):
- EJS templates, layout, and styling (phase 2).
- Dashboard, data, and SQLite (later phases).
- Automated tests.

## Decisions
- **Express** is the framework, per `specs/tech-stack.md`.
- **tsx** runs the dev server with watch mode. Production uses `tsc` output.
- The hello page is inline HTML for now. EJS arrives in phase 2.
- Manual validation only. No test framework yet.

## Context
- `specs/mission.md`: reliable, simple, and demo-friendly for course students and conference booths. The skeleton should run with `npm install && npm run dev`.
- `specs/tech-stack.md`: TypeScript (strict) on Node, Express, EJS and HTMX later, SQLite later.
- `src/index.ts` currently contains only a placeholder `console.log`.
