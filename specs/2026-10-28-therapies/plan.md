# Plan: Therapies (roadmap phase 10)

## 1. Data
1. Add `src/data/therapies.ts` with a standalone `Therapy` type (`id`, `name`, `description`, `durationMinutes`, `ailmentIds`) and six seed therapies. Every seed ailment is treated by at least one therapy.
2. Export `getTherapies()`. Routes call only this and the other `getX()` functions, so phase 13 can swap in SQLite.
3. Add `getTherapiesWithAilments()`, which joins each therapy to its `Ailment` records, and `getTherapiesForAilment(ailmentId)`, which the ailments page uses.

## 2. Therapies page
1. Add `src/routes/therapies.ts`: `GET /therapies` renders `therapies` with the joined list. Define the view props as standalone types.
2. Mount it in `src/app.ts`, and mark Therapies as no longer a placeholder in `src/sections.ts`.
3. Add `views/therapies.ejs`: a heading and one Pico `<article id="therapy-<id>">` per therapy, with its name, description, duration, and the ailments it treats.
4. Each ailment name links to `/ailments#ailment-<id>`.

## 3. Ailments page
1. Give each ailment `<article>` an `id="ailment-<id>"` so links land on it.
2. Add a "Therapies that help" list to each ailment, linking to `/therapies#therapy-<id>`.

## 4. Dashboard
1. Change the Therapies panel to a live note with the therapy count and a link to `/therapies`.
2. The Appointments panel stays a placeholder.

## 5. Tests
Add to `tests/` using `supertest`:
1. Every seed therapy has filled fields, unique ids, a positive `durationMinutes`, and at least one `ailmentId`, and every `ailmentId` matches a real ailment.
2. Every seed ailment is treated by at least one therapy.
3. `getTherapiesWithAilments()` and `getTherapiesForAilment()` return the right records.
4. `/therapies` returns 200, has an article per therapy, and links each ailment to `/ailments#ailment-<id>`.
5. `/ailments` rows carry `id="ailment-<id>"` and link to their therapies at `/therapies#therapy-<id>`.
6. The Therapies nav link is active on `/therapies`, and the page is not a placeholder.
7. The dashboard Therapies panel shows the count and links to `/therapies`; Appointments still says "coming soon".

## 6. Verify
1. `npm test`, `npm run typecheck`, `npm run build`, and `npm run smoke` pass.
2. Check the browser at about 375px, 768px, and 1280px, in light and dark.
3. Confirm the CI check passes on the PR.

## 7. Wrap up
1. Mark phase 10 done in `specs/roadmap.md`.
2. Update `CHANGELOG.md` with `/changelog` (includes the phase 9 merge).
3. Merge the PR once CI is green and the user asks for the merge.
