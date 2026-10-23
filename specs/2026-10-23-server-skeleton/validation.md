# Validation: Server skeleton

The feature is complete and mergeable when every item passes.

## Build
- [ ] `npm install` succeeds from a clean checkout.
- [ ] `npm run build` completes with no TypeScript errors.

## Run
- [ ] `npm run dev` starts the server and logs its URL.
- [ ] `npm start` (after build) starts the server from `dist/`.
- [ ] `PORT=4000 npm start` listens on 4000. With no `PORT`, it listens on 3000.

## Behavior
- [ ] `curl localhost:3000/` returns 200 with HTML containing "Hello AgentClinic".
- [ ] Opening `http://localhost:3000/` in a modern browser shows the page.
- [ ] `curl localhost:3000/health` returns 200 with `{"status":"ok"}`.
- [ ] An unknown path returns 404 and the server stays up.

## Merge readiness
- [ ] `specs/roadmap.md` marks phase 1 done.
- [ ] No `dist/` or `node_modules/` committed.
- [ ] Branch is up to date with `main`, and the PR description links to these specs.
