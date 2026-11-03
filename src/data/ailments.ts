import { getDb } from '../db'
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

export function getAilments(): Ailment[] {
  const db = getDb()
  const rows = db.prepare('SELECT id, name, description FROM ailments ORDER BY id').all() as unknown as Omit<Ailment, 'agentIds'>[]
  const links = db.prepare('SELECT ailment_id AS ailmentId, agent_id AS agentId FROM agent_ailments ORDER BY agent_id').all() as unknown as { ailmentId: number; agentId: number }[]
  return rows.map((row) => ({ ...row, agentIds: links.filter(({ ailmentId }) => ailmentId === row.id).map(({ agentId }) => agentId) }))
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
