# Validation: Appointments, booking

The feature is complete and mergeable when every item passes.

## Automated
- [ ] `npm test` passes, including the new validation, data, route, escaping, and same-origin tests.
- [ ] `npm run typecheck`, `npm run build`, and `npm run smoke` pass.
- [ ] The `build-and-test` CI check passes on the PR.

## Behaviour
- [ ] `/appointments/new` shows the form with every agent and therapy as options.
- [ ] A valid booking answers `303` to `/appointments?booked=<id>`, shows the confirmation, and appears on `/appointments` and in the dashboard's scheduled list.
- [ ] The stored `startsAt` is ISO 8601 UTC ending in `Z`, without milliseconds.
- [ ] Unknown ids, a bad or missing `startsAt`, and a past time are rejected with `422`, inline errors, and the entered values kept; nothing is stored.
- [ ] Submitted text is HTML-escaped wherever it is shown.
- [ ] Cross-origin posts, and posts with no `Origin` or `Referer`, get `403` and store nothing.
- [ ] An unknown or non-numeric `booked` value shows no confirmation.

## Browser, at about 375px, 768px, and 1280px
- [ ] The form and the confirmation are readable, with no horizontal scrolling, and fields and the button are easy to tap at 375px.
- [ ] Booking a time shows it back in your local time zone, with no UTC shown.
- [ ] Error states are clear and keyboard-accessible (labels, focus, and messages).

## Themes
- [ ] The form, errors, and confirmation look right in both light and dark themes.

## Merge readiness
- [ ] `specs/roadmap.md` shows Appointments, booking as phase 12, marked done.
- [ ] `CHANGELOG.md` is updated with `/changelog`, and every hash exists in `git log`.
- [ ] No `dist/` or `node_modules/` committed.
- [ ] Branch is up to date with `main`, and the PR description links to these specs.
