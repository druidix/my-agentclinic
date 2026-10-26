# Requirements: Test setup

## Scope
In scope:
- Vitest as the test runner, with `npm test` and `npm run test:watch`.
- `supertest` for HTTP-level tests against the Express app without opening a port.
- Split `src/app.ts` (exports the app) from `src/index.ts` (starts the server).
- Tests in `tests/` for: `/`, `/health`, the five placeholder routes, 404 handling, and the active nav link.

Out of scope:
- A CI workflow (phase 4).
- Coverage thresholds and reporting.
- Browser or end-to-end tests.
- Tests for features that do not exist yet (those arrive with their phases).

## Decisions
- **Vitest**, per `specs/tech-stack.md`.
- **`supertest`** is added alongside it, because the tests exercise Express routes directly.
- **Split `app.ts` / `index.ts`** so importing the app never starts a server.
- **Tests live in `tests/`** at the repo root, not beside the source.
- Test files are not emitted into `dist/`.
- Tests assert on the rendered HTML (substrings and the active-link marker), not exact whole-page snapshots, so ordinary style changes do not break them.

## Context
- `specs/mission.md`: course students and conference demos. Tests should be easy to read and run (`npm install && npm test`).
- `specs/tech-stack.md`: Vitest for app testing.
- Phases 1 and 2 were validated by hand with `curl` and a browser. This phase turns the `curl` checks into repeatable tests.
- Future phases should use `npm test` in their `validation.md` files.
