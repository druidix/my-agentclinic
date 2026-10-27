import { Router } from 'express'
import { sections } from '../sections'

const router = Router()

// Throwaway pages: each data phase replaces one of these with its own router.
for (const { href, label } of sections.filter(({ placeholder }) => placeholder)) {
  router.get(href, (_req, res) => {
    res.render('placeholder', { title: label })
  })
}

export default router
