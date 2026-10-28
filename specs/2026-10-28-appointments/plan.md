# Plan: Appointments, view (roadmap phase 11)

## 1. Data
1. Add `src/data/appointments.ts` with standalone types `AppointmentStatus` (`'scheduled' | 'completed' | 'cancelled'`) and `Appointment` (`id`, `agentId`, `therapyId`, `startsAt`, `status`), and about eight seed appointments with fixed `startsAt` values.
2. `startsAt` is an ISO 8601 UTC string ending in `Z`, per `specs/tech-stack.md`.
3. Export `getAppointments()`, and `getAppointmentsWithDetails()`, which joins each appointment to its `Agent` and `Therapy` records and sorts by `startsAt`. Routes call only these, so phase 13 can swap in SQLite.

## 2. Local time display
1. Add `src/format.ts` with `formatLocal(iso)`, which formats a UTC string for display in the server's system time zone (the no-JavaScript fallback).
2. Add `public/js/local-time.js`, loaded with `defer` from the layout: it rewrites every `time[datetime]` element's text in the viewer's system time zone. It lives in a file, not inline, so the helmet CSP stays unchanged.
3. Views render `<time datetime="<UTC ISO>"><%= local text %></time>`. No UTC text is shown to the viewer.

## 3. Appointments page
1. Add `src/routes/appointments.ts`: `GET /appointments` renders `appointments` with the joined, sorted list. Define the view props as standalone types.
2. Mount it in `src/app.ts`, and mark Appointments as no longer a placeholder in `src/sections.ts`.
3. Add `views/appointments.ejs`: a captioned Pico table (in `overflow-auto`) with When, Agent, Therapy, and Status columns. Agent names link to `/agents#agent-<id>` and therapy names to `/therapies#therapy-<id>`.

## 4. Dashboard
1. Change the Appointments panel to a live note with the scheduled count and a link to `/appointments`.
2. Add a "Scheduled appointments" section below the panels listing every appointment with status `scheduled` (time, agent, therapy), with a link to the full list.
3. All four panels are now live; remove any leftover placeholder-only logic only if nothing else uses it.

## 5. Tests
Add to `tests/` using `supertest`:
1. Every seed appointment has a unique id, a real `agentId` and `therapyId`, a valid status, and a `startsAt` that is ISO 8601 UTC ending in `Z` and round-trips through `Date`.
2. `getAppointmentsWithDetails()` returns the agent and therapy records, sorted by `startsAt`.
3. `formatLocal()` returns a non-empty string without `Z` or `T` and handles a known timestamp.
4. `/appointments` returns 200, has a row per appointment with a `<time datetime>` in UTC, links to agents and therapies, and shows the status.
5. The layout loads `/js/local-time.js`, and the file is served.
6. The Appointments nav link is active on `/appointments`, and the page is not a placeholder.
7. The dashboard Appointments panel shows the scheduled count and links to `/appointments`, and the scheduled list shows only scheduled appointments. No panel says "coming soon" any more.

## 6. Verify
1. `npm test`, `npm run typecheck`, `npm run build`, and `npm run smoke` pass.
2. Check the browser at about 375px, 768px, and 1280px, in light and dark, and confirm times show in your local time zone.
3. Confirm the CI check passes on the PR.

## 7. Wrap up
1. Mark phase 11 done in `specs/roadmap.md`.
2. Update `CHANGELOG.md` with `/changelog` (includes the phase 10 merge).
3. Merge the PR once CI is green and the user asks for the merge.
