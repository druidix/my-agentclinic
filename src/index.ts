import express from 'express'

const app = express()
const port = Number(process.env.PORT) || 3000

app.get('/', (_req, res) => {
  res.type('html').send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>AgentClinic</title>
  </head>
  <body>
    <h1>Hello AgentClinic</h1>
  </body>
</html>`)
})

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.listen(port, () => {
  console.log(`AgentClinic listening on http://localhost:${port}`)
})
