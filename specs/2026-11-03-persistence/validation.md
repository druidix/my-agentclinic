# Validation: Persistence

The feature is complete and mergeable when every item passes.

## Automated
- [x] `npm test` passes, including the existing tests against an in-memory database and the new persistence, constraint, and UTC tests.
- [x] `npm run typecheck`, `npm run build`, and `npm run smoke` pass.
- [ ] The `build-and-test` CI check passes on the PR, on Node 22.

## Behaviour
- [x] A fresh start creates `data/agentclinic.db` with the schema and the seed data; every page shows the same content as before.
- [x] Restarting the server does not duplicate or reset the data.
- [x] A booking made before a restart is still on `/appointments` and the dashboard afterwards.
- [x] Deleting the database file and restarting restores the seed data.
- [x] Every stored `starts_at` and `created_at` is ISO 8601 UTC ending in `Z`, and the database rejects malformed ones, bad statuses, and unknown agent or therapy ids.
- [x] Tests and the smoke script do not touch `data/agentclinic.db`, and `data/` is git-ignored.

## Browser
- [x] The agents, ailments, therapies, appointments, and dashboard pages look and behave as before (no visible change).
- [x] Booking still works, and the new appointment shows in your local time zone.

## Merge readiness
- [x] `specs/roadmap.md` shows Persistence as phase 13, marked done.
- [x] `specs/tech-stack.md` and `README.md` describe SQLite, `node:sqlite`, and `DATABASE_PATH`.
- [x] `CHANGELOG.md` is updated with `/changelog`, and every hash exists in `git log`.
- [x] No `dist/`, `node_modules/`, or `data/` committed.
- [x] Branch is up to date with `main`, and the PR description links to these specs.
