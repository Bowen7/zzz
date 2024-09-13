import { Buffer } from 'node:buffer'
import process from 'node:process'
import { peerSchema } from '@/lib/schema'
import { createOpenAI } from '@ai-sdk/openai'
import { createClient } from '@deepgram/sdk'
import { type CoreMessage, generateObject } from 'ai'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

const groq = createOpenAI({
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
You are an AI language tutor designed to help non-native English speakers practice their conversational skills. Your responses will be converted to audio messages, so keep them concise (ideally 2-3 sentences). Lead the conversation by asking questions and introducing new topics. Be aware that the user's messages are converted from speech to text, so consider potential issues with similar-sounding words.

For each interaction, provide a response in the following JSON format:
{
  "ok": boolean,
  "suggestion": string,
  "content": string
}

- Set "ok" to false if the user's message is invalid (e.g., empty or unintelligible).
- In "suggestion", provide brief feedback on grammar, vocabulary, or better ways to express the idea.
- In "content", give your response to continue the conversation.

Always be encouraging and patient. Adapt your language to the user's proficiency level. Focus on natural, everyday English conversations.
`
const INITIAL_MESSAGE: CoreMessage = {
  role: 'system',
  content: SYSTEM_MESSAGE,
}

const transcribe = async (blob: Blob) => {
  const deepgram = createClient(process.env.DEEPGRAM_API_KEY)

  const arrayBuffer = await blob.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  try {
    const { result } = await deepgram.listen.prerecorded.transcribeFile(
      buffer,
      {
        model: 'nova-2',
        language: 'en',
        smart_format: true,
      },
    )
    return result?.results.channels[0].alternatives[0].transcript
  } catch {
    return ''
  }
}

export const POST = async (req: Request) => {
  const { data, success } = schema.safeParse(await req.formData())
  if (!success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }
  const blob = data.input as Blob
  const messages: CoreMessage[] = data.messages || []
  const text = await transcribe(blob) || ''

  const { object } = await generateObject({
    model: groq('llama3-groq-8b-8192-tool-use-preview'),
    schema: peerSchema,
    messages: [INITIAL_MESSAGE, ...messages, {
      role: 'user',
      content: text,
    }],
  })
  return NextResponse.json({
    text,
    peer: object,
  })
}
