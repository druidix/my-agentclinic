# Plan: Test setup (roadmap phase 3)

## 1. Make the app testable
1. Move the Express app (view engine, layouts, static files, nav, routes) from `src/index.ts` into a new `src/app.ts` that exports `app`.
2. Reduce `src/index.ts` to importing `app`, reading `PORT`, and calling `listen()`.
3. Confirm `npm run build`, `npm run dev`, and `npm start` still work.

## 2. Install and configure Vitest
1. Install `vitest` and `supertest` as dev dependencies, plus `@types/supertest`.
2. Add a `test` script (`vitest run`) and a `test:watch` script (`vitest`).
3. Add a minimal `vitest.config.mts` that includes only `tests/**/*.test.ts`.
4. Exclude `tests/` from the `tsc` build, or confirm it does not emit into `dist/`.

## 3. Write the first tests
Put them in `tests/`, using `supertest` against the exported `app`.
1. `GET /` returns 200 with the layout (header, nav, footer) and "Hello AgentClinic".
2. `GET /health` returns 200 with `{ "status": "ok" }`.
3. Each placeholder route (`/dashboard`, `/agents`, `/ailments`, `/therapies`, `/appointments`) returns 200 and contains its title.
4. An unknown path returns 404.
5. The nav link for the current page is marked active, and only that one.

## 4. Verify
1. Run the checks in `validation.md`, including the deliberate-break check.
2. Fix anything that fails.

## 5. Wrap up
1. Update the phase 3 line in `specs/roadmap.md` to match this scope and mark it done.
2. Commit and open a PR to `main`.
