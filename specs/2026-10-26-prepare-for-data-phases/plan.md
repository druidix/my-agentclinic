# Plan: Prepare for the data phases (refactor before roadmap phase 8)

A deep review of `main` found structure and hygiene issues worth fixing before phases 8 to 11 add real pages. This is a refactor: behavior stays the same except the 404 page and nav matching.

## 1. Shared sections and types
1. Add `src/sections.ts` with a standalone `Section` type (`href`, `label`, `phase`, `note`) and one `sections` array for Dashboard, Agents, Ailments, Therapies, and Appointments.
2. Add `NavItem` and a render-props type for the dashboard (`title` and `panels`), as standalone types, per `specs/tech-stack.md`.
3. Derive the nav (`Home` plus `sections`), the dashboard panels, and the placeholder routes from `sections`. Remove the positional `nav.slice(2)`.

## 2. Router split
1. `src/app.ts` keeps only configuration and middleware: views, static files, Pico, locals, and router mounting.
2. `src/routes/pages.ts`: `/`, `/dashboard`, and `/health`.
3. `src/routes/placeholders.ts`: one placeholder route per remaining section.
4. Each later phase replaces a placeholder with its own router.

## 3. 404 page and error handler
1. Add `views/404.ejs`, rendered with status 404 inside the layout by a final `app.use`.
2. Add a four-argument error handler that renders `views/error.ejs` with status 500 and no stack trace.
3. Give the layout a default `title` so a missing title can never throw.

## 4. Nav path matching
1. Normalize `currentPath`: lowercase, strip trailing slashes.
2. A nav link is active for its own path and for nested paths (`/agents/3` activates Agents), but `/` only for the home page.

## 5. Cleanups
1. CSS: use Pico's `.grid` for the dashboard panels, scope tap-target rules to the header nav and the home button, drop redundant `flex-wrap` and `text-align`, and use `100dvh`.
2. Tests: remove the tests that match CSS text, run the viewport and stylesheet-link checks once on the layout, derive per-section tests from `sections`, and type-check `tests/` in CI.
3. Config: add `engines` (Node 22), align `@types/node` to 22, and call `app.disable('x-powered-by')`.

## 6. New tests
1. Unknown paths render the 404 page inside the layout with status 404.
2. `/dashboard/`, `/Dashboard`, and a nested path activate the right nav link.
3. A smoke test runs the compiled `dist/` app, then requests `/health` and the Pico stylesheet. It runs in CI after the build.

## 7. Verify
1. `npm test` and `npm run build` pass.
2. Browser check of all six nav pages, the dashboard, and a 404 page at about 375px and 1280px, in light and dark.
3. Confirm the CI check passes on the PR.

## 8. Wrap up
1. Merge the PR once CI is green and the user asks for the merge.
2. A second PR handles the specs, README, changelog, and accessibility cleanups.
