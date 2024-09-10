'use client'
import { MessageItem } from '@/components/message-item'
import { Mic } from '@/components/mic'
import { peerSchema } from '@/lib/share'
import { nanoid } from 'nanoid'
import { useCallback, useState } from 'react'
import z from 'zod'
import type { Message } from '@/lib/share'

const schema = z.object({
  text: z.string(),
  peer: peerSchema,
})

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([{
    id: nanoid(),
    role: 'user',
    content: 'Hello',
    url: 'https://gw.alipayobjects.com/os/kitchen/lnOJK2yZ0K/sound.mp3',
  }])
  const onSubmit = useCallback(async (url: string, blob: Blob) => {
    const formData = new FormData()
    formData.append('input', blob, 'audio.mp3')
    const response = await fetch('/api', {
      method: 'POST',
      body: formData,
    })
    const data = await response.json()
    const parsed = schema.safeParse(data)
    if (parsed.success) {
      const { peer, text } = parsed.data
      const { ok, content, suggestion } = peer
      if (ok) {
        setMessages(prev => [
          ...prev,
          { id: nanoid(), role: 'user', content: text, url },
          { id: nanoid(), role: 'assistant', content, suggestion },
        ])
      }
    }
  }, [])
  return (
    <div className="h-screen font-[family-name:var(--font-geist-sans)]">
      <Mic onSubmit={onSubmit} />
      {messages.map(message => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  )
}
