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
    expect(res.text).toContain('<header class="site-header">')
    expect(res.text).toContain('<nav aria-label="Main">')
    expect(res.text).toContain('<footer class="site-footer">')
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

    expect(res.text).toMatch(new RegExp(`<section class="panel">\\s*<h2>${name}</h2>\\s*<p>Coming soon`))
  })

  it('serves the panel styles', async () => {
    const res = await request(app).get('/css/components.css')

    expect(res.text).toContain('.panel-grid')
    expect(res.text).toContain('.panel')
  })
})

describe('unknown paths', () => {
  it('returns 404', async () => {
    const res = await request(app).get('/nope')

    expect(res.status).toBe(404)
  })
})

describe('navigation', () => {
  const activeLinks = (html: string) => html.match(/class="active"/g) ?? []

  it.each([{ path: '/', label: 'Home' }, { path: '/dashboard', label: 'Dashboard' }, ...placeholders.map((p) => ({ path: p.path, label: p.title }))])(
    'marks only $label as active on $path',
    async ({ path, label }) => {
      const res = await request(app).get(path)

      expect(activeLinks(res.text)).toHaveLength(1)
      expect(res.text).toContain(`href="${path}" class="active" aria-current="page">${label}</a>`)
    },
  )
})

describe('responsive design', () => {
  const pages = ['/', ...placeholders.map((p) => p.path)]
  const stylesheets = ['tokens', 'base', 'header', 'footer', 'components']

  it.each(pages)('%s has the viewport meta tag', async (path) => {
    const res = await request(app).get(path)

    expect(res.text).toContain('<meta name="viewport" content="width=device-width, initial-scale=1">')
  })

  it.each(pages)('%s links every stylesheet', async (path) => {
    const res = await request(app).get(path)

    for (const name of stylesheets) {
      expect(res.text).toContain(`href="/css/${name}.css"`)
    }
  })

  it.each(['base', 'header', 'footer', 'components'])('%s.css has a small-screen media query', async (name) => {
    const res = await request(app).get(`/css/${name}.css`)

    expect(res.status).toBe(200)
    expect(res.text).toMatch(/@media \(max-width: 40rem\)/)
  })

  it.each(['header', 'components'])('%s.css sets a 44px minimum tap size', async (name) => {
    const res = await request(app).get(`/css/${name}.css`)

    expect(res.text).toContain('min-height: 2.75rem')
  })
})
