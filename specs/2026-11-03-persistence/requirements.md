# Requirements: Persistence

Mary (engineering) wants a reliable site; Susan (product) wants bookings to stick. This phase moves all the data from in-memory arrays to SQLite, so bookings survive a restart.

## Scope
In scope:
- A SQLite database for agents, ailments, therapies, their links, and appointments.
- The existing seed data loaded on first start, only into empty tables.
- Bookings (phase 12) stored in the database.
- UTC timestamps for everything stored, plus a `createdAt` on appointments.
- Tests that run against an in-memory database, and a file-database test for persistence.

Out of scope:
- Migrations tooling, a seed CLI, or schema versioning beyond `CREATE TABLE IF NOT EXISTS`.
- Editing or deleting data, and any new pages or features.
- An ORM or query builder.
- Backups, multi-process access, or a database other than SQLite.
- Hiding the `node:sqlite` experimental warning.

## Decisions
- **`node:sqlite` (built into Node), not `better-sqlite3`.** No new dependency and no native build. It is marked experimental and prints an `ExperimentalWarning` on start; accepted for an MVP and noted here. It needs Node 22.13 or later without a flag, so `engines.node` becomes `>=22.13`. If the API changes in a later Node, only `src/db.ts` and the data modules are affected.
- **Bundled SQLite version is whatever Node ships** (3.50.x on Node 24 here), not the newest SQLite release. Nothing in this phase needs a newer one.
- **The data layer's API does not change.** Phases 8 to 12 built `getX()` functions so this swap stays inside `src/data/` and `src/db.ts`. The only visible change is `Appointment.createdAt`.
- **Synchronous calls.** `node:sqlite` is synchronous, which keeps the existing synchronous routes and tests as they are.
- **Join tables replace id arrays** (`agent_ailments`, `therapy_ailments`), with foreign keys enforced and id lists ordered by id.
- **Constraints in the database as well as in code:** `CHECK` on `status`, on `duration_minutes`, and on the `starts_at` shape, plus foreign keys. Application validation (phase 12) still runs first and gives the friendly errors.
- **Timestamps are ISO 8601 UTC TEXT ending in `Z`, with no milliseconds**, per the persisted-data rule in `specs/tech-stack.md`. No deviation is needed. Display conversion to local time stays in the rendering layer.
- **Seeds are inserted only into empty tables**, per table, so a restart never duplicates or overwrites, and manual changes are kept.
- **Database location:** `data/agentclinic.db`, git-ignored, overridable with `DATABASE_PATH`. Tests use `:memory:`; the smoke script uses a temporary file.
- **One shared connection, opened lazily and never closed explicitly.** Fine for a single-process demo app; the process exit closes it.
- **Standalone types** stay as they are, per `specs/tech-stack.md`; row shapes from SQLite are mapped into them in one place per module.

## Context
- `specs/mission.md`: course students and conference demos, so the database should create itself with no setup.
- `specs/tech-stack.md`: SQLite planned for phase 13, and the UTC timestamp rule.
- Phases 8 to 12 set the pattern: `getX()` functions behind which the store can change; phase 12 added `addAppointment()`, the only write path.
