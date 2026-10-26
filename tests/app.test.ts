import request from 'supertest'
import { describe, expect, it } from 'vitest'
import app from '../src/app'

const placeholders = [
  { path: '/dashboard', title: 'Dashboard' },
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
    expect(res.body).toEqual({ status: 'deliberately-wrong' })
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

describe('unknown paths', () => {
  it('returns 404', async () => {
    const res = await request(app).get('/nope')

    expect(res.status).toBe(404)
  })
})

describe('navigation', () => {
  const activeLinks = (html: string) => html.match(/class="active"/g) ?? []

  it.each([{ path: '/', label: 'Home' }, ...placeholders.map((p) => ({ path: p.path, label: p.title }))])(
    'marks only $label as active on $path',
    async ({ path, label }) => {
      const res = await request(app).get(path)

      expect(activeLinks(res.text)).toHaveLength(1)
      expect(res.text).toContain(`href="${path}" class="active" aria-current="page">${label}</a>`)
    },
  )
})
