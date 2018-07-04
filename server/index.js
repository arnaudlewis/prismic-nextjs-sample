const next = require("next")
var helmet = require('helmet')
const routes = require("../routes")

const app = next({ dev: process.env.NODE_ENV !== "production" })
const handler = routes.getRequestHandler(app)

// With express
const express = require("express")

app.prepare().then(() => {
  express()
    .use(handler)
    .use(helmet())
    .listen(3000, () => process.stdout.write(`Point your browser to: http://localhost:3000\n`));
})
