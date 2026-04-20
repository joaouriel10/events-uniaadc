import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().optional().default(3333),
  SENDGRID_API_KEY: z.string(),
  RESEND_API_KEY: z.string(),
  MAIL_FROM: z.string().email(),
})

export type Env = z.infer<typeof envSchema>
