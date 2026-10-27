# Plan: Docs and hardening (second PR from the deep review)

The first review PR refactored the code. This one covers the spec, doc, accessibility, and security findings.

## 1. Specs
1. Add a "Superseded" note at the top of older specs that describe the old plain-CSS setup (layout, responsive, dashboard shell), pointing to `specs/2026-10-26-pico-css/`.
2. Fix the live inaccuracies: stale phase numbers (`dashboard-shell/requirements.md`, `layout/requirements.md`, `server-skeleton/requirements.md`), `<section>` versus `<article>` and "Pico `.grid`" in the plans, `vitest.config.mts`, the `active` class check in `test-setup/validation.md`, and "pinned" versus `^` in the Pico requirements.
3. Leave the history otherwise intact.

## 2. README
1. Add a "Getting started" section: Node 22, `npm install`, `npm run dev`, `npm run build && npm start`, `npm test`, `npm run typecheck`, `npm run smoke`, the `PORT` variable, and a short project layout.
2. Link to `specs/` and `CHANGELOG.md`.

## 3. Changelog
1. Update the `/changelog` skill: list only commits that exist in the current history, ignore dead hashes, and keep one bullet per commit.
2. Regenerate `CHANGELOG.md` from `git log` so every hash exists and every merged PR is listed.

## 4. Accessibility
1. Add a skip-to-content link as the first element in `<body>`, and `id="main"` on `<main>`.
2. Underline the active nav link so it isn't shown by colour alone.
3. Check the contrast of muted text and the active link in light and dark.

## 5. Security and CI
1. Add `helmet` with a default CSP, and confirm Pico's stylesheet and our CSS still load under it.
2. Add `.github/dependabot.yml` for npm and GitHub Actions.
3. Add `timeout-minutes` and an `npm audit` step to CI.
4. Pin `actions/checkout` and `actions/setup-node` to commit SHAs, with the version in a comment.

## 6. Tests
1. The skip link and `id="main"` are on every page.
2. Security headers are set (CSP, `X-Content-Type-Options`), and the CSS still serves.

## 7. Verify
1. `npm test`, `npm run typecheck`, `npm run build`, and `npm run smoke` pass.
2. Every hash in `CHANGELOG.md` exists in git history, and every merged PR is listed.
3. Browser check: keyboard skip link, active underline, and contrast in light and dark.
4. Confirm the CI check passes on the PR.

## 8. Wrap up
1. Run `/changelog` last, so this PR's own commits are included.
2. Merge the PR once CI is green and the user asks for the merge.
