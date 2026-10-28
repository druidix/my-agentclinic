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
}

const router = Router()

router.get('/appointments', (_req, res) => {
  const view: AppointmentsView = {
    title: 'Appointments',
    appointments: getAppointmentsWithDetails().map((appointment) => ({ ...appointment, when: formatLocal(appointment.startsAt) })),
  }
  res.render('appointments', view)
})

export default router
