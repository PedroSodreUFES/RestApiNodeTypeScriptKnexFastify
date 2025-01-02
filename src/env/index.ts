import { z } from 'zod'
import { config } from 'dotenv'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' }) // pega no env.test
} else {
  config() // pega no env
}
// validação de dados

const envSchema = z.object({
  DATABASE_URL: z.string(), // .nullable(),
  PORT: z.coerce.number().default(3333),
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid envinronment variables!', _env.error.format())

  throw new Error('Invalid environment variabes.')
}

export const env = _env.data
