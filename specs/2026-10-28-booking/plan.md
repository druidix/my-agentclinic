# Plan: Appointments, booking (roadmap phase 12)

## 1. Data
1. Add `addAppointment(input)` to `src/data/appointments.ts`. It takes a standalone `NewAppointment` type (`agentId`, `therapyId`, `startsAt`), assigns the next id and status `scheduled`, stores it, and returns the new `Appointment`. Routes call only the data functions, so phase 13 can swap in SQLite.
2. Add `getAppointment(id)` for the confirmation message.

## 2. Validation
1. Add `src/booking.ts` with `validateBooking(body, now)`, returning either a clean `NewAppointment` or a list of field errors, as standalone types (`BookingErrors`, `BookingResult`).
2. Rules: `agentId` and `therapyId` are integers matching real records; `startsAt` is ISO 8601 UTC ending in `Z` (strict pattern, round-trips through `Date`, normalized without milliseconds); and `startsAt` is later than `now`.
3. `now` is a parameter, so tests control the clock.

## 3. Form and routes
1. Add `src/routes/booking.ts` with `GET /appointments/new` (the form) and `POST /appointments`.
2. Add `express.urlencoded({ extended: false })` in `src/app.ts`, and mount the router before `appointments`.
3. `POST /appointments`: reject cross-origin requests with 403 (see section 5); validate; on errors re-render the form with status 422, the field errors, and the submitted values kept; on success, call `addAppointment` and respond `303` to `/appointments?booked=<id>`.
4. `GET /appointments` shows a confirmation (`role="status"`) when `?booked=<id>` names a real appointment, and a "Book an appointment" button linking to `/appointments/new`. The dashboard's scheduled section gets the same button.
5. Add `views/book.ejs`: a Pico form with agent and therapy `<select>`s, a `datetime-local` input, and a submit button. Errors show per field with `aria-invalid` and `aria-describedby`, and a summary. Define the view props as standalone types.

## 4. Local time to UTC
1. The `datetime-local` value has no time zone, so `public/js/booking.js` (loaded only on the form page) converts it with `new Date(value).toISOString()` into a hidden `startsAt` field (no milliseconds) on change and on submit. The visible input has no `name`, so only UTC is sent.
2. The form shows a `<noscript>` note that JavaScript is needed to choose a time, and the server rejects a missing `startsAt` with a clear message.
3. The input's `min` is set to the current local time by the script, as a hint; the server check is the real one.

## 5. Same-origin check
1. Add `src/sameOrigin.ts`, middleware for `POST` requests: the `Origin` header must match the request host; if it is absent, the `Referer` must; if both are absent or do not match, respond 403.
2. No login or cookies exist, so this is a basic guard against cross-site form posts, not full CSRF protection. Helmet's default `form-action 'self'` CSP also applies.

## 6. Tests
Add to `tests/` using `supertest`:
1. `validateBooking`: accepts a valid future booking, trims nothing unexpected, and reports errors for unknown or non-numeric ids, a missing, malformed, offset-bearing, or non-UTC `startsAt`, and a past time.
2. `addAppointment`: assigns a unique id, status `scheduled`, and a `startsAt` ending in `Z`.
3. `GET /appointments/new`: 200, lists every agent and therapy as options, has the hidden `startsAt` field, and loads `/js/booking.js`; the nav link for Appointments is active.
4. `POST /appointments` with a valid body and a same-origin `Origin`: 303 to `/appointments?booked=<id>`, and the new appointment appears on `/appointments` and in the dashboard's scheduled list.
5. Invalid bodies: 422, field errors shown, submitted values kept, nothing stored, and user input is HTML-escaped.
6. Cross-origin, and missing `Origin` and `Referer`: 403, nothing stored.
7. `?booked=<id>` shows the confirmation; an unknown or non-numeric `booked` shows none.
8. `/js/booking.js` is served.
Tests do not rely on fixed appointment counts, since bookings persist in memory for the test run.

## 7. Verify
1. `npm test`, `npm run typecheck`, `npm run build`, and `npm run smoke` pass.
2. Check the browser at about 375px, 768px, and 1280px, in light and dark: book an appointment, see the confirmation and the new row in your local time, and see the error states.
3. Confirm the CI check passes on the PR.

## 8. Wrap up
1. Mark phase 12 done in `specs/roadmap.md`.
2. Update `CHANGELOG.md` with `/changelog` (includes the phase 11 merge).
3. Merge the PR once CI is green and the user asks for the merge.
