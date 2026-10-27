import { Router } from 'express'
import { getAilmentsWithAgents } from '../data/ailments'
import type { AilmentWithAgents } from '../data/ailments'

type AilmentsView = {
  title: string
  ailments: AilmentWithAgents[]
}

const router = Router()

router.get('/ailments', (_req, res) => {
  const view: AilmentsView = { title: 'Ailments', ailments: getAilmentsWithAgents() }
  res.render('ailments', view)
})

export default router
