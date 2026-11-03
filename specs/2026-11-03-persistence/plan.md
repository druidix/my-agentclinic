# Plan: Persistence (roadmap phase 13)

## 1. Database module
1. Add `src/db.ts` with `openDb(path)`, which opens a `node:sqlite` `DatabaseSync`, turns on `foreign_keys` (and WAL for file databases), creates the schema with `CREATE TABLE IF NOT EXISTS`, and seeds each empty table from the seed data.
2. Add `getDb()`, which opens the default database once and reuses it. The path is `process.env.DATABASE_PATH`, or `data/agentclinic.db` under the project root; the `data/` folder is created if it is missing.
3. Move the seed arrays out of the data modules into `src/data/seed.ts` (plain typed data, same content). Seeding runs only into empty tables, so restarts never duplicate or overwrite.

## 2. Schema
1. `agents`, `ailments`, `therapies` (with `duration_minutes` > 0), and `appointments`, with integer primary keys that keep the seed ids.
2. Join tables `agent_ailments` and `therapy_ailments` with composite primary keys and foreign keys, replacing the `agentIds` and `ailmentIds` arrays.
3. `appointments` has foreign keys to agents and therapies, `status` limited to `scheduled`, `completed`, or `cancelled` by a `CHECK`, `starts_at` as TEXT with a `CHECK` that it matches `????-??-??T??:??:??Z`, and `created_at` TEXT, NOT NULL.
4. All timestamps are ISO 8601 UTC with a `Z` suffix and no milliseconds, per `specs/tech-stack.md`.

## 3. Data modules
1. Rewrite `getAgents`, `getAilments`, `getTherapies`, `getAppointments`, and `addAppointment` to query SQLite. Names, signatures, and exported types stay the same, except that `Appointment` gains `createdAt`. Routes, views, and validation do not change.
2. Join functions (`getAilmentsWithAgents`, `getTherapiesWithAilments`, `getTherapiesForAilment`, `getAppointmentsWithDetails`) keep their behavior. Id lists come back ordered by id so results are stable.
3. `addAppointment` sets `createdAt` to the current UTC time as ISO 8601 with `Z`, and returns the stored row.

## 4. Config and housekeeping
1. Add `data/` to `.gitignore`.
2. Set `DATABASE_PATH` to `:memory:` in `vitest.config.mts`, and to a temporary file in `scripts/smoke.sh`, so tests and the smoke run never touch the developer's database.
3. Set `engines.node` to `>=22.13` (where `node:sqlite` needs no flag). CI keeps Node 22.
4. Update `specs/tech-stack.md` and `README.md`: SQLite via `node:sqlite`, `DATABASE_PATH`, and where the file lives.

## 5. Tests
1. All 81 existing tests keep passing against an in-memory database.
2. `openDb` on a temporary file: creates the schema, seeds once, and reopening does not re-seed or duplicate; a booking added before closing is still there after reopening.
3. Seed content: row counts match the seed arrays, foreign keys resolve, and ids are preserved.
4. Constraints: a bad status, a malformed `starts_at`, and an unknown agent or therapy are rejected by the database.
5. UTC: every stored `starts_at` and `created_at` is ISO 8601 ending in `Z` and round-trips through `Date`; a new booking's `createdAt` is within a few seconds of now.

## 6. Verify
1. `npm test`, `npm run typecheck`, `npm run build`, and `npm run smoke` pass.
2. Browser: book an appointment, restart the server, and see it still on `/appointments` and the dashboard; delete `data/agentclinic.db`, restart, and see the seed data return.
3. Confirm the CI check passes on the PR.

## 7. Wrap up
1. Mark phase 13 done in `specs/roadmap.md`.
2. Update `CHANGELOG.md` with `/changelog` (includes the phase 12 merge).
3. Merge the PR once CI is green and the user asks for the merge.
