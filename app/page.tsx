'use client'
import { Header } from '@/components/header'
import { MessageScrollArea } from '@/components/message-scroll-area'
import { Mic } from '@/components/mic'
import { Sidebar } from '@/components/sidebar'

export default function Home() {
  return (
    <div className="h-svh overflow-hidden flex font-[family-name:var(--font-geist-sans)]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <MessageScrollArea />
        <Mic />
      </div>
    </div>
  )
}
