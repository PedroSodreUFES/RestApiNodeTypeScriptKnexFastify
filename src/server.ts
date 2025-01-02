import fastify from 'fastify'
import { knex } from './database'
import { env } from './env'

const app = fastify()

// http://localhost:3333/hello
app.get('/hello', async () => {
  const transaction = await knex('transactions')
    .where('amount', 1000)
    .select('*')

  return transaction
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
