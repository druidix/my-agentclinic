import request from 'supertest'
import { describe, expect, it } from 'vitest'
import app from '../src/app'
import { getAppointments } from '../src/data/appointments'
import { formatLocal } from '../src/format'

const host = 'clinic.test'
const valid = { agentId: '1', therapyId: '2', startsAt: '2099-06-07T08:09:00Z' }
const hx = (body: Record<string, string>, origin = `http://${host}`) =>
  request(app).post('/appointments').type('form').set('Host', host).set('Origin', origin).set('HX-Request', 'true').send(body)

describe('home page', () => {
  it('has the hero buttons and four cards linking to each section', async () => {
    const res = await request(app).get('/')

    expect(res.text).toContain('<a role="button" href="/appointments/new">Book an appointment</a>')
    expect(res.text).toContain('href="/dashboard"')
    expect(res.text.match(/<article>/g)).toHaveLength(4)
    for (const href of ['/agents', '/ailments', '/therapies', '/appointments']) expect(res.text).toContain(`<a href="${href}">`)
  })
})

describe('logo and favicon', () => {
  it('links the favicon from the layout, serves it, and shows a decorative logo', async () => {
    const page = await request(app).get('/')
    const icon = await request(app).get('/favicon.svg')

    expect(page.text).toContain('<link rel="icon" href="/favicon.svg" type="image/svg+xml">')
    expect(page.text).toMatch(/<svg class="logo"[^>]*aria-hidden="true"/)
    expect(icon.status).toBe(200)
    expect(icon.type).toBe('image/svg+xml')
  })
})

describe('appointment dates and badges', () => {
  it('includes the weekday in formatted dates', () => {
    expect(formatLocal('2026-11-05T17:00:00Z')).toMatch(/^(Wed|Thu|Fri), /)
  })

  it('shows each status as a badge with the status word', async () => {
    const res = await request(app).get('/appointments')

    for (const status of new Set(getAppointments().map((appointment) => appointment.status))) {
      expect(res.text).toContain(`<span class="badge badge-${status}">${status}</span>`)
    }
  })
})

describe('htmx booking', () => {
  it('serves htmx and its config, and the booking page loads them', async () => {
    const page = await request(app).get('/appointments/new')

    expect((await request(app).get('/vendor/htmx/htmx.min.js')).status).toBe(200)
    expect((await request(app).get('/js/htmx-config.js')).status).toBe(200)
    expect(page.text).toContain('hx-post="/appointments"')
    expect(page.text).toContain('<script src="/vendor/htmx/htmx.min.js" defer></script>')
  })

  it('returns just the form with 422 and the errors', async () => {
    const res = await hx({ ...valid, agentId: '' })

    expect(res.status).toBe(422)
    expect(res.text).not.toContain('<html')
    expect(res.text).toContain('<div id="booking">')
    expect(res.text).toContain('Choose an agent.')
  })

  it('answers 204 with HX-Redirect to the confirmation, and stores the booking', async () => {
    const before = getAppointments().length
    const res = await hx(valid)

    expect(res.status).toBe(204)
    expect(res.headers['hx-redirect']).toMatch(/^\/appointments\?booked=\d+$/)
    expect(getAppointments()).toHaveLength(before + 1)
  })

  it('still redirects with 303 without HX-Request, and rejects cross-origin htmx posts', async () => {
    const plain = await request(app).post('/appointments').type('form').set('Host', host).set('Origin', `http://${host}`).send(valid)
    const before = getAppointments().length
    const cross = await hx(valid, 'http://evil.test')

    expect(plain.status).toBe(303)
    expect(cross.status).toBe(403)
    expect(getAppointments()).toHaveLength(before)
  })
})
