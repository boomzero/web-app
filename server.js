require('dotenv-flow').config()

const express = require('express')
const next = require('next')

const {NODE_ENV, PORT} = process.env

const app = next({ dev: NODE_ENV !== 'production' })
const handle = app.getRequestHandler()

const main = async () => {
  try {
    const server = express()
    await app.prepare()

    server.get('*', (req, res) => handle(req, res))

    server.listen(PORT, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

main()
