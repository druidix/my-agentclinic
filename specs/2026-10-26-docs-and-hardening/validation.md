# Validation: Docs and hardening

The PR is complete and mergeable when every item passes.

## Automated
- [ ] `npm test` passes, including the new skip-link and security-header tests.
- [ ] `npm run typecheck`, `npm run build`, and `npm run smoke` pass.
- [ ] The `build-and-test` CI check passes on the PR, including the `npm audit` step.

## Docs
- [ ] Older specs carry a "Superseded" note, and the stale phase numbers and facts are corrected.
- [ ] The README has a getting-started section whose commands work.
- [ ] Every hash in `CHANGELOG.md` exists in `git log`, and every merged PR is listed.
- [ ] The `/changelog` skill ignores dead hashes.

## Security and CI
- [ ] Responses include a CSP and `X-Content-Type-Options`, and Pico and `app.css` still load.
- [ ] `.github/dependabot.yml` covers npm and GitHub Actions.
- [ ] CI has `timeout-minutes`, and both actions are pinned to commit SHAs.

## Browser, in light and dark
- [ ] Tab reaches the skip link first, and it moves focus to the main content.
- [ ] The active nav link has an underline and is distinct without relying on colour.
- [ ] Muted text and the active link have adequate contrast.
- [ ] The pages look unchanged under the CSP, with no console errors.

## Merge readiness
- [ ] No `dist/` or `node_modules/` committed.
- [ ] Branch is up to date with `main`, and the PR description links to these specs.
