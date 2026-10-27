# Requirements: Docs and hardening

## Scope
In scope:
- Superseded notes and factual fixes in older specs.
- A README getting-started section.
- A corrected `CHANGELOG.md` and a `/changelog` skill that handles squash merges.
- Skip link and a non-colour active nav state, with a contrast check.
- `helmet` security headers.
- CI hardening: Dependabot, `timeout-minutes`, `npm audit`, and Actions pinned to SHAs.

Out of scope:
- The data layer (phase 8) and later roadmap phases.
- A full accessibility audit (final polish phase).
- Rewriting the history of older specs beyond notes and factual fixes.

## Decisions
- **Specs keep their history.** Older specs get a short "Superseded by" note, and only wrong facts that still mislead are corrected.
- **Changelog is regenerated from `git log`**, one bullet per commit that exists. Squashed commits' old hashes are removed.
- **The `/changelog` skill lists only commits in the current history**, so dead hashes cannot reappear. The skill file lives in `~/.claude/skills/changelog/`, outside the repo, so it is not part of the PR diff.
- **`helmet` with defaults.** The CSP is self-only, which fits the app: no inline styles or scripts, with Pico served locally. If a default breaks a page, loosen only that directive.
- **Actions pinned to SHAs, kept current by Dependabot**, which also covers npm dependencies.
- **Active link uses an underline in addition to colour**, with no new JavaScript.

## Context
- Source: the three-perspective review of `main` after phase 7 (correctness, structure, specs and docs).
- `specs/mission.md` and `specs/tech-stack.md`: Express, EJS, Pico CSS, Vitest.
- The first review PR (#10) already did the code refactor, the 404 page, `engines`, and the smoke test.
