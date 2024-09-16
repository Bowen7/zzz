import { ScrollArea } from '@/components/ui/scroll-area'
import { useChats } from '@/hooks'
import type { ChatModel } from '@/lib/types'
import { Chat } from './chat'

export const newChat: ChatModel = {
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
          <Chat
            key={newChat.id}
            chat={newChat}
          />
          {chats?.map(chat => (
            <Chat
              key={chat.id}
              chat={chat}
            />
          ))}
        </div>
      </ScrollArea>
    </>
  )
}
