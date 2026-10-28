import request from 'supertest'
import { describe, expect, it } from 'vitest'
import app from '../src/app'
import { getAgents } from '../src/data/agents'
import { getAilments, getAilmentsWithAgents } from '../src/data/ailments'
import { getAppointments, getAppointmentsWithDetails } from '../src/data/appointments'
import { formatLocal } from '../src/format'
import { getTherapies, getTherapiesForAilment, getTherapiesWithAilments } from '../src/data/therapies'
import { activeHref, nav, sections } from '../src/sections'

const pages = nav.map(({ href, label }) => ({ path: href, label }))

describe('GET /', () => {
  it('renders the home page inside the layout', async () => {
    const res = await request(app).get('/')

    expect(res.status).toBe(200)
    expect(res.type).toBe('text/html')
    expect(res.text).toContain('Hello AgentClinic')
    expect(res.text).toContain('<header class="container">')
    expect(res.text).toContain('<nav aria-label="Main">')
    expect(res.text).toContain('<footer class="container">')
  })
})

describe('GET /health', () => {
  it('returns ok as JSON', async () => {
    const res = await request(app).get('/health')

    expect(res.status).toBe(200)
    expect(res.body).toEqual({ status: 'ok' })
  })

  it('does not advertise Express', async () => {
    const res = await request(app).get('/health')

    expect(res.headers['x-powered-by']).toBeUndefined()
  })
})

describe('getAgents', () => {
  it('returns six agents with every field filled', () => {
    const agents = getAgents()

    expect(agents).toHaveLength(6)
    for (const agent of agents) {
      expect(Object.values(agent).every((value) => value !== '')).toBe(true)
    }
  })

  it('gives each agent a unique id', () => {
    const ids = getAgents().map(({ id }) => id)

    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('GET /agents', () => {
  it('lists every agent in a captioned table', async () => {
    const res = await request(app).get('/agents')

    expect(res.status).toBe(200)
    expect(res.text).toContain('<h1>Agents</h1>')
    expect(res.text).toContain('<caption>')
    expect(res.text.match(/<th scope="row">/g)).toHaveLength(getAgents().length)
    for (const { name, complaint } of getAgents()) {
      expect(res.text).toContain(name)
      expect(res.text).toContain(complaint.replace(/"/g, '&#34;'))
    }
  })

  it('is a real page, not a placeholder', async () => {
    const res = await request(app).get('/agents')

    expect(res.text).not.toContain('Coming soon')
  })
})

describe('getAilments', () => {
  it('returns ailments with every field filled and unique ids', () => {
    const ailments = getAilments()
    const ids = ailments.map(({ id }) => id)

    expect(ailments.length).toBeGreaterThan(0)
    expect(new Set(ids).size).toBe(ids.length)
    for (const { name, description } of ailments) {
      expect(name).not.toBe('')
      expect(description).not.toBe('')
    }
  })

  it('gives every ailment at least one agent, and every agentId matches a real agent', () => {
    const agentIds = new Set(getAgents().map(({ id }) => id))

    for (const { agentIds: ids } of getAilments()) {
      expect(ids.length).toBeGreaterThan(0)
      for (const id of ids) expect(agentIds.has(id)).toBe(true)
    }
  })

  it('joins each ailment to its agent records', () => {
    for (const { id, agents } of getAilmentsWithAgents()) {
      const source = getAilments().find((ailment) => ailment.id === id)

      expect(agents.map((agent) => agent.id)).toEqual(source?.agentIds)
      expect(agents.every((agent) => agent.name !== '')).toBe(true)
    }
  })
})

describe('GET /ailments', () => {
  it('lists every ailment with its agents linked to the agents page', async () => {
    const res = await request(app).get('/ailments')

    expect(res.status).toBe(200)
    expect(res.text).toContain('<h1>Ailments</h1>')
    expect(res.text.match(/<article id="ailment-\d+">/g)).toHaveLength(getAilments().length)
    for (const { name, agents } of getAilmentsWithAgents()) {
      expect(res.text).toContain(`<h2>${name.replace(/"/g, '&#34;')}</h2>`)
      for (const { id, name: agentName } of agents) {
        expect(res.text).toContain(`<a href="/agents#agent-${id}">${agentName}</a>`)
      }
    }
  })

  it('is a real page, not a placeholder', async () => {
    const res = await request(app).get('/ailments')

    expect(res.text).not.toContain('Coming soon')
  })

  it('gives each agent row on the agents page an anchor id', async () => {
    const res = await request(app).get('/agents')

    for (const { id } of getAgents()) {
      expect(res.text).toContain(`<tr id="agent-${id}">`)
    }
  })
})

describe('getTherapies', () => {
  it('returns therapies with every field filled and unique ids', () => {
    const therapies = getTherapies()
    expect(new Set(therapies.map(({ id }) => id)).size).toBe(therapies.length)
    expect(therapies.length).toBeGreaterThan(0)
    for (const { name, description, durationMinutes } of therapies) {
      expect(name).not.toBe('')
      expect(description).not.toBe('')
      expect(Number.isInteger(durationMinutes) && durationMinutes > 0).toBe(true)
    }
  })

  it('gives every therapy at least one real ailment, and every ailment a therapy', () => {
    const ailmentIds = getAilments().map(({ id }) => id)
    for (const { ailmentIds: ids } of getTherapies()) {
      expect(ids.length).toBeGreaterThan(0)
      for (const id of ids) expect(ailmentIds).toContain(id)
    }
    for (const id of ailmentIds) expect(getTherapiesForAilment(id).length).toBeGreaterThan(0)
  })

  it('joins each therapy to its ailment records', () => {
    for (const { id, ailments } of getTherapiesWithAilments()) {
      const source = getTherapies().find((therapy) => therapy.id === id)
      expect(ailments.map((ailment) => ailment.id)).toEqual(source?.ailmentIds)
    }
  })

  it('finds the therapies for an ailment', () => {
    for (const ailment of getAilments()) {
      for (const { ailmentIds } of getTherapiesForAilment(ailment.id)) expect(ailmentIds).toContain(ailment.id)
    }
  })
})

describe('GET /therapies', () => {
  it('lists every therapy with its ailments linked to the ailments page', async () => {
    const res = await request(app).get('/therapies')

    expect(res.status).toBe(200)
    expect(res.text).toContain('<h1>Therapies</h1>')
    expect(res.text.match(/<article id="therapy-\d+">/g)).toHaveLength(getTherapies().length)
    for (const { id, name, durationMinutes, ailments } of getTherapiesWithAilments()) {
      expect(res.text).toContain(`<article id="therapy-${id}">`)
      expect(res.text).toContain(`<h2>${name}</h2>`)
      expect(res.text).toContain(`${durationMinutes} minutes`)
      for (const ailment of ailments) {
        expect(res.text).toContain(`<a href="/ailments#ailment-${ailment.id}">${ailment.name.replace(/"/g, '&#34;')}</a>`)
      }
    }
  })

  it('is a real page, not a placeholder', async () => {
    const res = await request(app).get('/therapies')

    expect(res.text).not.toContain('Coming soon')
    expect(res.text).toContain('aria-current="page"')
  })

  it('links each ailment to its therapies', async () => {
    const res = await request(app).get('/ailments')

    for (const ailment of getAilments()) {
      expect(res.text).toContain(`<article id="ailment-${ailment.id}">`)
      for (const { id, name } of getTherapiesForAilment(ailment.id)) {
        expect(res.text).toContain(`<a href="/therapies#therapy-${id}">${name}</a>`)
      }
    }
  })
})

describe('getAppointments', () => {
  it('has unique ids, valid statuses, and real agent and therapy ids', () => {
    const appointments = getAppointments()
    const agentIds = getAgents().map(({ id }) => id)
    const therapyIds = getTherapies().map(({ id }) => id)

    expect(new Set(appointments.map(({ id }) => id)).size).toBe(appointments.length)
    expect(appointments.length).toBeGreaterThan(0)
    for (const { agentId, therapyId, status } of appointments) {
      expect(agentIds).toContain(agentId)
      expect(therapyIds).toContain(therapyId)
      expect(['scheduled', 'completed', 'cancelled']).toContain(status)
    }
  })

  it('stores startsAt as ISO 8601 UTC ending in Z that round-trips through Date', () => {
    for (const { startsAt } of getAppointments()) {
      expect(startsAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/)
      expect(new Date(startsAt).toISOString().replace('.000Z', 'Z')).toBe(startsAt)
    }
  })

  it('joins agent and therapy records and sorts by start time', () => {
    const details = getAppointmentsWithDetails()

    expect(details).toHaveLength(getAppointments().length)
    expect(details.map(({ startsAt }) => startsAt)).toEqual(details.map(({ startsAt }) => startsAt).sort())
    for (const { id, agent, therapy } of details) {
      const source = getAppointments().find((appointment) => appointment.id === id)
      expect(agent.id).toBe(source?.agentId)
      expect(therapy.id).toBe(source?.therapyId)
    }
  })
})

describe('formatLocal', () => {
  it('formats a UTC timestamp for display, without raw ISO characters', () => {
    const text = formatLocal('2026-10-30T20:00:00Z')

    expect(text).toContain('2026')
    expect(text).not.toMatch(/\dT\d|Z$/)
  })
})

describe('GET /appointments', () => {
  it('lists every appointment with UTC datetimes and links to agents and therapies', async () => {
    const res = await request(app).get('/appointments')

    expect(res.status).toBe(200)
    expect(res.text).toContain('<h1>Appointments</h1>')
    expect(res.text.match(/<tr id="appointment-\d+">/g)).toHaveLength(getAppointments().length)
    for (const { startsAt, status, agent, therapy } of getAppointmentsWithDetails()) {
      expect(res.text).toContain(`<time datetime="${startsAt}">${formatLocal(startsAt)}</time>`)
      expect(res.text).toContain(`<a href="/agents#agent-${agent.id}">${agent.name}</a>`)
      expect(res.text).toContain(`<a href="/therapies#therapy-${therapy.id}">${therapy.name}</a>`)
      expect(res.text).toContain(`<td>${status}</td>`)
    }
  })

  it('is a real page with an active nav link', async () => {
    const res = await request(app).get('/appointments')

    expect(res.text).not.toContain('Coming soon')
    expect(res.text).toContain('href="/appointments" aria-current="page"')
  })
})

describe('local time script', () => {
  it('is loaded by the layout and served', async () => {
    const page = await request(app).get('/appointments')
    const script = await request(app).get('/js/local-time.js')

    expect(page.text).toContain('<script src="/js/local-time.js" defer></script>')
    expect(script.status).toBe(200)
    expect(script.type).toMatch(/javascript/)
  })
})

describe('GET /dashboard', () => {
  it('renders the dashboard heading', async () => {
    const res = await request(app).get('/dashboard')

    expect(res.status).toBe(200)
    expect(res.text).toContain('<h1>Dashboard</h1>')
  })

  it('has a live Agents panel with the count and a link', async () => {
    const res = await request(app).get('/dashboard')

    expect(res.text).toContain(`${getAgents().length} agents are waiting for relief.`)
    expect(res.text).toContain('<a href="/agents">View agents</a>')
  })

  it('has a live Ailments panel with the count and a link', async () => {
    const res = await request(app).get('/dashboard')

    expect(res.text).toContain(`${getAilments().length} ailments are going around.`)
    expect(res.text).toContain('<a href="/ailments">View ailments</a>')
  })

  it('has a live Therapies panel with the count and a link', async () => {
    const res = await request(app).get('/dashboard')

    expect(res.text).toContain(`${getTherapies().length} therapies are ready to help.`)
    expect(res.text).toContain('<a href="/therapies">View therapies</a>')
  })

  it('has a live Appointments panel with the scheduled count and a link', async () => {
    const res = await request(app).get('/dashboard')
    const scheduled = getAppointments().filter(({ status }) => status === 'scheduled')

    expect(res.text).toContain(`${scheduled.length} appointments are scheduled.`)
    expect(res.text).toContain('<a href="/appointments">View appointments</a>')
    expect(res.text).not.toContain('Coming soon')
  })

  it('lists only scheduled appointments, with UTC datetimes', async () => {
    const res = await request(app).get('/dashboard')

    for (const { startsAt, status } of getAppointments()) {
      expect(res.text.includes(`<time datetime="${startsAt}">`)).toBe(status === 'scheduled')
    }
    expect(res.text).toContain('<a href="/appointments">View all appointments</a>')
  })
})

describe('unknown paths', () => {
  it('renders the 404 page inside the layout', async () => {
    const res = await request(app).get('/nope')

    expect(res.status).toBe(404)
    expect(res.type).toBe('text/html')
    expect(res.text).toContain('<h1>Page not found</h1>')
    expect(res.text).toContain('<nav aria-label="Main">')
    expect(res.text).not.toContain('aria-current="page"')
  })
})

describe('navigation', () => {
  const activeLinks = (html: string) => html.match(/aria-current="page"/g) ?? []

  it.each(pages)('marks only $label as active on $path', async ({ path, label }) => {
    const res = await request(app).get(path)

    expect(activeLinks(res.text)).toHaveLength(1)
    expect(res.text).toContain(`href="${path}" aria-current="page">${label}</a>`)
  })

  it.each(['/dashboard/', '/Dashboard', '/DASHBOARD/'])('still marks Dashboard as active on %s', async (path) => {
    const res = await request(app).get(path)

    expect(res.status).toBe(200)
    expect(res.text).toContain('href="/dashboard" aria-current="page">Dashboard</a>')
  })
})

describe('activeHref', () => {
  it.each([
    ['/', '/'],
    ['/agents', '/agents'],
    ['/agents/', '/agents'],
    ['/Agents/3', '/agents'],
    ['/agentsmith', undefined],
    ['/nope', undefined],
  ])('maps %s to %s', (path, expected) => {
    expect(activeHref(path)).toBe(expected)
  })
})

describe('layout', () => {
  it.each(pages)('$path has a skip link to the main content', async ({ path }) => {
    const res = await request(app).get(path)

    expect(res.text).toContain('<a class="skip-link" href="#main">')
    expect(res.text).toContain('<main id="main"')
  })

  it('sets security headers', async () => {
    const res = await request(app).get('/')

    expect(res.headers['content-security-policy']).toContain("default-src 'self'")
    expect(res.headers['x-content-type-options']).toBe('nosniff')
  })

  it('has the viewport meta tag', async () => {
    const res = await request(app).get('/')

    expect(res.text).toContain('<meta name="viewport" content="width=device-width, initial-scale=1">')
  })

  it('links Pico and the app stylesheet', async () => {
    const res = await request(app).get('/')

    expect(res.text).toContain('href="/vendor/pico/pico.min.css"')
    expect(res.text).toContain('href="/css/app.css"')
  })

  it.each(['/vendor/pico/pico.min.css', '/css/app.css'])('serves %s', async (path) => {
    const res = await request(app).get(path)

    expect(res.status).toBe(200)
    expect(res.type).toBe('text/css')
  })
})
