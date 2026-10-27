# Validation: Agents

The feature is complete and mergeable when every item passes.

## Automated
- [x] `npm test` passes, including the new data, route, nav, and dashboard tests.
- [x] `npm run typecheck`, `npm run build`, and `npm run smoke` pass.
- [ ] The `build-and-test` CI check passes on the PR.

## Behaviour
- [x] `/agents` lists all six seed agents with name, model, role, and complaint.
- [x] The table has a caption and header cells.
- [x] The Agents nav link is active on `/agents`, and `/agents` is not a placeholder.
- [x] The dashboard Agents panel shows the count and links to `/agents`; the other panels still say "coming soon".

## Browser, at about 375px, 768px, and 1280px
- [ ] The list is readable, with no horizontal scrolling of the page (the table may scroll inside its wrapper).
- [ ] Nav links and the home button are still at least about 44px tall at 375px.

## Themes
- [ ] The agents page and dashboard look right in both light and dark themes.

## Merge readiness
- [ ] `specs/roadmap.md` shows Agents as phase 8, marked done.
- [ ] `CHANGELOG.md` is updated with `/changelog`, and every hash exists in `git log`.
- [ ] No `dist/` or `node_modules/` committed.
- [ ] Branch is up to date with `main`, and the PR description links to these specs.
