import request from 'supertest'
import axe from 'axe-core'
import { JSDOM } from 'jsdom'
import { describe, expect, it } from 'vitest'
import app from '../src/app'

type AxeWindow = { axe: typeof axe; eval: (code: string) => void; document: Document }

// jsdom cannot compute colors, so color-contrast is off here; contrast is recorded in specs/2026-11-03-polish/requirements.md.
async function violations(html: string): Promise<string[]> {
  const dom = new JSDOM(html, { runScripts: 'outside-only' })
  const win = dom.window as unknown as AxeWindow
  win.eval(axe.source)
  const results = await win.axe.run(win.document.documentElement, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] },
    rules: { 'color-contrast': { enabled: false } },
  })
  return results.violations.map(({ id, nodes }) => `${id}: ${nodes.map(({ html: node }) => node).join(' | ')}`)
}

const pages = ['/', '/dashboard', '/agents', '/ailments', '/therapies', '/appointments', '/appointments/new', '/no-such-page']

describe('accessibility (axe, WCAG 2.2 AA)', () => {
  it('detects a violation, so a clean result means something', async () => {
    expect((await violations('<!doctype html><html lang="en"><head><title>t</title></head><body><main><img src="x.png"></main></body></html>')).join()).toContain('image-alt')
  })

  it.each(pages)('%s has no violations', async (path) => {
    const res = await request(app).get(path)

    expect(await violations(res.text)).toEqual([])
  })

  it('the booking form with errors has no violations', async () => {
    const res = await request(app)
      .post('/appointments')
      .type('form')
      .set('Host', 'clinic.test')
      .set('Origin', 'http://clinic.test')
      .send({ agentId: '', therapyId: '', startsAt: '' })

    expect(res.status).toBe(422)
    expect(await violations(res.text)).toEqual([])
  })
})
