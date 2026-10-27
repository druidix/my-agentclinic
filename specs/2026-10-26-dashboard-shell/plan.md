# Plan: Dashboard shell (roadmap phase 6)

> **Superseded in part:** the CSS in this spec was replaced by Pico CSS in `specs/2026-10-26-pico-css/`. The stylesheet files and class names named here no longer exist.

## 1. Route and view
1. In `src/app.ts`, stop rendering `/dashboard` through the generic placeholder loop and give it its own route that renders `dashboard`.
2. Add `views/dashboard.ejs`: a page heading and a grid of four panels (Agents, Ailments, Therapies, Appointments).
3. Each panel is a `<article>` with a heading and a short "coming soon" note naming the phase that fills it. No fake data.
4. Drive the panels from a small array in the route so later phases can swap in real content.

## 2. Styles
1. Add panel and grid styles to `components.css`, using the tokens in `tokens.css`.
2. One column on small screens, two columns from tablet width up, and four across on wide screens if they fit.
3. Panels work in light and dark themes with no new JavaScript.

## 3. Automated tests
Add to `tests/` using `supertest`:
1. `/dashboard` returns 200 and renders the dashboard heading.
2. All four panels are present, each with its heading and "coming soon" note.
3. The Dashboard nav link is marked active on `/dashboard`.
4. The served stylesheet contains the panel rules.

## 4. Verify
1. `npm test` and `npm run build` pass.
2. Check the browser at about 375px, 768px, and 1280px, in light and dark.
3. Confirm the CI check passes on the PR.

## 5. Wrap up
1. Mark phase 6 done in `specs/roadmap.md`.
2. Merge the PR once CI is green and the user asks for the merge.
