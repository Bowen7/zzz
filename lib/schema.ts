import { z } from 'zod'

export const peerSchema = z.object({
  ok: z.boolean(),
  suggestion: z.string(),
  content: z.string(),
})

export const responseSchema = z.object({
  text: z.string(),
  peer: peerSchema,
})
