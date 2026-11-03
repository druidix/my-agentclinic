import { Router } from 'express'
import { getAgents } from '../data/agents'
import type { Agent } from '../data/agents'
import { addAppointment } from '../data/appointments'
import { getTherapies } from '../data/therapies'
import type { Therapy } from '../data/therapies'
import { validateBooking } from '../booking'
import type { BookingErrors } from '../booking'
import { sameOrigin } from '../sameOrigin'

type BookingValues = {
  agentId: string
  therapyId: string
  startsAt: string
}

type BookingView = {
  title: string
  agents: Agent[]
  therapies: Therapy[]
  values: BookingValues
  errors: BookingErrors
}

const router = Router()

function formView(values: BookingValues, errors: BookingErrors): BookingView {
  return { title: 'Book an appointment', agents: getAgents(), therapies: getTherapies(), values, errors }
}

const field = (value: unknown) => (typeof value === 'string' ? value : '')

router.get('/appointments/new', (_req, res) => {
  res.render('book', formView({ agentId: '', therapyId: '', startsAt: '' }, {}))
})

router.post('/appointments', sameOrigin, (req, res) => {
  const body: Record<string, unknown> = req.body ?? {}
  const htmx = req.get('HX-Request') === 'true'
  const result = validateBooking(body, new Date())
  if (!result.ok) {
    const values = { agentId: field(body.agentId), therapyId: field(body.therapyId), startsAt: field(body.startsAt) }
    const view = formView(values, result.errors)
    // htmx swaps just the form; a plain post gets the whole page.
    res.status(422).render(htmx ? 'partials/book-form' : 'book', htmx ? { ...view, layout: false } : view)
    return
  }
  const url = `/appointments?booked=${addAppointment(result.value).id}`
  if (htmx) res.set('HX-Redirect', url).status(204).end()
  else res.redirect(303, url)
})

export default router
