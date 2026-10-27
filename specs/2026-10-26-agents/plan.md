# Plan: Agents (roadmap phase 8)

## 1. Data
1. Add `src/data/agents.ts` with a standalone `Agent` type (`id`, `name`, `model`, `role`, `complaint`) and a seed array of six playful agents, each with a one-line complaint about their human.
2. Export `getAgents()` that returns the seed data. Routes call only this function, so phase 13 can replace it with SQLite.

## 2. Route and view
1. Add `src/routes/agents.ts`: `GET /agents` renders `agents` with the list.
2. Mount it in `src/app.ts`, and stop the placeholder router from handling `/agents`.
3. Add `views/agents.ejs`: a heading and a Pico table inside `overflow-auto`, with a caption, column headers, and one row per agent.
4. Define the view's props as a standalone type.

## 3. Dashboard
1. Change the Agents panel from a "coming soon" note to a live note with the agent count and a link to `/agents`.
2. The other three panels stay as placeholders.

## 4. Tests
Add to `tests/` using `supertest`:
1. `getAgents()` returns the six seed agents, each with every field filled.
2. `/agents` returns 200, shows a table with a caption, and has one row per seed agent.
3. The Agents nav link is active on `/agents`.
4. `/agents` is no longer a placeholder, and the other three placeholders still work.
5. The dashboard Agents panel shows the count and links to `/agents`.

## 5. Verify
1. `npm test`, `npm run typecheck`, `npm run build`, and `npm run smoke` pass.
2. Check the browser at about 375px, 768px, and 1280px, in light and dark.
3. Confirm the CI check passes on the PR.

## 6. Wrap up
1. Mark phase 8 done in `specs/roadmap.md`.
2. Run `/changelog` on this branch to add the earlier merges.
3. Merge the PR once CI is green and the user asks for the merge.
