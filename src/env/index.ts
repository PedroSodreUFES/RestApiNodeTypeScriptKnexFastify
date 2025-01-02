import 'dotenv/config'
import { z } from 'zod'

// validação de dados

const envSchema = z.object({
  DATABASE_URL: z.string(), // .nullable(),
  PORT: z.number().default(3333),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid envinronment variables!', _env.error.format())

  throw new Error('Invalid environment variabes.')
}

export const env = _env.data