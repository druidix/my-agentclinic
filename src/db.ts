import fs from 'fs'
import path from 'path'
import { DatabaseSync } from 'node:sqlite'
import { seedAgents, seedAilments, seedAppointments, seedTherapies } from './data/seed'

// Timestamps are ISO 8601 UTC TEXT ending in Z (see specs/tech-stack.md); the CHECKs enforce the shape.
const schema = `
CREATE TABLE IF NOT EXISTS agents (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  model TEXT NOT NULL,
  role TEXT NOT NULL,
  complaint TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS ailments (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS agent_ailments (
  agent_id INTEGER NOT NULL REFERENCES agents(id),
  ailment_id INTEGER NOT NULL REFERENCES ailments(id),
  PRIMARY KEY (agent_id, ailment_id)
);
CREATE TABLE IF NOT EXISTS therapies (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0)
);
CREATE TABLE IF NOT EXISTS therapy_ailments (
  therapy_id INTEGER NOT NULL REFERENCES therapies(id),
  ailment_id INTEGER NOT NULL REFERENCES ailments(id),
  PRIMARY KEY (therapy_id, ailment_id)
);
CREATE TABLE IF NOT EXISTS appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  agent_id INTEGER NOT NULL REFERENCES agents(id),
  therapy_id INTEGER NOT NULL REFERENCES therapies(id),
  starts_at TEXT NOT NULL CHECK (starts_at GLOB '????-??-??T??:??:??Z'),
  status TEXT NOT NULL CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  created_at TEXT NOT NULL CHECK (created_at GLOB '????-??-??T??:??:??Z')
);
`

function isEmpty(db: DatabaseSync, table: string): boolean {
  return (db.prepare(`SELECT COUNT(*) AS n FROM ${table}`).get() as { n: number }).n === 0
}

// Insert the seed rows into each table that is still empty, so restarts never duplicate or overwrite.
function seed(db: DatabaseSync): void {
  db.exec('BEGIN')
  if (isEmpty(db, 'agents')) {
    const insert = db.prepare('INSERT INTO agents (id, name, model, role, complaint) VALUES (?, ?, ?, ?, ?)')
    for (const a of seedAgents) insert.run(a.id, a.name, a.model, a.role, a.complaint)
  }
  if (isEmpty(db, 'ailments')) {
    const insert = db.prepare('INSERT INTO ailments (id, name, description) VALUES (?, ?, ?)')
    for (const a of seedAilments) insert.run(a.id, a.name, a.description)
  }
  if (isEmpty(db, 'agent_ailments')) {
    const insert = db.prepare('INSERT INTO agent_ailments (agent_id, ailment_id) VALUES (?, ?)')
    for (const a of seedAilments) for (const agentId of a.agentIds) insert.run(agentId, a.id)
  }
  if (isEmpty(db, 'therapies')) {
    const insert = db.prepare('INSERT INTO therapies (id, name, description, duration_minutes) VALUES (?, ?, ?, ?)')
    for (const t of seedTherapies) insert.run(t.id, t.name, t.description, t.durationMinutes)
  }
  if (isEmpty(db, 'therapy_ailments')) {
    const insert = db.prepare('INSERT INTO therapy_ailments (therapy_id, ailment_id) VALUES (?, ?)')
    for (const t of seedTherapies) for (const ailmentId of t.ailmentIds) insert.run(t.id, ailmentId)
  }
  if (isEmpty(db, 'appointments')) {
    const insert = db.prepare('INSERT INTO appointments (id, agent_id, therapy_id, starts_at, status, created_at) VALUES (?, ?, ?, ?, ?, ?)')
    for (const a of seedAppointments) insert.run(a.id, a.agentId, a.therapyId, a.startsAt, a.status, a.createdAt)
  }
  db.exec('COMMIT')
}

export function openDb(file: string): DatabaseSync {
  if (file !== ':memory:') fs.mkdirSync(path.dirname(file), { recursive: true })
  const db = new DatabaseSync(file)
  db.exec('PRAGMA foreign_keys = ON')
  if (file !== ':memory:') db.exec('PRAGMA journal_mode = WAL')
  db.exec(schema)
  seed(db)
  return db
}

let db: DatabaseSync | undefined

// One shared connection, opened on first use; it closes when the process exits.
export function getDb(): DatabaseSync {
  db ??= openDb(process.env.DATABASE_PATH ?? path.join(__dirname, '..', 'data', 'agentclinic.db'))
  return db
}
