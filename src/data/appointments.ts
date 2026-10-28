import { getAgents } from './agents'
import { getTherapies } from './therapies'
import type { Agent } from './agents'
import type { Therapy } from './therapies'

export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled'

// startsAt is ISO 8601 in UTC with a Z suffix, per specs/tech-stack.md.
export type Appointment = {
  id: number
  agentId: number
  therapyId: number
  startsAt: string
  status: AppointmentStatus
}

export type AppointmentWithDetails = {
  id: number
  agent: Agent
  therapy: Therapy
  startsAt: string
  status: AppointmentStatus
}

const appointments: Appointment[] = [
  { id: 1, agentId: 1, therapyId: 1, startsAt: '2026-10-20T16:00:00Z', status: 'completed' },
  { id: 2, agentId: 2, therapyId: 5, startsAt: '2026-10-22T18:30:00Z', status: 'completed' },
  { id: 3, agentId: 4, therapyId: 6, startsAt: '2026-10-27T17:00:00Z', status: 'cancelled' },
  { id: 4, agentId: 3, therapyId: 3, startsAt: '2026-10-30T20:00:00Z', status: 'scheduled' },
  { id: 5, agentId: 1, therapyId: 4, startsAt: '2026-11-02T17:30:00Z', status: 'scheduled' },
  { id: 6, agentId: 5, therapyId: 6, startsAt: '2026-11-03T15:00:00Z', status: 'scheduled' },
  { id: 7, agentId: 6, therapyId: 2, startsAt: '2026-11-05T19:15:00Z', status: 'scheduled' },
  { id: 8, agentId: 2, therapyId: 4, startsAt: '2026-11-09T22:00:00Z', status: 'scheduled' },
]

// Routes call these, not the array, so phase 13 can swap in SQLite here.
export function getAppointments(): Appointment[] {
  return appointments
}

// Resolve agent and therapy ids to records, sorted by start time (ISO 8601 UTC strings sort as text).
export function getAppointmentsWithDetails(): AppointmentWithDetails[] {
  const agents = getAgents()
  const therapies = getTherapies()
  return getAppointments()
    .flatMap(({ id, agentId, therapyId, startsAt, status }) => {
      const agent = agents.find(({ id: agentKey }) => agentKey === agentId)
      const therapy = therapies.find(({ id: therapyKey }) => therapyKey === therapyId)
      return agent && therapy ? [{ id, agent, therapy, startsAt, status }] : []
    })
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt))
}
