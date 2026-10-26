# Validation: Test setup

The feature is complete and mergeable when every item passes.

## Tests
- [x] `npm install` then `npm test` passes from a clean checkout.
- [x] The tests cover: `/`, `/health`, the five placeholder routes, the 404, and the active nav link.
- [x] The tests do not open a network port or depend on the server running.

## Tests detect failures
- [x] Temporarily break a route (for example, change the `/health` response). `npm test` fails and names the failing test.
- [x] Temporarily remove the `active` class logic. The nav test fails.
- [x] Revert both changes and confirm `npm test` passes again.

## App still runs
- [x] `npm run build` completes with no TypeScript errors, and `dist/` contains no test files.
- [x] `npm run dev` serves the home page.
- [x] `npm start` (after build) serves the home page and `/health`.
- [x] `PORT=4000 npm start` listens on 4000.
- [x] The pages look the same as before in a browser.

## Merge readiness
- [x] `specs/roadmap.md` marks phase 3 done.
- [x] No `dist/` or `node_modules/` committed.
- [x] Branch is up to date with `main`, and the PR description links to these specs.
