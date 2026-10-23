# Validation: Layout

The feature is complete and mergeable when every item passes.

## Build
- [x] `npm install` succeeds from a clean checkout.
- [x] `npm run build` completes with no TypeScript errors.
- [x] After a build, `npm start` serves pages with views and styles (they resolve from `dist/`).
- [x] `npm run dev` serves the same pages.

## curl checks
- [x] `curl localhost:3000/` returns 200 with layout HTML (header, nav, footer) and "Hello AgentClinic".
- [x] `curl -I localhost:3000/styles.css` returns 200 with `Content-Type: text/css`.
- [x] `curl localhost:3000/health` still returns `{"status":"ok"}`.
- [x] `/dashboard`, `/agents`, `/ailments`, `/therapies`, and `/appointments` each return 200.
- [x] An unknown path returns 404 and the server stays up.

## Browser check
- [x] The home page shows the header, nav, footer, and styling in a modern browser.
- [ ] ~~Narrowing the window to phone width keeps the layout usable, with no horizontal scroll.~~ Deferred to phase 10 (polish).
- [ ] Switching the OS between light and dark mode changes the theme.

## Navigation
- [x] Every nav link loads a page (no 404s).
- [x] The current page's nav link is highlighted.

## Merge readiness
- [x] `specs/roadmap.md` marks phase 2 done.
- [x] No `dist/` or `node_modules/` committed.
- [x] Branch is up to date with `main`, and the PR description links to these specs.
