# Validation: Server skeleton

The feature is complete and mergeable when every item passes.

## Build
- [x] `npm install` succeeds from a clean checkout.
- [x] `npm run build` completes with no TypeScript errors.

## Run
- [x] `npm run dev` starts the server and logs its URL.
- [x] `npm start` (after build) starts the server from `dist/`.
- [x] `PORT=4000 npm start` listens on 4000. With no `PORT`, it listens on 3000.

## Behavior
- [x] `curl localhost:3000/` returns 200 with HTML containing "Hello AgentClinic".
- [x] Opening `http://localhost:3000/` in a modern browser shows the page.
- [x] `curl localhost:3000/health` returns 200 with `{"status":"ok"}`.
- [x] An unknown path returns 404 and the server stays up.

## Merge readiness
- [x] `specs/roadmap.md` marks phase 1 done.
- [x] No `dist/` or `node_modules/` committed.
- [ ] Branch is up to date with `main`, and the PR description links to these specs.
