# Validation: Dashboard shell

The feature is complete and mergeable when every item passes.

## Automated
- [x] `npm test` passes, including the new dashboard route, panel, active-link, and stylesheet tests.
- [x] `npm run build` completes with no TypeScript errors.
- [x] The `build-and-test` CI check passes on the PR.

## Browser, at about 375px, 768px, and 1280px
- [x] `/dashboard` shows four panels: Agents, Ailments, Therapies, Appointments, each with a "coming soon" note.
- [x] No horizontal scrolling at any of the three widths.
- [x] Panels reflow sensibly: single column at 375px, multiple columns at wider widths.
- [x] The Dashboard nav link is highlighted as active.

## Themes
- [ ] Panels are readable and look right in both light and dark themes.

## Merge readiness
- [ ] `specs/roadmap.md` shows the dashboard shell as phase 6, marked done.
- [ ] No `dist/` or `node_modules/` committed.
- [ ] Branch is up to date with `main`, and the PR description links to these specs.
