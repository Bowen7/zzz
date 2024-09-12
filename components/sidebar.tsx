import { ScrollArea } from '@/components/ui/scroll-area'
import { selectedAtom, sidebarOpenedAtom } from '@/lib/atom'
import { clsx } from 'clsx'
import { useAtomValue } from 'jotai'
import type { Chat } from '@/lib/types'
import { ChatItem } from './chat-item'

type Props = {
  chats: Chat[]
}

export const newChat: Chat = {
  id: -1,
  title: 'New Chat',
  messages: [],
  updated: new Date(),
}

export const Sidebar = ({ chats }: Props) => {
  const opened = useAtomValue(sidebarOpenedAtom)
  const selected = useAtomValue(selectedAtom)
  return (
    <aside className={clsx('border-r h-full transition-width overflow-hidden flex flex-col', opened ? 'w-64' : 'w-0')}>
      <h1 className="font-bold text-center py-4">Speaking</h1>
      <ScrollArea className="flex-1">
        <div className="space-y-1 px-4">
          {selected === -1 && (
            <ChatItem
              key={-1}
              chat={newChat}
            />
          )}
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
