import fs from 'fs'
import os from 'os'
import path from 'path'
import { describe, expect, it } from 'vitest'
import { addAppointment, getAppointments } from '../src/data/appointments'
import { seedAgents, seedAilments, seedAppointments, seedTherapies } from '../src/data/seed'
import { openDb } from '../src/db'

const count = (db: ReturnType<typeof openDb>, table: string) =>
  (db.prepare(`SELECT COUNT(*) AS n FROM ${table}`).get() as { n: number }).n
const utcIso = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/
const newRow = [1, 1, '2099-01-01T10:00:00Z', 'scheduled', '2026-11-03T12:00:00Z']
const insertAppointment = 'INSERT INTO appointments (agent_id, therapy_id, starts_at, status, created_at) VALUES (?, ?, ?, ?, ?)'

describe('openDb', () => {
  it('seeds once, and a booking survives closing and reopening the file', () => {
    const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'agentclinic-')), 'nested', 'test.db')
    const first = openDb(file)
    expect(count(first, 'agents')).toBe(seedAgents.length)
    expect(count(first, 'ailments')).toBe(seedAilments.length)
    expect(count(first, 'therapies')).toBe(seedTherapies.length)
    expect(count(first, 'appointments')).toBe(seedAppointments.length)
    first.prepare(insertAppointment).run(...newRow)
    first.close()

    const second = openDb(file)
    expect(count(second, 'agents')).toBe(seedAgents.length)
    expect(count(second, 'appointments')).toBe(seedAppointments.length + 1)
    second.close()
  })

  it('keeps every foreign key valid, with the link tables matching the seed', () => {
    const db = openDb(':memory:')

    expect(db.prepare('PRAGMA foreign_key_check').all()).toEqual([])
    expect(count(db, 'agent_ailments')).toBe(seedAilments.reduce((n, a) => n + a.agentIds.length, 0))
    expect(count(db, 'therapy_ailments')).toBe(seedTherapies.reduce((n, t) => n + t.ailmentIds.length, 0))
  })

  it.each([
    ['a bad status', [1, 1, '2099-01-01T10:00:00Z', 'maybe', '2026-11-03T12:00:00Z']],
    ['a starts_at with an offset', [1, 1, '2099-01-01T10:00:00-07:00', 'scheduled', '2026-11-03T12:00:00Z']],
    ['a starts_at with no zone', [1, 1, '2099-01-01 10:00', 'scheduled', '2026-11-03T12:00:00Z']],
    ['a malformed created_at', [1, 1, '2099-01-01T10:00:00Z', 'scheduled', 'yesterday']],
    ['an unknown agent', [99, 1, '2099-01-01T10:00:00Z', 'scheduled', '2026-11-03T12:00:00Z']],
    ['an unknown therapy', [1, 99, '2099-01-01T10:00:00Z', 'scheduled', '2026-11-03T12:00:00Z']],
  ])('rejects %s', (_name, row) => {
    const db = openDb(':memory:')

    expect(() => db.prepare(insertAppointment).run(...(row as (string | number)[]))).toThrow()
    expect(count(db, 'appointments')).toBe(seedAppointments.length)
  })
})

describe('stored timestamps', () => {
  it('are ISO 8601 UTC ending in Z and round-trip through Date', () => {
    addAppointment({ agentId: 1, therapyId: 1, startsAt: '2099-01-01T10:00:00Z' })

    for (const { startsAt, createdAt } of getAppointments()) {
      for (const value of [startsAt, createdAt]) {
        expect(value).toMatch(utcIso)
        expect(new Date(value).toISOString().replace('.000Z', 'Z')).toBe(value)
      }
    }
  })

  it('stamps a new booking with the current UTC time', () => {
    const before = Date.now()
    const { createdAt, status } = addAppointment({ agentId: 2, therapyId: 2, startsAt: '2099-01-02T10:00:00Z' })

    expect(status).toBe('scheduled')
    expect(Math.abs(new Date(createdAt).getTime() - before)).toBeLessThan(5000)
  })
})
