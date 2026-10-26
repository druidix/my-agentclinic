# Plan: CI (roadmap phase 4)

## 1. Workflow
1. Create `.github/workflows/ci.yml`.
2. Triggers: `pull_request` and `push` to `main`.
3. Set `permissions: contents: read` at the workflow level.
4. Add a concurrency group per workflow and ref, so a new push cancels the in-progress run for the same branch.
5. One job, `build-and-test`, on `ubuntu-latest` with Node 22:
   1. `actions/checkout`
   2. `actions/setup-node` with `node-version: 22` and `cache: npm`
   3. `npm ci`
   4. `npm run build`
   5. `npm test`

## 2. README badge
1. Add a CI status badge for the workflow to `README.md`.

## 3. Verify
1. Run the same commands locally: `npm ci`, `npm run build`, `npm test`.
2. Open the PR and confirm the workflow runs and passes.
3. Push a deliberately failing test, confirm the check goes red, then revert it and confirm it goes green.

## 4. Wrap up
1. Mark phase 4 done in `specs/roadmap.md`.
2. Merge the PR.
3. Branch protection is a repository setting the owner turns on in GitHub (see `validation.md`).
