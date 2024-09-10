import { z } from 'zod'

export const peerSchema = z.object({
  ok: z.boolean(),
  suggestion: z.string(),
  content: z.string(),
})

export type Message = {
  id: string
  role: 'user'
  content: string
  url: string
} | {
  id: string
  role: 'assistant'
  content: string
  suggestion: string
}
