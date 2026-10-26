# Validation: Test setup

The feature is complete and mergeable when every item passes.

## Tests
- [ ] `npm install` then `npm test` passes from a clean checkout.
- [ ] The tests cover: `/`, `/health`, the five placeholder routes, the 404, and the active nav link.
- [ ] The tests do not open a network port or depend on the server running.

## Tests detect failures
- [ ] Temporarily break a route (for example, change the `/health` response). `npm test` fails and names the failing test.
- [ ] Temporarily remove the `active` class logic. The nav test fails.
- [ ] Revert both changes and confirm `npm test` passes again.

## App still runs
- [ ] `npm run build` completes with no TypeScript errors, and `dist/` contains no test files.
- [ ] `npm run dev` serves the home page.
- [ ] `npm start` (after build) serves the home page and `/health`.
- [ ] `PORT=4000 npm start` listens on 4000.
- [ ] The pages look the same as before in a browser.

## Merge readiness
- [ ] `specs/roadmap.md` marks phase 3 done.
- [ ] No `dist/` or `node_modules/` committed.
- [ ] Branch is up to date with `main`, and the PR description links to these specs.
