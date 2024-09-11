'use client'
import { Content } from '@/components/content'
import { DeleteDialog } from '@/components/delete-dialog'
import { Header } from '@/components/header'
import { Mic } from '@/components/mic'
import { RoleMessage } from '@/components/role-message'
import { Sidebar } from '@/components/sidebar'
import { useChat, useChats, useSelect } from '@/lib/hooks'
import { peerSchema, responseSchema } from '@/lib/schema'
import { nanoid } from 'nanoid'
import { useCallback, useState } from 'react'
import type { Message } from '@/lib/types'

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([{
    id: nanoid(),
    role: 'user',
    content: 'Hello',
    url: 'https://gw.alipayobjects.com/os/kitchen/lnOJK2yZ0K/sound.mp3',
  }])

  const chats = useChats()
  const { selected, onSelect } = useSelect(chats ?? [])
  const chat = useChat(selected)

  const onSubmit = useCallback(async (url: string, blob: Blob) => {
    const formData = new FormData()
    formData.append('input', blob, 'audio.mp3')
    const response = await fetch('/api', {
      method: 'POST',
      body: formData,
    })
    const data = await response.json()
    const parsed = responseSchema.safeParse(data)
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
    <div className="h-screen overflow-hidden flex font-[family-name:var(--font-geist-sans)]">
      {/* <Mic onSubmit={onSubmit} />
      {messages.map(message => (
        <RoleMessage key={message.id} message={message} />
      ))} */}
      <Sidebar selected={selected} chats={chats} onSelect={onSelect} />
      <div className="flex-1 flex flex-col">
        <Header chat={chat} />
        <Content />
      </div>
    </div>
  )
}
