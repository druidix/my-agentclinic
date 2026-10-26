# Roadmap

Very small phases, each leaving the app runnable.

1. **Server skeleton (done):** install Express, serve "Hello AgentClinic" from `src/index.ts`, add a `start` script.
2. **Layout (done):** shared EJS layout, stylesheet, and navigation.
3. **Test setup:** install Vitest, add an `npm test` script, and a first test that checks `/` and `/health`.
4. **Dashboard shell:** a staff dashboard page with placeholder panels.
5. **Agents:** list agents (in-memory seed data).
6. **Ailments:** list ailments and show which agents have them.
7. **Therapies:** list therapies and link them to ailments.
8. **Appointments, view:** list scheduled appointments on the dashboard.
9. **Appointments, booking:** a form for an agent to book a therapy.
10. **Persistence:** move the data to SQLite.
11. **Polish:** responsive design, accessibility, and marketing-quality visuals.
