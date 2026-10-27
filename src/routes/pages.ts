import { Router } from 'express'
import { sections } from '../sections'
import type { Section } from '../sections'

type DashboardView = {
  title: string
  panels: Section[]
}

const router = Router()

router.get('/', (_req, res) => {
  res.render('index', { title: 'Home' })
})

router.get('/dashboard', (_req, res) => {
  const view: DashboardView = {
    title: 'Dashboard',
    panels: sections.filter(({ href }) => href !== '/dashboard'),
  }
  res.render('dashboard', view)
})

router.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

export default router
