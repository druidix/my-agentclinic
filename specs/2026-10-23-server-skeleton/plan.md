# Plan: Server skeleton (roadmap phase 1)

## 1. Dependencies and scripts
1. Install `express` as a dependency.
2. Install `@types/express`, `@types/node`, and `tsx` as dev dependencies.
3. Add scripts to `package.json`:
   - `dev`: `tsx watch src/index.ts`
   - `build`: `tsc` (existing)
   - `start`: `node dist/index.js`

## 2. Server
1. Replace the placeholder in `src/index.ts` with an Express app.
2. Read the port from `PORT`, defaulting to 3000.
3. `GET /` serves a plain HTML "Hello AgentClinic" page.
4. `GET /health` returns JSON `{ "status": "ok" }`.
5. Log the listening URL on startup.

## 3. Verify
1. Run the checks in `validation.md`.
2. Fix anything that fails.

## 4. Wrap up
1. Mark phase 1 done in `specs/roadmap.md`.
2. Commit on this branch and open a PR to `main`.
