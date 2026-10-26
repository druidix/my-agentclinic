# Plan: Pico CSS (roadmap phase 7)

## 1. Install and serve Pico
1. `npm install @picocss/pico` as a runtime dependency.
2. In `src/app.ts`, serve Pico's CSS from `node_modules/@picocss/pico/css` under `/vendor/pico` with `express.static`.
3. In `views/layout.ejs`, link `/vendor/pico/pico.min.css` before our own stylesheet.

## 2. Migrate the markup
1. Layout: `<body>` with `<header>`, `<main class="container">`, and `<footer>`, using Pico's semantic styling.
2. Header and nav: Pico's `<nav>` with `<ul>` lists; the active link keeps `aria-current="page"`, which Pico styles.
3. Home page: the hero and button use Pico's heading and `role="button"` styles.
4. Dashboard: each panel becomes an `<article>`, laid out with Pico's `.grid`.
5. Placeholder pages keep their markup.

## 3. Trim the custom CSS
1. Delete `tokens.css`; use Pico's variables for colors, and keep light and dark themes automatic.
2. Replace `base.css`, `header.css`, `footer.css`, and `components.css` with one small `public/css/app.css`.
3. `app.css` holds only what Pico lacks: sticky footer layout, wrapping nav on small screens, 44px tap targets, and the panel grid columns.
4. Keep all the responsive behavior from phases 5 and 6.

## 4. Update the tests
1. Every page links Pico and `app.css`, plus the viewport tag.
2. The Pico stylesheet is served from `/vendor/pico`.
3. `app.css` has the small-screen media query and the 44px tap size.
4. Existing route, panel, and active-nav tests keep passing.

## 5. Verify
1. `npm test` and `npm run build` pass.
2. Check the browser at about 375px, 768px, and 1280px, in light and dark.
3. Check the nav active link and keyboard focus outline.
4. Confirm the CI check passes on the PR.

## 6. Wrap up
1. Mark phase 7 done in `specs/roadmap.md`.
2. Update `CHANGELOG.md` with `/changelog`.
3. Merge the PR once CI is green and the user asks for the merge.
