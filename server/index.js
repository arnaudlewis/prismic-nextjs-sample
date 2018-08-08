const next = require("next")
var helmet = require('helmet')
const routes = require("../routes")
const PORT = parseInt(process.env.PORT, 10) || 3000

const app = next({ dev: process.env.NODE_ENV !== "production" })
const handler = routes.getRequestHandler(app)

// With express
const express = require("express")

app.prepare().then(() => {
  express()
    .use(handler)
    .use(helmet())
    .listen(PORT, () => process.stdout.write(`Point your browser to: http://localhost:${PORT}\n`))
})
