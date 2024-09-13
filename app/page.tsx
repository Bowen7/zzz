'use client'
import { Header } from '@/components/header'
import { MessageScrollArea } from '@/components/message-scroll-area'
import { Mic } from '@/components/mic'
import { newChat, Sidebar } from '@/components/sidebar'
import { readIDAtom, selectedAtom } from '@/lib/atom'
import { useChat, useChats } from '@/lib/hooks'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'

export default function Home() {
  const selected = useAtomValue(selectedAtom)
  const setReadID = useSetAtom(readIDAtom)
  const chats = useChats()
  const chat = useChat() ?? newChat

  useEffect(() => {
    setReadID('')
  }, [selected, setReadID])

  return (
    <div className="h-svh overflow-hidden flex font-[family-name:var(--font-geist-sans)]">
      <Sidebar chats={chats} />
      <div className="flex-1 flex flex-col">
        <Header chat={chat} />
        <MessageScrollArea />
        <Mic />
      </div>
    </div>
  )
}
