# Requirements: Appointments, view

Susan (product) wants appointment booking; Mary wants a dashboard. This phase adds appointment data and shows scheduled appointments on the dashboard. It is also the first phase with timestamps, so the UTC storage rule applies.

## Scope
In scope:
- Appointment data: agent, therapy, start time, and status.
- An `/appointments` page listing every appointment, sorted by start time.
- The dashboard Appointments panel (live count) and a list of scheduled appointments, as the roadmap asks.
- Dates and times shown in the viewer's local (system) time zone; storage stays UTC.
- Responsive from phone to desktop, in light and dark themes.
- Automated tests for the data, the join, the time handling, the routes, the links, the nav link, and the dashboard.

Out of scope:
- Booking (phase 12), including any form or "book" button.
- Appointment detail pages, editing, cancelling, or deleting.
- Appointment duration or end time (therapies already carry `durationMinutes`).
- SQLite (phase 13); search, filtering, or paging.

## Decisions
- **`startsAt` is an ISO 8601 UTC string ending in `Z`** (for example `2026-10-30T17:00:00Z`), per `specs/tech-stack.md`. No deviation is needed, so there is nothing else to record.
- **Display in the viewer's system time zone, with no UTC shown.** Views render `<time datetime="<UTC>">`, and a small script, `public/js/local-time.js`, rewrites the text with the browser's own zone. This is the only way to use each viewer's zone, since the server cannot know it.
- **Server-side fallback in the server's system zone.** Without JavaScript, `formatLocal()` renders the same text in the server's zone. On the developer's machine that is local time; on a server running UTC it reads as UTC. That is acceptable for an MVP and noted here.
- **The script is a file, not inline,** so the helmet CSP stays unchanged.
- **Fixed seed timestamps**, so tests and demos are deterministic. The list shows all statuses sorted by time, with the status in a column, so past appointments never disappear.
- **"Scheduled" on the dashboard means status `scheduled`,** not "later than now", so output does not depend on the current time.
- **Statuses:** `scheduled`, `completed`, `cancelled`, as a standalone union type.
- **A join function, not a join in the template.** `getAppointmentsWithDetails()` keeps ids out of views and keeps the SQLite swap inside the data layer.
- **Standalone types** for `Appointment`, the joined record, and the view props, per `specs/tech-stack.md`.

## Context
- `specs/mission.md`: course students and conference demos, so seed data should be fun and demo-ready.
- `specs/tech-stack.md`: Express, EJS, Pico CSS, Vitest, and the UTC timestamp rule.
- Phases 8 to 10 set the pattern: typed data module, `getX()` functions, a join function, a router per resource, row anchors, and a live dashboard panel.
