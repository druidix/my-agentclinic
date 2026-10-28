# Validation: Appointments, view

The feature is complete and mergeable when every item passes.

## Automated
- [ ] `npm test` passes, including the new data, time, route, link, nav, and dashboard tests.
- [ ] `npm run typecheck`, `npm run build`, and `npm run smoke` pass.
- [ ] The `build-and-test` CI check passes on the PR.

## Behaviour
- [ ] Every seed `startsAt` is ISO 8601 UTC ending in `Z`, and every `agentId` and `therapyId` matches a real record.
- [ ] `/appointments` lists every appointment sorted by start time, with agent, therapy, and status.
- [ ] Agent names link to `/agents#agent-<id>` and therapy names to `/therapies#therapy-<id>`.
- [ ] The dashboard Appointments panel shows the scheduled count and links to `/appointments`, and the scheduled list shows only scheduled appointments.
- [ ] No dashboard panel says "coming soon", and the Appointments nav link is active on `/appointments`.
- [ ] Each `<time>` element carries the UTC value in `datetime`; no UTC text is shown to the viewer.

## Browser, at about 375px, 768px, and 1280px
- [ ] The appointments page and dashboard are readable, with no horizontal page scrolling.
- [ ] Nav links and cross-links are easy to tap at 375px.
- [ ] Times display in your local time zone, with no UTC shown.

## Themes
- [ ] The appointments page and dashboard look right in both light and dark themes.

## Merge readiness
- [ ] `specs/roadmap.md` shows Appointments, view as phase 11, marked done.
- [ ] `CHANGELOG.md` is updated with `/changelog`, and every hash exists in `git log`.
- [ ] No `dist/` or `node_modules/` committed.
- [ ] Branch is up to date with `main`, and the PR description links to these specs.
