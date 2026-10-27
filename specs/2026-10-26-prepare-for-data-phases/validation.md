# Validation: Prepare for the data phases

The refactor is complete and mergeable when every item passes.

## Automated
- [x] `npm test` passes, including the new 404, path-matching, and nested-nav tests.
- [x] Per-section tests are derived from `src/sections.ts`.
- [x] `tests/` is type-checked, and `npm run build` completes with no TypeScript errors.
- [x] The smoke test starts the compiled `dist/` app and gets 200 from `/health` and the Pico stylesheet, and it runs in CI.
- [ ] The `build-and-test` CI check passes on the PR.

## Structure
- [x] `src/app.ts` contains configuration and middleware only.
- [x] The nav, dashboard panels, and placeholder routes all come from `sections`, with no `nav.slice`.
- [x] No inline prop definitions: `Section`, `NavItem`, and the render props are standalone types.

## Browser, at about 375px and 1280px, in light and dark
- [ ] All six nav pages render and the correct link is active.
- [ ] The dashboard panels reflow with Pico's `.grid`, with no horizontal scroll.
- [ ] An unknown path shows the 404 page inside the layout.
- [ ] Nav links and the home button are still at least about 44px tall at 375px.

## Merge readiness
- [x] `package.json` has `engines` for Node 22, and `@types/node` is on 22.
- [x] No `dist/` or `node_modules/` committed.
- [ ] Branch is up to date with `main`, and the PR description links to these specs.
