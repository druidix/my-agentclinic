import { Router } from 'express'
import { getAgents } from '../data/agents'
import { getAilments } from '../data/ailments'
import type { AppointmentWithDetails } from '../data/appointments'
import { getAppointmentsWithDetails } from '../data/appointments'
import { getTherapies } from '../data/therapies'
import { formatLocal } from '../format'
import { sections } from '../sections'
import type { Section } from '../sections'

type Panel = {
  label: string
  note: string
  href?: string
}

type ScheduledAppointment = AppointmentWithDetails & {
  when: string
}

type DashboardView = {
  title: string
  panels: Panel[]
  scheduled: ScheduledAppointment[]
}

function scheduledAppointments(): ScheduledAppointment[] {
  return getAppointmentsWithDetails()
    .filter(({ status }) => status === 'scheduled')
    .map((appointment) => ({ ...appointment, when: formatLocal(appointment.startsAt) }))
}

// Every panel links to its page, with a live count where there is data to count.
function panelFor({ href, label, note }: Section): Panel {
  if (href === '/agents') return { label, note: `${getAgents().length} agents are waiting for relief.`, href }
  if (href === '/ailments') return { label, note: `${getAilments().length} ailments are going around.`, href }
  if (href === '/therapies') return { label, note: `${getTherapies().length} therapies are ready to help.`, href }
  if (href === '/appointments') return { label, note: `${scheduledAppointments().length} appointments are scheduled.`, href }
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
    scheduled: scheduledAppointments(),
  }
  res.render('dashboard', view)
})

router.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

export default router
