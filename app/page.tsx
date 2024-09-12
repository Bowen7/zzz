'use client'
import { Header } from '@/components/header'
import { MessageScrollArea } from '@/components/message-scroll-area'
import { Mic } from '@/components/mic'
import { newChat, Sidebar } from '@/components/sidebar'
import { readIDAtom, selectedAtom } from '@/lib/atom'
import { useChat, useChats, useUpdateChatMessages } from '@/lib/hooks'
import { responseSchema } from '@/lib/schema'
import { useAtomValue, useSetAtom } from 'jotai'
import { nanoid } from 'nanoid'
import { useCallback, useEffect } from 'react'

export default function Home() {
  const selected = useAtomValue(selectedAtom)
  const setReadID = useSetAtom(readIDAtom)
  const chats = useChats()
  const chat = useChat(selected) ?? newChat
  const updateChatMessages = useUpdateChatMessages(selected)

  const onSubmit = useCallback(async (blob: Blob) => {
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
        updateChatMessages([
          { id: nanoid(), role: 'user', content: text, blob, isValid: true },
          { id: nanoid(), role: 'assistant', content, suggestion },
        ])
      }
    }
  }, [updateChatMessages])

  useEffect(() => {
    setReadID('')
  }, [selected, setReadID])

  return (
    <div className="h-svh overflow-hidden flex font-[family-name:var(--font-geist-sans)]">
      <Sidebar chats={chats} />
      <div className="flex-1 flex flex-col">
        <Header chat={chat} />
        <MessageScrollArea />
        <Mic onSubmit={onSubmit} />
      </div>
    </div>
  )
}
