const fastify = require('fastify')({
  logger: true,
})
const mongoose = require('mongoose')
const cors = require('@fastify/cors')

fastify.register(require('./routes/loan.routes'))

async function start() {
  try {
    await fastify.register(cors, {
      origin: '*',
    })
    await mongoose.connect('mongodb://127.0.0.1:27017/loan-app'),
      console.log('MongoDB connected')
    await fastify.listen({ port: 3000 })
    fastify.log.info(`Server started on port ${fastify.server.address().port}`)
  } catch (error) {
    console.error(error)
  }
}

start()
