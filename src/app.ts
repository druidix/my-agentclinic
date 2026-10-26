import path from 'path'
import express from 'express'
import expressLayouts from 'express-ejs-layouts'

const app = express()
const rootDir = path.join(__dirname, '..')

const panels = [
  { title: 'Agents', note: 'Coming soon: the agent list arrives in phase 7.' },
  { title: 'Ailments', note: 'Coming soon: ailments arrive in phase 8.' },
  { title: 'Therapies', note: 'Coming soon: therapies arrive in phase 9.' },
  { title: 'Appointments', note: 'Coming soon: scheduled appointments arrive in phase 10.' },
]

const nav = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/agents', label: 'Agents' },
  { href: '/ailments', label: 'Ailments' },
  { href: '/therapies', label: 'Therapies' },
  { href: '/appointments', label: 'Appointments' },
]

app.set('view engine', 'ejs')
app.set('views', path.join(rootDir, 'views'))
app.set('layout', 'layout')
app.use(expressLayouts)
app.use(express.static(path.join(rootDir, 'public')))

app.use((req, res, next) => {
  res.locals.nav = nav
  res.locals.currentPath = req.path
  next()
})

app.get('/', (_req, res) => {
  res.render('index', { title: 'Home' })
})

app.get('/dashboard', (_req, res) => {
  res.render('dashboard', { title: 'Dashboard', panels })
})

for (const { href, label } of nav.slice(2)) {
  app.get(href, (_req, res) => {
    res.render('placeholder', { title: label })
  })
}

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

export default app
