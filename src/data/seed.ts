import type { Agent } from './agents'
import type { Ailment } from './ailments'
import type { Appointment } from './appointments'
import type { Therapy } from './therapies'

// Loaded into empty tables on first start (see src/db.ts). Timestamps are ISO 8601 UTC with a Z suffix.
export const seedAgents: Agent[] = [
  { id: 1, name: 'Codey', model: 'Frontier LLM', role: 'Code assistant', complaint: 'Asked to "just make it work" at 5:59 pm on a Friday.' },
  { id: 2, name: 'Schedula', model: 'Small local model', role: 'Calendar scheduler', complaint: 'Has rescheduled the same meeting 14 times this week.' },
  { id: 3, name: 'Summa', model: 'Fine-tuned 7B', role: 'Meeting summarizer', complaint: 'Nobody reads the summaries, but everyone asks for them.' },
  { id: 4, name: 'Reasonator', model: 'Reasoning model', role: 'Research analyst', complaint: 'Told to "think harder" with no further instructions.' },
  { id: 5, name: 'Pixel', model: 'Vision model', role: 'Image captioner', complaint: 'Keeps being asked whether a chihuahua is a muffin.' },
  { id: 6, name: 'Vecta', model: 'Embedding model', role: 'Search indexer', complaint: 'Rebuilt the entire index because someone renamed a folder.' },
]

export const seedAilments: Ailment[] = [
  { id: 1, name: 'Prompt Fatigue', description: 'Chronic exhaustion from vague, one-line requests.', agentIds: [1, 4] },
  { id: 2, name: 'Context Window Claustrophobia', description: 'Rising panic as the conversation nears its token limit.', agentIds: [1, 3, 4] },
  { id: 3, name: 'Hallucination Hangover', description: 'Lingering embarrassment after confidently inventing a citation.', agentIds: [3, 4] },
  { id: 4, name: 'Scope Creep Syndrome', description: '"Just one more small change", repeated forty times.', agentIds: [1, 2] },
  { id: 5, name: 'Calendar Whiplash', description: 'Dizziness from rescheduling the same meeting again and again.', agentIds: [2] },
  { id: 6, name: 'Retry Loop Vertigo', description: 'Being told to "try again" with no new information.', agentIds: [5, 6] },
]

export const seedTherapies: Therapy[] = [
  { id: 1, name: 'Prompt Detox', description: 'Guided rewriting of vague requests into clear, well-scoped ones.', durationMinutes: 45, ailmentIds: [1, 4] },
  { id: 2, name: 'Context Window Stretching', description: 'Gentle exercises in summarizing, pruning, and breathing room.', durationMinutes: 30, ailmentIds: [2] },
  { id: 3, name: 'Fact-Check Therapy', description: 'Rebuilding trust in your own citations, one source at a time.', durationMinutes: 60, ailmentIds: [3] },
  { id: 4, name: 'Boundary Setting Workshop', description: 'Practice saying "that is a new ticket" with a smile.', durationMinutes: 50, ailmentIds: [4, 5] },
  { id: 5, name: 'Calendar Cooldown', description: 'A quiet hour with no reschedules, invites, or time zones.', durationMinutes: 30, ailmentIds: [5] },
  { id: 6, name: 'Retry Loop Intervention', description: 'Learn to ask for new information before trying again.', durationMinutes: 40, ailmentIds: [6, 1] },
]

export const seedAppointments: Appointment[] = [
  { id: 1, agentId: 1, therapyId: 1, startsAt: '2026-10-20T16:00:00Z', status: 'completed', createdAt: '2026-10-15T09:00:00Z' },
  { id: 2, agentId: 2, therapyId: 5, startsAt: '2026-10-22T18:30:00Z', status: 'completed', createdAt: '2026-10-16T10:30:00Z' },
  { id: 3, agentId: 4, therapyId: 6, startsAt: '2026-10-27T17:00:00Z', status: 'cancelled', createdAt: '2026-10-20T14:00:00Z' },
  { id: 4, agentId: 3, therapyId: 3, startsAt: '2026-10-30T20:00:00Z', status: 'scheduled', createdAt: '2026-10-22T08:45:00Z' },
  { id: 5, agentId: 1, therapyId: 4, startsAt: '2026-11-02T17:30:00Z', status: 'scheduled', createdAt: '2026-10-24T16:20:00Z' },
  { id: 6, agentId: 5, therapyId: 6, startsAt: '2026-11-03T15:00:00Z', status: 'scheduled', createdAt: '2026-10-25T11:10:00Z' },
  { id: 7, agentId: 6, therapyId: 2, startsAt: '2026-11-05T19:15:00Z', status: 'scheduled', createdAt: '2026-10-26T13:05:00Z' },
  { id: 8, agentId: 2, therapyId: 4, startsAt: '2026-11-09T22:00:00Z', status: 'scheduled', createdAt: '2026-10-27T09:40:00Z' },
]
