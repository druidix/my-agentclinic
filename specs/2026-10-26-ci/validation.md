# Validation: CI

The feature is complete and mergeable when every item passes.

## Local
- [ ] `npm ci`, `npm run build`, and `npm test` pass locally, using the same commands as the workflow.
- [ ] `.github/workflows/ci.yml` is valid YAML and uses only the planned triggers, permissions, and steps.

## On GitHub
- [ ] The workflow runs on this PR and the `build-and-test` check passes.
- [ ] Push a deliberately failing test: the check goes red and the PR shows it failing.
- [ ] Revert the failing test: the check goes green again.
- [ ] Pushing twice in quick succession cancels the earlier run.
- [ ] The README badge renders and shows the workflow status.

## Branch protection (owner action in GitHub)
- [ ] After the first run, in Settings → Branches, add a rule for `main` that requires the `build-and-test` status check to pass before merging.

## Merge readiness
- [ ] `specs/roadmap.md` marks phase 4 done.
- [ ] No `dist/` or `node_modules/` committed.
- [ ] Branch is up to date with `main`, and the PR description links to these specs.
