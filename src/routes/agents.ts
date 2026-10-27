import { Router } from 'express'
import { getAgents } from '../data/agents'
import type { Agent } from '../data/agents'

type AgentsView = {
  title: string
  agents: Agent[]
}

const router = Router()

router.get('/agents', (_req, res) => {
  const view: AgentsView = { title: 'Agents', agents: getAgents() }
  res.render('agents', view)
})

export default router
