# Roadmap

Very small phases, each leaving the app runnable.

1. **Server skeleton (done):** install Express, serve "Hello AgentClinic" from `src/index.ts`, add a `start` script.
2. **Layout (done):** shared EJS layout, stylesheet, and navigation.
3. **Test setup:** install Vitest, add an `npm test` script, and a first test that checks `/` and `/health`.
4. **CI:** a GitHub Actions workflow that runs `npm ci`, `npm run build`, and `npm test` on pull requests and pushes to `main`.
5. **Dashboard shell:** a staff dashboard page with placeholder panels.
6. **Agents:** list agents (in-memory seed data).
7. **Ailments:** list ailments and show which agents have them.
8. **Therapies:** list therapies and link them to ailments.
9. **Appointments, view:** list scheduled appointments on the dashboard.
10. **Appointments, booking:** a form for an agent to book a therapy.
11. **Persistence:** move the data to SQLite.
12. **Polish:** responsive design, accessibility, and marketing-quality visuals.
