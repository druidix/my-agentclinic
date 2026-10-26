# Validation: Pico CSS

The feature is complete and mergeable when every item passes.

## Automated
- [x] `npm test` passes, including the updated stylesheet-link, Pico-served, and responsive-rule tests.
- [x] `npm run build` completes with no TypeScript errors.
- [x] The `build-and-test` CI check passes on the PR.

## Browser, at about 375px, 768px, and 1280px
- [ ] Every page (home, dashboard, and the four placeholders) renders with Pico styling.
- [ ] No horizontal scrolling at any of the three widths.
- [ ] The nav is usable at 375px, and nav links and the home button are at least about 44px tall.
- [ ] Dashboard panels reflow: single column at 375px, multiple columns at wider widths.

## Themes
- [ ] All pages look right in both light and dark themes.

## Accessibility
- [ ] The active nav link has `aria-current="page"` and is visibly distinct.
- [ ] Keyboard focus shows a visible outline on nav links and the button.

## Merge readiness
- [ ] `specs/roadmap.md` shows Pico CSS as phase 7, marked done.
- [x] The old custom stylesheets are removed, and no unused CSS files remain.
- [ ] No `dist/` or `node_modules/` committed.
- [ ] Branch is up to date with `main`, and the PR description links to these specs.
