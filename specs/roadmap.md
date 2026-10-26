# Roadmap

Very small phases, each leaving the app runnable.

1. **Server skeleton (done):** install Express, serve "Hello AgentClinic" from `src/index.ts`, add a `start` script.
2. **Layout (done):** shared EJS layout, stylesheet, and navigation.
3. **Test setup (done):** install Vitest and supertest, split `src/app.ts` from `src/index.ts`, add `npm test`, and add tests for `/`, `/health`, the placeholder routes, 404, and the active nav link.
4. **CI (done):** a GitHub Actions workflow that runs `npm ci`, `npm run build`, and `npm test` on pull requests and pushes to `main`.
5. **Responsive design:** make the layout, nav, and stylesheet work from phone to desktop widths, with an automated check for the viewport tag and touch-friendly sizes.
6. **Dashboard shell:** a staff dashboard page with placeholder panels.
7. **Agents:** list agents (in-memory seed data).
8. **Ailments:** list ailments and show which agents have them.
9. **Therapies:** list therapies and link them to ailments.
10. **Appointments, view:** list scheduled appointments on the dashboard.
11. **Appointments, booking:** a form for an agent to book a therapy.
12. **Persistence:** move the data to SQLite.
13. **Polish:** accessibility and marketing-quality visuals.
