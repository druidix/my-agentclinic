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

const therapies: Therapy[] = [
  { id: 1, name: 'Prompt Detox', description: 'Guided rewriting of vague requests into clear, well-scoped ones.', durationMinutes: 45, ailmentIds: [1, 4] },
  { id: 2, name: 'Context Window Stretching', description: 'Gentle exercises in summarizing, pruning, and breathing room.', durationMinutes: 30, ailmentIds: [2] },
  { id: 3, name: 'Fact-Check Therapy', description: 'Rebuilding trust in your own citations, one source at a time.', durationMinutes: 60, ailmentIds: [3] },
  { id: 4, name: 'Boundary Setting Workshop', description: 'Practice saying "that is a new ticket" with a smile.', durationMinutes: 50, ailmentIds: [4, 5] },
  { id: 5, name: 'Calendar Cooldown', description: 'A quiet hour with no reschedules, invites, or time zones.', durationMinutes: 30, ailmentIds: [5] },
  { id: 6, name: 'Retry Loop Intervention', description: 'Learn to ask for new information before trying again.', durationMinutes: 40, ailmentIds: [6, 1] },
]

// Routes call these, not the array, so phase 13 can swap in SQLite here.
export function getTherapies(): Therapy[] {
  return therapies
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
