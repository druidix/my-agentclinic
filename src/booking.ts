import { getAgents } from './data/agents'
import { getTherapies } from './data/therapies'
import type { NewAppointment } from './data/appointments'

export type BookingErrors = {
  agentId?: string
  therapyId?: string
  startsAt?: string
}

export type BookingResult = { ok: true; value: NewAppointment } | { ok: false; errors: BookingErrors }

const UTC_ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/

function knownId(raw: unknown, ids: number[]): number | undefined {
  const id = typeof raw === 'string' && /^\d+$/.test(raw) ? Number(raw) : undefined
  return id !== undefined && ids.includes(id) ? id : undefined
}

// Validate a posted booking. `now` is a parameter so tests control the clock.
export function validateBooking(body: Record<string, unknown>, now: Date): BookingResult {
  const errors: BookingErrors = {}
  const agentId = knownId(body.agentId, getAgents().map(({ id }) => id))
  const therapyId = knownId(body.therapyId, getTherapies().map(({ id }) => id))
  const startsAt = body.startsAt
  if (agentId === undefined) errors.agentId = 'Choose an agent.'
  if (therapyId === undefined) errors.therapyId = 'Choose a therapy.'

  if (typeof startsAt !== 'string' || startsAt === '') {
    errors.startsAt = 'Choose a date and time (this needs JavaScript).'
  } else if (!UTC_ISO.test(startsAt) || new Date(startsAt).toISOString().replace('.000Z', 'Z') !== startsAt) {
    errors.startsAt = 'That date and time is not valid.'
  } else if (new Date(startsAt) <= now) {
    errors.startsAt = 'Choose a time in the future.'
  }

  if (agentId === undefined || therapyId === undefined || errors.startsAt) return { ok: false, errors }
  return { ok: true, value: { agentId, therapyId, startsAt: startsAt as string } }
}
