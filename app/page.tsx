'use client'
import { ConversationScrollArea } from '@/components/conversation-scroll-area'
import { DeleteDialog } from '@/components/delete-dialog'
import { Header } from '@/components/header'
import { Mic } from '@/components/mic'
import { RenameDialog } from '@/components/rename-dialog'
import { Sidebar } from '@/components/sidebar'

export default function Home() {
  return (
    <div className="h-svh overflow-hidden flex font-[family-name:var(--font-geist-sans)] bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <ConversationScrollArea />
        <Mic />
      </div>
      <DeleteDialog />
      <RenameDialog />
    </div>
  )
}
