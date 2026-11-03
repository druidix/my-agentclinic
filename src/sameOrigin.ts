import type { RequestHandler } from 'express'

// Basic guard against cross-site form posts (there are no logins or cookies): the Origin, or failing that
// the Referer, must match this host. Browsers always send Origin on a form POST, so neither means hostile.
export const sameOrigin: RequestHandler = (req, res, next) => {
  const source = req.get('origin') ?? req.get('referer')
  try {
    if (source && new URL(source).host === req.get('host')) return next()
  } catch {
    // An unparseable header falls through to the rejection.
  }
  res.status(403).type('text').send('Forbidden')
}
