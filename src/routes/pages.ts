import { Router } from 'express'
import { getAgents } from '../data/agents'
import { getAilments } from '../data/ailments'
import { sections } from '../sections'

type Panel = {
  label: string
  note: string
  href?: string
}

type DashboardView = {
  title: string
  panels: Panel[]
}

// Live panels link to their page; the rest stay placeholders until their phase.
function panelFor({ href, label, note, placeholder }: (typeof sections)[number]): Panel {
  if (placeholder) return { label, note }
  if (href === '/agents') return { label, note: `${getAgents().length} agents are waiting for relief.`, href }
  if (href === '/ailments') return { label, note: `${getAilments().length} ailments are going around.`, href }
  return { label, note, href }
}

const router = Router()

router.get('/', (_req, res) => {
  res.render('index', { title: 'Home' })
})

router.get('/dashboard', (_req, res) => {
  const view: DashboardView = {
    title: 'Dashboard',
    panels: sections.filter(({ href }) => href !== '/dashboard').map(panelFor),
  }
  res.render('dashboard', view)
})

router.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

export default router
