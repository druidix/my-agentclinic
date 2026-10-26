# Validation: CI

The feature is complete and mergeable when every item passes.

## Local
- [x] `npm ci`, `npm run build`, and `npm test` pass locally, using the same commands as the workflow.
- [x] `.github/workflows/ci.yml` is valid YAML and uses only the planned triggers, permissions, and steps.

## On GitHub
- [x] The workflow runs on this PR and the `build-and-test` check passes.
- [x] Push a deliberately failing test: the check goes red and the PR shows it failing.
- [x] Revert the failing test: the check goes green again.
- [x] Pushing twice in quick succession cancels the earlier run.
- [x] The README badge renders and shows the workflow status.

## Branch protection (owner action in GitHub)
- [ ] After the first run, in Settings → Branches, add a rule for `main` that requires the `build-and-test` status check to pass before merging.

## Merge readiness
- [x] `specs/roadmap.md` marks phase 4 done.
- [x] No `dist/` or `node_modules/` committed.
- [x] Branch is up to date with `main`, and the PR description links to these specs.
