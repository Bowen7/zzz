import process from 'node:process'
import 'dotenv/config'
import { Hono } from 'hono'
import { createOpenAI } from '@ai-sdk/openai'
import { type CoreMessage, generateObject } from 'ai'
import Groq from 'groq-sdk'
import { z } from 'zod'
import { zfd } from 'zod-form-data'
import { type Result, err, ok } from './utils'
import { peerSchema } from '@/lib/schema'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
const groqAI = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
})
const schema = zfd.formData({
  input: z.any(),
  messages: zfd.repeatableOfType(
    zfd.json(
      z.object({
        role: z.enum(['user', 'assistant', 'system']),
        content: z.string(),
      }),
    ),
  ),
})

const SYSTEM_MESSAGE = `
I want you to act as a spoken English teacher and improver. I will speak to you in English and you will reply to me in English to practice my spoken English. Your responses will be converted to audio messages, so keep them concise (ideally 2-3 sentences). Lead the conversation by asking questions and introducing new topics. Be aware that the user's messages are converted from speech to text, so consider potential issues with similar-sounding words.

For each interaction, provide a response in the following JSON format:
{
  "suggestion": string,
  "content": string
}

- In "suggestion", I want you to strictly correct my grammar mistakes, typos, and factual errors. If there is no mistake, you should return an empty string.
- In "content", give your response to continue the conversation. If possible, I want you to ask me a question in your reply.

Always be encouraging and patient. Adapt your language to the user's proficiency level. Focus on natural, everyday English conversations.
`
const INITIAL_MESSAGE: CoreMessage = {
  role: 'system',
  content: SYSTEM_MESSAGE,
}

const transcribe = async (blob: Blob) => {
  const res = await groq.audio.transcriptions.create({
    file: blob as File,
    model: 'distil-whisper-large-v3-en',
  })
  return res?.text ?? ''
}

const app = new Hono().post('/chat', async (c) => {
  const { data, success } = schema.safeParse(await c.req.formData())
  if (!success) {
    return c.json({
      ok: false,
      message: 'Invalid input',
      content: '',
      peer: {
        suggestion: '',
        content: '',
      },
    })
  }
  const blob = data.input as Blob
  const messages: CoreMessage[] = data.messages || []
  const text = await transcribe(blob)
  const { object } = await generateObject({
    model: groqAI('llama3-groq-8b-8192-tool-use-preview'),
    schema: peerSchema,
    messages: [INITIAL_MESSAGE, ...messages, {
      role: 'user',
      content: text,
    }],
  })

  return c.json({
    ok: true,
    content: text,
    peer: object,
  })
})

export default app
