import { getDb } from '../db'

export type Agent = {
  id: number
  name: string
  model: string
  role: string
  complaint: string
}

export function getAgents(): Agent[] {
  return getDb().prepare('SELECT id, name, model, role, complaint FROM agents ORDER BY id').all() as unknown as Agent[]
}
