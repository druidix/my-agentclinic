# Plan: Layout (roadmap phase 2)

> **Superseded in part:** the CSS in this spec was replaced by Pico CSS in `specs/2026-10-26-pico-css/`. The stylesheet files and class names named here no longer exist.

## 1. Dependencies
1. Install `ejs` and `express-ejs-layouts` as dependencies.
2. Install `@types/ejs` and `@types/express-ejs-layouts` if they are available and needed.

## 2. Views and static assets
1. Create `views/layout.ejs`: HTML shell with header, nav, `<%- body %>`, and footer.
2. Create `views/index.ejs` for the home page, replacing the inline HTML.
3. Create `views/placeholder.ejs`: "Coming soon" page used by the unbuilt sections.
4. Create `public/styles.css`: responsive, modern styling with light and dark themes.

## 3. Server wiring
1. In `src/index.ts`, set EJS as the view engine and enable `express-ejs-layouts`.
2. Resolve `views/` and `public/` from `__dirname` so they work under `tsx` and from `dist/`.
3. Serve `public/` statically.
4. Add routes `/dashboard`, `/agents`, `/ailments`, `/therapies`, `/appointments`, each rendering the placeholder page with its title.
5. Pass the current path to the layout so the active nav link is highlighted.
6. Keep `/health` unchanged.

## 4. Verify
1. Run the checks in `validation.md`.
2. Fix anything that fails.

## 5. Wrap up
1. Mark phase 2 done in `specs/roadmap.md`.
2. Commit and open a PR to `main`.
