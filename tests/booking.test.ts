import request from 'supertest'
import { describe, expect, it } from 'vitest'
import app from '../src/app'
import { validateBooking } from '../src/booking'
import { addAppointment, getAppointments } from '../src/data/appointments'
import { getAgents } from '../src/data/agents'
import { getTherapies } from '../src/data/therapies'

const now = new Date('2026-11-03T12:00:00Z')
const valid = { agentId: '1', therapyId: '2', startsAt: '2026-11-05T17:00:00Z' }
const host = 'clinic.test'
const post = (body: Record<string, string>) =>
  request(app).post('/appointments').type('form').set('Host', host).set('Origin', `http://${host}`).send(body)

describe('validateBooking', () => {
  it('accepts a valid future booking', () => {
    expect(validateBooking(valid, now)).toEqual({ ok: true, value: { agentId: 1, therapyId: 2, startsAt: valid.startsAt } })
  })

  it.each([
    ['unknown agent', { ...valid, agentId: '99' }, 'agentId'],
    ['non-numeric agent', { ...valid, agentId: '1abc' }, 'agentId'],
    ['array agent', { ...valid, agentId: ['1', '2'] }, 'agentId'],
    ['unknown therapy', { ...valid, therapyId: '99' }, 'therapyId'],
    ['missing time', { ...valid, startsAt: '' }, 'startsAt'],
    ['offset instead of Z', { ...valid, startsAt: '2026-11-05T10:00:00-07:00' }, 'startsAt'],
    ['local time with no zone', { ...valid, startsAt: '2026-11-05T10:00' }, 'startsAt'],
    ['impossible date', { ...valid, startsAt: '2026-02-31T10:00:00Z' }, 'startsAt'],
    ['past time', { ...valid, startsAt: '2026-11-01T10:00:00Z' }, 'startsAt'],
    ['exactly now', { ...valid, startsAt: '2026-11-03T12:00:00Z' }, 'startsAt'],
  ])('rejects %s', (_name, body, field) => {
    const result = validateBooking(body, now)
    expect(result.ok).toBe(false)
    if (!result.ok) expect(Object.keys(result.errors)).toContain(field)
  })
})

describe('addAppointment', () => {
  it('stores a scheduled appointment with the next unique id and its UTC time', () => {
    const before = getAppointments().length
    const a = addAppointment({ agentId: 1, therapyId: 1, startsAt: '2099-01-01T10:00:00Z' })
    const b = addAppointment({ agentId: 2, therapyId: 2, startsAt: '2099-01-02T10:00:00Z' })

    expect(getAppointments()).toHaveLength(before + 2)
    expect(b.id).toBe(a.id + 1)
    expect(a.status).toBe('scheduled')
    expect(a.startsAt).toMatch(/Z$/)
  })
})

describe('GET /appointments/new', () => {
  it('shows the form with every agent and therapy, the hidden UTC field, and the script', async () => {
    const res = await request(app).get('/appointments/new')

    expect(res.status).toBe(200)
    for (const { id, name } of getAgents()) expect(res.text).toContain(`<option value="${id}" >${name}</option>`)
    for (const { id, name } of getTherapies()) expect(res.text).toContain(`<option value="${id}" >${name} (`)
    expect(res.text).toContain('type="hidden" name="startsAt"')
    expect(res.text).toContain('<script src="/js/booking.js" defer></script>')
    expect(res.text).toContain('href="/appointments" aria-current="page"')
    expect((await request(app).get('/js/booking.js')).status).toBe(200)
  })
})

describe('POST /appointments', () => {
  it('books, redirects with a confirmation, and lists the booking in UTC', async () => {
    const res = await post({ agentId: '3', therapyId: '4', startsAt: '2099-03-04T05:06:00Z' })

    expect(res.status).toBe(303)
    const id = res.headers.location.match(/^\/appointments\?booked=(\d+)$/)?.[1]
    expect(id).toBeDefined()
    expect(getAppointments().find((a) => String(a.id) === id)?.startsAt).toBe('2099-03-04T05:06:00Z')

    const page = await request(app).get(res.headers.location)
    expect(page.text).toContain('role="status"')
    expect(page.text).toContain('<time datetime="2099-03-04T05:06:00Z">')
    expect((await request(app).get('/dashboard')).text).toContain('<time datetime="2099-03-04T05:06:00Z">')
  })

  it('answers 422 with errors and the entered values, and stores nothing', async () => {
    const before = getAppointments().length
    const res = await post({ agentId: '', therapyId: '2', startsAt: '2000-01-01T00:00:00Z' })

    expect(res.status).toBe(422)
    expect(res.text).toContain('Choose an agent.')
    expect(res.text).toContain('Choose a time in the future.')
    expect(res.text).toContain('value="2000-01-01T00:00:00Z"')
    expect(getAppointments()).toHaveLength(before)
  })

  it('escapes submitted text', async () => {
    const res = await post({ agentId: '1', therapyId: '1', startsAt: '"><script>alert(1)</script>' })

    expect(res.status).toBe(422)
    expect(res.text).not.toContain('<script>alert(1)')
  })

  it('rejects cross-origin posts and posts with no Origin or Referer', async () => {
    const before = getAppointments().length
    const cross = await request(app).post('/appointments').type('form').set('Origin', 'http://evil.test').send(valid)
    const none = await request(app).post('/appointments').type('form').send(valid)
    const referer = await request(app).post('/appointments').type('form').set('Host', host).set('Referer', `http://${host}/appointments/new`).send({ ...valid, startsAt: '2099-05-05T05:05:00Z' })

    expect(cross.status).toBe(403)
    expect(none.status).toBe(403)
    expect(referer.status).toBe(303)
    expect(getAppointments()).toHaveLength(before + 1)
  })
})

describe('referrer policy', () => {
  it('lets browsers send a real Origin on form posts, and rejects the literal "null" origin', async () => {
    const page = await request(app).get('/appointments/new')
    const nullOrigin = await request(app).post('/appointments').type('form').set('Origin', 'null').send(valid)

    expect(page.headers['referrer-policy']).toBe('same-origin')
    expect(nullOrigin.status).toBe(403)
  })
})

describe('GET /appointments?booked', () => {
  it.each(['999', 'abc', ''])('shows no confirmation for %j', async (booked) => {
    const res = await request(app).get('/appointments').query({ booked })

    expect(res.text).not.toContain('role="status"')
  })
})
