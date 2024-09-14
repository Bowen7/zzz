import { ScrollArea } from '@/components/ui/scroll-area'
import { sidebarOpenedAtom } from '@/lib/atom'
import { useChats } from '@/lib/hooks'
import { clsx } from 'clsx'
import { useAtomValue } from 'jotai'
import type { Chat } from '@/lib/types'
import { ChatItem } from './chat-item'

export const newChat: Chat = {
  id: -1,
  title: 'New Chat',
  updated: new Date(),
}

export const Sidebar = () => {
  const opened = useAtomValue(sidebarOpenedAtom)
  const chats = useChats()
  return (
    <aside className={clsx('border-r h-full transition-width overflow-hidden flex flex-col', opened ? 'w-64' : 'w-0')}>
      <h1 className="font-bold text-center py-4">Speak Now</h1>
      <ScrollArea className="flex-1">
        <div className="space-y-1 px-4">
          <ChatItem
            key={-1}
            chat={newChat}
          />
          {chats?.map(chat => (
            <ChatItem
              key={chat.id}
              chat={chat}
            />
          ))}
        </div>
      </ScrollArea>
    </aside>
  )
}
