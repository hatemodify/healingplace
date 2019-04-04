const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const https = require('https')
const fs = require('fs')
const DB_INFO = require('./dbsetting')
const mongoose = require('mongoose')
const SHOP_MODEL = require('./models/shop')

const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

const options = {
  key: fs.readFileSync('./server/key.pem'),
  cert: fs.readFileSync('./server/cert.pem')
}

mongoose.connect(
  DB_INFO,
  { useNewUrlParser: true }
)
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))

db.once('open', callbak => {
  console.log('db connection success')
})

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)
  app.use('/shop', require('./routes/shop'))
  app.use('/user', require('./routes/user'))
  // Listen the server
  // app.listen(port, host)

  https.createServer(options, app).listen(port)

  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

app.get('/server', function (req, res) {
  res.send('API root')
})

start()
