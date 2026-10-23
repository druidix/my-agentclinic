# Validation: Layout

The feature is complete and mergeable when every item passes.

## Build
- [ ] `npm install` succeeds from a clean checkout.
- [ ] `npm run build` completes with no TypeScript errors.
- [ ] After a build, `npm start` serves pages with views and styles (they resolve from `dist/`).
- [ ] `npm run dev` serves the same pages.

## curl checks
- [ ] `curl localhost:3000/` returns 200 with layout HTML (header, nav, footer) and "Hello AgentClinic".
- [ ] `curl -I localhost:3000/styles.css` returns 200 with `Content-Type: text/css`.
- [ ] `curl localhost:3000/health` still returns `{"status":"ok"}`.
- [ ] `/dashboard`, `/agents`, `/ailments`, `/therapies`, and `/appointments` each return 200.
- [ ] An unknown path returns 404 and the server stays up.

## Browser check
- [ ] The home page shows the header, nav, footer, and styling in a modern browser.
- [ ] Narrowing the window to phone width keeps the layout usable, with no horizontal scroll.
- [ ] Switching the OS between light and dark mode changes the theme.

## Navigation
- [ ] Every nav link loads a page (no 404s).
- [ ] The current page's nav link is highlighted.

## Merge readiness
- [ ] `specs/roadmap.md` marks phase 2 done.
- [ ] No `dist/` or `node_modules/` committed.
- [ ] Branch is up to date with `main`, and the PR description links to these specs.
