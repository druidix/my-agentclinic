import request from 'supertest'
import { describe, expect, it } from 'vitest'
import app from '../src/app'

const placeholders = [
  { path: '/agents', title: 'Agents' },
  { path: '/ailments', title: 'Ailments' },
  { path: '/therapies', title: 'Therapies' },
  { path: '/appointments', title: 'Appointments' },
]

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
})

describe('placeholder routes', () => {
  it.each(placeholders)('$path renders its title', async ({ path, title }) => {
    const res = await request(app).get(path)

    expect(res.status).toBe(200)
    expect(res.text).toContain(`<h1>${title}</h1>`)
    expect(res.text).toContain('Coming soon')
  })
})

describe('GET /dashboard', () => {
  it('renders the dashboard heading', async () => {
    const res = await request(app).get('/dashboard')

    expect(res.status).toBe(200)
    expect(res.text).toContain('<h1>Dashboard</h1>')
  })

  it.each(['Agents', 'Ailments', 'Therapies', 'Appointments'])('has a %s panel with a coming-soon note', async (name) => {
    const res = await request(app).get('/dashboard')

    expect(res.text).toMatch(new RegExp(`<article>\\s*<h2>${name}</h2>\\s*<p>Coming soon`))
  })

  it('serves the panel styles', async () => {
    const res = await request(app).get('/css/app.css')

    expect(res.text).toContain('.panel-grid')
  })
})

describe('unknown paths', () => {
  it('returns 404', async () => {
    const res = await request(app).get('/nope')

    expect(res.status).toBe(404)
  })
})

describe('navigation', () => {
  const activeLinks = (html: string) => html.match(/aria-current="page"/g) ?? []

  it.each([{ path: '/', label: 'Home' }, { path: '/dashboard', label: 'Dashboard' }, ...placeholders.map((p) => ({ path: p.path, label: p.title }))])(
    'marks only $label as active on $path',
    async ({ path, label }) => {
      const res = await request(app).get(path)

      expect(activeLinks(res.text)).toHaveLength(1)
      expect(res.text).toContain(`href="${path}" aria-current="page">${label}</a>`)
    },
  )
})

describe('responsive design', () => {
  const pages = ['/', '/dashboard', ...placeholders.map((p) => p.path)]

  it.each(pages)('%s has the viewport meta tag', async (path) => {
    const res = await request(app).get(path)

    expect(res.text).toContain('<meta name="viewport" content="width=device-width, initial-scale=1">')
  })

  it.each(pages)('%s links Pico and the app stylesheet', async (path) => {
    const res = await request(app).get(path)

    expect(res.text).toContain('href="/vendor/pico/pico.min.css"')
    expect(res.text).toContain('href="/css/app.css"')
  })

  it('serves the Pico stylesheet', async () => {
    const res = await request(app).get('/vendor/pico/pico.min.css')

    expect(res.status).toBe(200)
    expect(res.type).toBe('text/css')
  })

  it('app.css has a small-screen media query', async () => {
    const res = await request(app).get('/css/app.css')

    expect(res.status).toBe(200)
    expect(res.text).toMatch(/@media \(max-width: 40rem\)/)
  })

  it('app.css sets a 44px minimum tap size', async () => {
    const res = await request(app).get('/css/app.css')

    expect(res.text).toContain('min-height: 2.75rem')
  })
})
