import { Router } from 'express'
import { getTherapiesWithAilments } from '../data/therapies'
import type { TherapyWithAilments } from '../data/therapies'

type TherapiesView = {
  title: string
  therapies: TherapyWithAilments[]
}

const router = Router()

router.get('/therapies', (_req, res) => {
  const view: TherapiesView = { title: 'Therapies', therapies: getTherapiesWithAilments() }
  res.render('therapies', view)
})

export default router
