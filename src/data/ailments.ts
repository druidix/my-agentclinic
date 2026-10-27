import { getAgents } from './agents'
import type { Agent } from './agents'

export type Ailment = {
  id: number
  name: string
  description: string
  agentIds: number[]
}

export type AilmentWithAgents = {
  id: number
  name: string
  description: string
  agents: Agent[]
}

const ailments: Ailment[] = [
  { id: 1, name: 'Prompt Fatigue', description: 'Chronic exhaustion from vague, one-line requests.', agentIds: [1, 4] },
  { id: 2, name: 'Context Window Claustrophobia', description: 'Rising panic as the conversation nears its token limit.', agentIds: [1, 3, 4] },
  { id: 3, name: 'Hallucination Hangover', description: 'Lingering embarrassment after confidently inventing a citation.', agentIds: [3, 4] },
  { id: 4, name: 'Scope Creep Syndrome', description: '"Just one more small change", repeated forty times.', agentIds: [1, 2] },
  { id: 5, name: 'Calendar Whiplash', description: 'Dizziness from rescheduling the same meeting again and again.', agentIds: [2] },
  { id: 6, name: 'Retry Loop Vertigo', description: 'Being told to "try again" with no new information.', agentIds: [5, 6] },
]

// Routes call these, not the array, so phase 13 can swap in SQLite here.
export function getAilments(): Ailment[] {
  return ailments
}

// Resolve each ailment's agent ids to agent records, so views never handle ids.
export function getAilmentsWithAgents(): AilmentWithAgents[] {
  const agents = getAgents()
  return getAilments().map(({ id, name, description, agentIds }) => ({
    id,
    name,
    description,
    agents: agentIds.flatMap((agentId) => agents.filter((agent) => agent.id === agentId)),
  }))
}
