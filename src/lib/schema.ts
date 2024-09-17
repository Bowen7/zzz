import { z } from 'zod'

export const peerSchema = z.object({
  suggestion: z.string(),
  content: z.string(),
})

export const responseSchema = z.object({
  ok: z.boolean(),
  message: z.string().optional(),
  content: z.string(),
  peer: peerSchema,
})
