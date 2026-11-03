# Requirements: Appointments, booking

Susan (product) wants appointment booking; Mary wants it reliable. This phase adds the first write path: a form for an agent to book a therapy.

## Scope
In scope:
- A booking form at `/appointments/new`: agent, therapy, and date and time.
- `POST /appointments` with server-side validation, inline error messages, and a redirect with a confirmation on success.
- New bookings appear on `/appointments` and in the dashboard's scheduled list, in the viewer's local time.
- Entered times are converted from local time to UTC before they are sent and stored.
- A basic same-origin check on `POST`.
- Responsive from phone to desktop, in light and dark themes.

Out of scope:
- Cancelling, rescheduling, or editing appointments.
- Overlap or double-booking checks, using therapy duration, and business hours.
- Authentication, accounts, or full CSRF tokens.
- HTMX (the form is a plain POST; HTMX can come in phase 14 if wanted).
- SQLite (phase 13); bookings are in memory and reset on restart.

## Decisions
- **Plain POST with redirect to a confirmation (PRG).** `POST /appointments` answers `303` to `/appointments?booked=<id>`, so reloading does not resubmit. The page shows a `role="status"` message only for a real id.
- **Validation errors return `422`** and re-render the form with the submitted values kept, so nothing is lost.
- **`startsAt` is ISO 8601 UTC ending in `Z`**, per `specs/tech-stack.md`, with no milliseconds, so it matches the seed data. No deviation is needed.
- **Local to UTC in the browser.** The server cannot know the user's zone, so `public/js/booking.js` converts the `datetime-local` value into a hidden `startsAt`. The visible input is unnamed so only UTC is sent. Booking therefore needs JavaScript, and a `<noscript>` note says so. This is acceptable for an MVP and is recorded here.
- **The server does the real checks:** known `agentId` and `therapyId`, strict `startsAt` format, and a future time. The input's `min` is only a hint.
- **`validateBooking(body, now)` takes the clock as a parameter**, so tests can be exact and do not depend on the real date.
- **Same-origin guard, not a CSRF library.** There are no logins or cookies, so a cross-site post can only add a harmless appointment. `Origin` (or `Referer`) must match the host, else `403`. Browsers always send `Origin` on a form POST, so a missing header is treated as hostile. Helmet's `form-action 'self'` also applies.
- **In-memory storage behind `addAppointment()`**, so phase 13 swaps the data layer without touching routes. New bookings get status `scheduled` and the next integer id.
- **Output is escaped** by EJS; error re-rendering never echoes raw HTML.
- **Standalone types** for `NewAppointment`, `BookingErrors`, `BookingResult`, and the view props, per `specs/tech-stack.md`.

## Context
- `specs/mission.md`: course students and conference demos, so the form should be quick to demo.
- `specs/tech-stack.md`: Express, EJS, Pico CSS, Vitest, and the UTC timestamp rule.
- Phase 11 (`specs/2026-10-28-appointments/`) added appointment data, `/appointments`, `formatLocal`, and `public/js/local-time.js`, which already shows stored UTC times in local time.
