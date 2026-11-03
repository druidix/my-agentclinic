import { Router } from 'express'
import { getAppointmentsWithDetails } from '../data/appointments'
import type { AppointmentWithDetails } from '../data/appointments'
import { formatLocal } from '../format'

type AppointmentRow = AppointmentWithDetails & {
  when: string
}

type AppointmentsView = {
  title: string
  appointments: AppointmentRow[]
  booked?: AppointmentRow
}

const router = Router()

router.get('/appointments', (req, res) => {
  const rows = getAppointmentsWithDetails().map((appointment) => ({ ...appointment, when: formatLocal(appointment.startsAt) }))
  const booked = typeof req.query.booked === 'string' ? rows.find(({ id }) => String(id) === req.query.booked) : undefined
  const view: AppointmentsView = { title: 'Appointments', appointments: rows, booked }
  res.render('appointments', view)
})

export default router
