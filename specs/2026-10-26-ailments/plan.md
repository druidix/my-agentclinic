# Plan: Ailments (roadmap phase 9)

## 1. Data
1. Add `src/data/ailments.ts` with a standalone `Ailment` type (`id`, `name`, `description`, `agentIds`) and a seed array of ailments, each affecting one or more of the six seed agents.
2. Export `getAilments()`. Routes call only this function and `getAgents()`, so phase 13 can swap in SQLite.
3. Add a small `getAilmentsWithAgents()` that joins each ailment to its `Agent` records, so routes and views get names, not ids.

## 2. Route and view
1. Add `src/routes/ailments.ts`: `GET /ailments` renders `ailments` with the joined list.
2. Mount it in `src/app.ts`, and mark Ailments as no longer a placeholder in `src/sections.ts`.
3. Add `views/ailments.ejs`: a heading and one Pico `<article>` per ailment, with its name, description, and the agents who have it.
4. Each agent name links to `/agents#agent-<id>`. Give each row on the agents page a matching `id`, so the link lands on the row.
5. Define the view's props as standalone types.

## 3. Dashboard
1. Change the Ailments panel from "coming soon" to a live note with the ailment count and a link to `/ailments`.
2. The Therapies and Appointments panels stay placeholders.

## 4. Tests
Add to `tests/` using `supertest`:
1. Every seed ailment has filled fields, unique ids, and at least one `agentId`, and every `agentId` matches a real agent.
2. `getAilmentsWithAgents()` returns the agent records for each ailment.
3. `/ailments` returns 200, has an article per ailment, and shows each ailment's agents as links to `/agents#agent-<id>`.
4. The agents page rows carry the matching `id` attributes.
5. The Ailments nav link is active on `/ailments`, and the page is not a placeholder.
6. The dashboard Ailments panel shows the count and links to `/ailments`; the other two panels still say "coming soon".

## 5. Verify
1. `npm test`, `npm run typecheck`, `npm run build`, and `npm run smoke` pass.
2. Check the browser at about 375px, 768px, and 1280px, in light and dark.
3. Confirm the CI check passes on the PR.

## 6. Wrap up
1. Mark phase 9 done in `specs/roadmap.md`.
2. Update `CHANGELOG.md` with `/changelog` (the earlier merges are already in the working tree).
3. Merge the PR once CI is green and the user asks for the merge.
