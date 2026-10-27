# Plan: Responsive design (roadmap phase 5)

> **Superseded in part:** the CSS in this spec was replaced by Pico CSS in `specs/2026-10-26-pico-css/`. The stylesheet files and class names named here no longer exist.

## 1. Stylesheet changes
Keep the styles modular: each concern's responsive rules live in its own CSS file.
1. `base.css`: tighten page padding on small screens and add more room on wide screens.
2. `header.css`: on narrow screens, stack the brand above the nav, let the nav fill the width, and size nav links as touch targets (at least 44px tall).
3. `components.css`: make `.button` at least 44px tall on small screens and keep headings fluid.
4. `footer.css`: allow text to wrap and add padding suited to small screens.
5. No JavaScript: the nav keeps wrapping rather than collapsing into a menu.

## 2. Automated tests
Add to `tests/` using `supertest`:
1. Every page includes the viewport meta tag.
2. Every page links all five stylesheets.
3. The served stylesheets contain the responsive rules: `@media` blocks and the 44px minimum tap size for nav links and buttons.

## 3. Verify
1. `npm test` and `npm run build` pass.
2. Check the browser at about 375px, 768px, and 1280px.
3. Confirm the CI check passes on the PR.

## 4. Wrap up
1. Mark phase 5 done in `specs/roadmap.md`.
2. Merge the PR once CI is green.
