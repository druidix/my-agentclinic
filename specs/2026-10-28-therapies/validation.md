# Validation: Therapies

The feature is complete and mergeable when every item passes.

## Automated
- [x] `npm test` passes, including the new data, join, route, link, nav, and dashboard tests.
- [x] `npm run typecheck`, `npm run build`, and `npm run smoke` pass.
- [ ] The `build-and-test` CI check passes on the PR.

## Behaviour
- [x] `/therapies` lists every seed therapy with its description, duration, and ailments.
- [x] Every ailment on `/therapies` links to `/ailments#ailment-<id>`, and the link lands on that ailment.
- [x] Every ailment on `/ailments` lists its therapies, each linking to `/therapies#therapy-<id>`.
- [x] Every seed `ailmentId` matches a real ailment, and every ailment has at least one therapy.
- [x] The Therapies nav link is active on `/therapies`, and `/therapies` is not a placeholder.
- [x] The dashboard Therapies panel shows the count and links to `/therapies`; Appointments still says "coming soon".

## Browser, at about 375px, 768px, and 1280px
- [x] Both pages are readable, with no horizontal scrolling.
- [x] Nav links and the cross-links are easy to tap at 375px.

## Themes
- [x] The therapies page, ailments page, and dashboard look right in both light and dark themes.

## Merge readiness
- [x] `specs/roadmap.md` shows Therapies as phase 10, marked done.
- [x] `CHANGELOG.md` is updated with `/changelog`, and every hash exists in `git log`.
- [x] No `dist/` or `node_modules/` committed.
- [x] Branch is up to date with `main`, and the PR description links to these specs.
