import { getDb } from '../db'
import { getAilments } from './ailments'
import type { Ailment } from './ailments'

export type Therapy = {
  id: number
  name: string
  description: string
  durationMinutes: number
  ailmentIds: number[]
}

export type TherapyWithAilments = {
  id: number
  name: string
  description: string
  durationMinutes: number
  ailments: Ailment[]
}

export function getTherapies(): Therapy[] {
  const db = getDb()
  const rows = db.prepare('SELECT id, name, description, duration_minutes AS durationMinutes FROM therapies ORDER BY id').all() as unknown as Omit<Therapy, 'ailmentIds'>[]
  const links = db.prepare('SELECT therapy_id AS therapyId, ailment_id AS ailmentId FROM therapy_ailments ORDER BY ailment_id').all() as unknown as { therapyId: number; ailmentId: number }[]
  return rows.map((row) => ({ ...row, ailmentIds: links.filter(({ therapyId }) => therapyId === row.id).map(({ ailmentId }) => ailmentId) }))
}

// Resolve each therapy's ailment ids to ailment records, so views never handle ids.
export function getTherapiesWithAilments(): TherapyWithAilments[] {
  const ailments = getAilments()
  return getTherapies().map(({ id, name, description, durationMinutes, ailmentIds }) => ({
    id,
    name,
    description,
    durationMinutes,
    ailments: ailmentIds.flatMap((ailmentId) => ailments.filter((ailment) => ailment.id === ailmentId)),
  }))
}

export function getTherapiesForAilment(ailmentId: number): Therapy[] {
  return getTherapies().filter(({ ailmentIds }) => ailmentIds.includes(ailmentId))
}
