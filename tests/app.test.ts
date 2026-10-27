import request from 'supertest'
import { describe, expect, it } from 'vitest'
import app from '../src/app'
import { getAgents } from '../src/data/agents'
import { activeHref, nav, sections } from '../src/sections'

const placeholders = sections.filter(({ placeholder }) => placeholder)
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

describe('placeholder routes', () => {
  it.each(placeholders)('$href renders its title', async ({ href, label }) => {
    const res = await request(app).get(href)

    expect(res.status).toBe(200)
    expect(res.text).toContain(`<h1>${label}</h1>`)
    expect(res.text).toContain('Coming soon')
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

  it.each(placeholders)('has a $label panel with a coming-soon note', async ({ label }) => {
    const res = await request(app).get('/dashboard')

    expect(res.text).toMatch(new RegExp(`<article>\\s*<h2>${label}</h2>\\s*<p>Coming soon`))
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
