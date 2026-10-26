# Requirements: CI

## Scope
In scope:
- A GitHub Actions workflow that runs install, build, and tests.
- Triggers on pull requests and on pushes to `main`.
- Cancel superseded runs for the same ref.
- Read-only workflow token permissions.
- A CI status badge in `README.md`.

Out of scope:
- Deployment or release automation.
- A Node version matrix, coverage reports, and linting.
- Caching beyond the npm cache provided by `actions/setup-node`.

## Decisions
- **Single job on `ubuntu-latest`, Node 22 (LTS).** Simplest and cheapest. The repo is public, so Actions minutes are free, and a run takes about a minute.
- **Same commands as local development:** `npm ci`, `npm run build`, `npm test`. No CI-only scripts.
- **Least privilege:** `permissions: contents: read`, since the workflow only needs to read the code.
- **Concurrency group** `ci-${{ github.ref }}` with `cancel-in-progress: true`.
- **Pin actions to major versions** (`actions/checkout@v4`, `actions/setup-node@v4`).
- **Branch protection** (require CI to pass before merging to `main`) is a repository setting, not code. The owner enables it in GitHub after the workflow has run once, so the check name is available to select.

## Context
- `specs/mission.md`: reliable, with a stack that course students and demo audiences can follow. A short, readable workflow fits.
- `specs/tech-stack.md`: Node and TypeScript, `tsc` for builds, Vitest for tests.
- Phase 3 added `npm test`, so CI can run the same checks used locally.
