import path from 'path'
import express from 'express'
import expressLayouts from 'express-ejs-layouts'

const app = express()
const port = Number(process.env.PORT) || 3000
const rootDir = path.join(__dirname, '..')

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

for (const { href, label } of nav.slice(1)) {
  app.get(href, (_req, res) => {
    res.render('placeholder', { title: label })
  })
}

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.listen(port, () => {
  console.log(`AgentClinic listening on http://localhost:${port}`)
})
