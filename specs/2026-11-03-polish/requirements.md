# Requirements: Polish

Steve (marketing) wants an attractive site that works in modern browsers; Mary wants it reliable; Susan wants the features to be pleasant to use. This is the last roadmap phase, and it finishes the MVP.

## Scope
In scope:
- Accessibility to WCAG 2.2 AA, checked by an automated axe test plus a manual keyboard, screen-reader, and zoom pass.
- A hero home page, a logo and favicon, a distinct accent color, and richer cards.
- Status badges and clearer dates on appointments.
- Reduced-motion and print styles.
- HTMX for the booking form, with the plain form post as the fallback.
- Responsive from phone to desktop, in light and dark themes.

Out of scope:
- A full redesign, custom fonts, or illustrations.
- Open Graph and social meta tags.
- New features or data, or changes to routes, the data layer, or validation.
- HTMX anywhere other than the booking form.
- Authentication, cancelling or rescheduling bookings.

## Decisions
- **axe-core in Vitest, through jsdom,** as dev dependencies. It catches structural problems on every page on every run. It cannot compute contrast, so that rule is off in the test and contrast is checked by calculation and recorded below. It also cannot judge keyboard flow or screen-reader wording, so those stay manual.
- **Contrast targets:** normal text 4.5:1 or better and large text and UI components 3:1 or better, in both themes, for every accent color pairing. Calculated ratios (WCAG relative luminance; Pico's page backgrounds are `#fff` in light and `rgb(19, 22.5, 30.5)` in dark):

  | Pairing | Light | Dark |
  |---|---|---|
  | Link on page (`--pico-primary`) | 5.47 | 12.13 |
  | Link hover | 7.58 | 14.24 |
  | Button text on button | 5.47 | 5.47 |
  | Button text on hover | 7.58 | 7.58 |
  | Scheduled badge | 6.73 | 7.52 |
  | Completed badge | 8.33 | 8.33 |
  | Cancelled badge | 6.80 | 6.93 |

  Dark links on Pico's card background (`#181c25`) are 11.53 (hover 13.52). Every pairing is above 4.5:1.
- **Inline SVG logo and a `favicon.svg`,** with no image files or dependencies. The logo is decorative next to the wordmark, so it is `aria-hidden`. The `favicon.ico` 404 is removed only for browsers that follow the `<link rel="icon">`.
- **Pico stays the base.** The accent color overrides Pico's variables, and custom CSS only fills gaps, in keeping with `specs/tech-stack.md`.
- **Badges use text and color,** so status is never conveyed by color alone.
- **`formatLocal()` and `local-time.js` share one format** (with the weekday), so the server-rendered fallback and the browser rewrite read the same. Dates are still stored in UTC, per the persisted-data rule.
- **HTMX is progressive enhancement.** The form works as a plain post without it. It is served from `node_modules` like Pico, and `allowEval` is off, so the helmet CSP is unchanged. Server responses to `HX-Request` posts are a form partial with `422`, or `204` with `HX-Redirect`; the normal responses are unchanged.
- **The same-origin check still applies** to HTMX posts: htmx sends the `Origin` header, and the `same-origin` referrer policy from phase 12 keeps it valid.
- **The hover lift is only on clickable cards** (dashboard and home), not on ailment and therapy cards, which are not links.
- **HTMX config lives in `public/js/htmx-config.js`,** not an inline or `<meta>` tag, so the HTML stays valid and the CSP unchanged.
- **Reduced motion is a few lines of CSS** that turn off transitions and animations for people who ask their system for less motion.
- **One PR.** The task groups are ordered so the work can be split (accessibility and look first, HTMX second) if review gets large.
- **New dependencies:** `axe-core` and `jsdom` (dev only) and `htmx.org` (runtime). Dependabot covers all three; major bumps are reviewed rather than auto-merged.

## Context
- `specs/mission.md`: the "Attractive" principle (Steve), and conference-booth demos.
- `specs/tech-stack.md`: Pico CSS, HTMX for light interactivity, and the conventions for standalone prop types.
- Phase 12 (`specs/2026-10-28-booking/`) added the form, the same-origin check, and the `same-origin` referrer policy that HTMX relies on.
