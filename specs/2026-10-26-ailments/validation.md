# Validation: Ailments

The feature is complete and mergeable when every item passes.

## Automated
- [x] `npm test` passes, including the new data, join, route, link, nav, and dashboard tests.
- [x] `npm run typecheck`, `npm run build`, and `npm run smoke` pass.
- [ ] The `build-and-test` CI check passes on the PR.

## Behaviour
- [x] `/ailments` lists every seed ailment with its description and its agents.
- [ ] Every agent name links to `/agents#agent-<id>`, and the link lands on that agent's row.
- [x] Every seed `agentId` matches a real agent, and every ailment has at least one agent.
- [x] The Ailments nav link is active on `/ailments`, and `/ailments` is not a placeholder.
- [x] The dashboard Ailments panel shows the count and links to `/ailments`; Therapies and Appointments still say "coming soon".

## Browser, at about 375px, 768px, and 1280px
- [ ] The page is readable, with no horizontal scrolling.
- [ ] Nav links, the home button, and the agent links are easy to tap at 375px (nav links and buttons at least about 44px tall).

## Themes
- [ ] The ailments page and dashboard look right in both light and dark themes.

## Merge readiness
- [ ] `specs/roadmap.md` shows Ailments as phase 9, marked done.
- [ ] `CHANGELOG.md` is updated with `/changelog`, and every hash exists in `git log`.
- [ ] No `dist/` or `node_modules/` committed.
- [ ] Branch is up to date with `main`, and the PR description links to these specs.
