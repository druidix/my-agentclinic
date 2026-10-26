# Validation: Responsive design

The feature is complete and mergeable when every item passes.

## Automated
- [ ] `npm test` passes, including the new viewport, stylesheet-link, and responsive-rule tests.
- [ ] `npm run build` completes with no TypeScript errors.
- [ ] The `build-and-test` CI check passes on the PR.

## Browser, at about 375px, 768px, and 1280px
- [ ] No horizontal scrolling at any of the three widths.
- [ ] Text is readable without zooming at 375px.
- [ ] The header and nav are usable at 375px: all six links are reachable and the active link is clear.
- [ ] The layout looks right at 768px and 1280px.
- [ ] Light and dark themes still work at all three widths.

## Touch targets
- [ ] Nav links and the home page button are at least about 44px tall at 375px.

## Merge readiness
- [ ] `specs/roadmap.md` shows responsive design as phase 5, marked done, and no longer in the polish phase.
- [ ] No `dist/` or `node_modules/` committed.
- [ ] Branch is up to date with `main`, and the PR description links to these specs.
