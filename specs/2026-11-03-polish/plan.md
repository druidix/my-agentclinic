# Plan: Polish (roadmap phase 14)

## 1. Accessibility checks
1. Add `axe-core` and `jsdom` as dev dependencies, and add `tests/a11y.test.ts`. For each page (`/`, `/dashboard`, `/agents`, `/ailments`, `/therapies`, `/appointments`, `/appointments/new`, the booking form with errors, and the 404 page), fetch the HTML with `supertest`, load it into jsdom, and run axe at WCAG 2.2 AA with zero violations allowed.
2. jsdom cannot compute colors, so axe's `color-contrast` rule is switched off in that test. Contrast is checked by calculating the ratios for the palette in section 3 (text, links, buttons, badges, in light and dark) and recording them in `requirements.md`.
3. Fix whatever axe reports (landmarks, labels, heading order, link names, table markup, focus order).
4. Check by hand: keyboard-only use of every page including booking, visible focus everywhere, a screen-reader pass of the booking form and the appointments table, and 200% zoom.

## 2. Look and feel
1. Home page (`views/index.ejs`): a hero with the tagline and two buttons (dashboard, book an appointment), and a short "how it works" row of cards (agents, ailments, therapies, appointments) linking to each page.
2. Logo and favicon: an inline SVG mark in `views/partials/header.ejs` next to the "AgentClinic" wordmark (decorative, `aria-hidden`), and `public/favicon.svg` linked from the layout with `<link rel="icon">`, which also removes the `favicon.ico` 404 in browsers that honor the link.
3. Accent color: override Pico's primary color variables in `public/css/app.css` for light and dark themes, with every pairing at WCAG AA or better.
4. Richer cards: a subtle accent edge, consistent spacing, and a small hover lift on the clickable cards (dashboard and home).
5. Pico stays the base; the custom CSS stays small and uses Pico's variables.

## 3. Appointment status badges and dates
1. Show status as a badge (`scheduled`, `completed`, `cancelled`) that carries the word as text as well as color, on `/appointments`.
2. Tidy dates: include the weekday (for example `Thu, Nov 5, 2026, 10:00 AM`) in `formatLocal()` and in `public/js/local-time.js`, so server and browser render the same text. Storage stays UTC.

## 4. Reduced motion and print
1. `@media (prefers-reduced-motion: reduce)`: switch off transitions, animations, and the card hover lift.
2. `@media print`: hide the header nav, footer, skip link, and buttons; use black on white; show full tables so the schedule prints cleanly.

## 5. HTMX for booking
1. Add `htmx.org` as a dependency, served from `node_modules` at `/vendor/htmx` (like Pico), loaded with `defer` only on the booking page. A small `public/js/htmx-config.js` switches `allowEval` off and lets `422` responses swap, so the CSP stays unchanged.
2. Move the form into `views/partials/book-form.ejs`. The form posts with `hx-post="/appointments"` and swaps itself (`hx-target`, `hx-swap="outerHTML"`); without JavaScript it is still a normal form post.
3. In `src/routes/booking.ts`, when the `HX-Request` header is present: a validation error returns the form partial alone with status `422` (htmx is configured to swap `422` responses), and success returns `204` with an `HX-Redirect` header to `/appointments?booked=<id>`. Requests without the header behave exactly as today (full page, `303`).
4. The same-origin check still guards every `POST`, htmx or not.
5. Rework `public/js/booking.js` to use event delegation and to re-initialize after htmx swaps, so the local-time-to-UTC conversion survives a re-rendered form.

## 6. Tests
1. The axe test from section 1, over every page and the error state.
2. `formatLocal` includes the weekday; status badges render the status as text with a class per status.
3. The home page has the hero buttons and the four cards with working links; the layout links the favicon and the file is served.
4. HTMX: `HX-Request` posts return a partial (no `<html`), `422` with errors, and `204` plus `HX-Redirect` on success; plain posts still redirect with `303`; cross-origin posts are still `403`; `/vendor/htmx/htmx.min.js` is served.
5. All 91 existing tests keep passing.

## 7. Verify
1. `npm test`, `npm run typecheck`, `npm run build`, and `npm run smoke` pass.
2. Browser, at about 375px, 768px, and 1280px, in light and dark, with keyboard only, and at 200% zoom; print preview of `/appointments`; booking with and without JavaScript.
3. Confirm the CI check passes on the PR.

## 8. Wrap up
1. Mark phase 14 done in `specs/roadmap.md`, and state in `README.md` that the MVP is complete.
2. Update `CHANGELOG.md` with `/changelog` (includes the phase 13 merge).
3. Merge the PR once CI is green and the user asks for the merge.
