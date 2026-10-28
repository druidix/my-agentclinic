import { Router } from 'express'
import { getAilmentsWithAgents } from '../data/ailments'
import { getTherapiesForAilment } from '../data/therapies'
import type { AilmentWithAgents } from '../data/ailments'
import type { Therapy } from '../data/therapies'

type AilmentWithTherapies = AilmentWithAgents & {
  therapies: Therapy[]
}

type AilmentsView = {
  title: string
  ailments: AilmentWithTherapies[]
}

const router = Router()

router.get('/ailments', (_req, res) => {
  const view: AilmentsView = { title: 'Ailments', ailments: getAilmentsWithAgents().map((ailment) => ({ ...ailment, therapies: getTherapiesForAilment(ailment.id) })) }
  res.render('ailments', view)
})

export default router
