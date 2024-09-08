'use client'
import { Message } from '@/components/message'
import { Mic } from '@/components/mic'
import { nanoid } from 'nanoid'
import { useState } from 'react'
import z from 'zod'
import type { CoreMessage } from 'ai'

const schema = z.object({
  content: z.string(),
  suggestion: z.string(),
  ok: z.boolean(),
})

export default function Home() {
  const [messages, setMessages] = useState<(CoreMessage & { id: string })[]>([])
  const onSubmit = async (blob: Blob) => {
    const formData = new FormData()
    formData.append('input', blob, 'audio.mp3')
    const response = await fetch('/api', {
      method: 'POST',
      body: formData,
    })
    const data = await response.json()
    const parsed = schema.safeParse(data)
    if (parsed.success) {
      const { content, ok } = parsed.data
      if (ok) {
        setMessages(prev => [
          ...prev,
          // { role: 'user', content: blob.name },
          { role: 'assistant', content, id: nanoid() },
        ])
      }
    }
  }
  return (
    <div className="h-screen font-[family-name:var(--font-geist-sans)]">
      <Mic onSubmit={onSubmit} />
      {messages.map(message => (
        <Message key={message.id} content={message.content as string} />
      ))}
    </div>
  )
}
