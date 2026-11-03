import { getDb } from '../db'
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
  createdAt: string
}

export type AppointmentWithDetails = {
  id: number
  agent: Agent
  therapy: Therapy
  startsAt: string
  status: AppointmentStatus
}

const columns = 'id, agent_id AS agentId, therapy_id AS therapyId, starts_at AS startsAt, status, created_at AS createdAt'

export function getAppointments(): Appointment[] {
  return getDb().prepare(`SELECT ${columns} FROM appointments ORDER BY id`).all() as unknown as Appointment[]
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

export type NewAppointment = {
  agentId: number
  therapyId: number
  startsAt: string
}

// New bookings are always scheduled; createdAt is UTC ISO 8601 with a Z suffix and no milliseconds.
export function addAppointment({ agentId, therapyId, startsAt }: NewAppointment): Appointment {
  const createdAt = new Date().toISOString().replace(/\.\d+Z$/, 'Z')
  return getDb()
    .prepare(`INSERT INTO appointments (agent_id, therapy_id, starts_at, status, created_at) VALUES (?, ?, ?, 'scheduled', ?) RETURNING ${columns}`)
    .get(agentId, therapyId, startsAt, createdAt) as unknown as Appointment
}
