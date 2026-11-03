# Validation: Polish

The feature is complete and mergeable when every item passes.

## Automated
- [x] `npm test` passes, including the axe test over every page and the error state, with zero violations.
- [x] `npm run typecheck`, `npm run build`, and `npm run smoke` pass.
- [ ] The `build-and-test` CI check passes on the PR.

## Behaviour
- [x] The home page has the hero, its two buttons, and four cards that link to the right pages.
- [x] The logo shows next to the wordmark, and the favicon loads with no `favicon.ico` 404 in your browser.
- [x] Appointment statuses show as badges with the status word as text.
- [x] Dates include the weekday and read the same on the server and in the browser.
- [x] Booking works with HTMX: errors appear in place, success goes to the confirmation, and the local-time-to-UTC conversion still works after an error.
- [x] Booking still works with JavaScript off (plain post and redirect).
- [x] Cross-origin posts are still rejected, including HTMX ones.
- [x] The recorded contrast ratios meet WCAG AA in both themes.

## Browser, at about 375px, 768px, and 1280px
- [x] Every page looks right, with no horizontal page scrolling.
- [x] Everything works with the keyboard only, focus is always visible, and the order makes sense.
- [x] A screen-reader pass of the booking form and the appointments table makes sense.
- [x] Pages stay usable at 200% zoom.
- [x] With "reduce motion" on in your system settings, nothing animates; print preview of `/appointments` is clean.

## Themes
- [x] Every page, the badges, and the cards look right in both light and dark themes.

## Merge readiness
- [x] `specs/roadmap.md` shows Polish as phase 14, marked done, and `README.md` says the MVP is complete.
- [x] `CHANGELOG.md` is updated with `/changelog`, and every hash exists in `git log`.
- [x] No `dist/`, `node_modules/`, or `data/` committed.
- [x] Branch is up to date with `main`, and the PR description links to these specs.
