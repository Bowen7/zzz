import { ScrollArea } from '@/components/ui/scroll-area'
import { useChats } from '@/hooks'
import type { Chat } from '@/lib/types'
import { ChatItem } from './chat-item'

export const newChat: Chat = {
  id: -1,
  title: 'New Chat',
  updated: new Date(),
}

export const ChatList = () => {
  const chats = useChats()
  return (
    <>
      <h1 className="font-bold text-center py-4">Speak Now</h1>
      <ScrollArea className="flex-1">
        <div className="space-y-1 px-4">
          <ChatItem
            key={newChat.id}
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
    </>
  )
}
