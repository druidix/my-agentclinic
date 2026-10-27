import path from 'path'
import express from 'express'
import type { ErrorRequestHandler } from 'express'
import expressLayouts from 'express-ejs-layouts'
import helmet from 'helmet'
import agents from './routes/agents'
import pages from './routes/pages'
import placeholders from './routes/placeholders'
import { activeHref, nav } from './sections'

const app = express()
const rootDir = path.join(__dirname, '..')

app.disable('x-powered-by')
// Demos run over plain http on localhost, so don't upgrade subresources to https.
app.use(helmet({ contentSecurityPolicy: { useDefaults: true, directives: { 'upgrade-insecure-requests': null } } }))
app.set('view engine', 'ejs')
app.set('views', path.join(rootDir, 'views'))
app.set('layout', 'layout')
app.use(expressLayouts)
app.use(express.static(path.join(rootDir, 'public')))
app.use('/vendor/pico', express.static(path.join(rootDir, 'node_modules', '@picocss', 'pico', 'css')))

app.use((req, res, next) => {
  res.locals.nav = nav
  res.locals.activeHref = activeHref(req.path)
  next()
})

app.use(pages)
app.use(agents)
app.use(placeholders)

app.use((_req, res) => {
  res.status(404).render('404', { title: 'Page not found' })
})

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err)
  res.status(500).render('error', { title: 'Something went wrong' })
}
app.use(errorHandler)

export default app
