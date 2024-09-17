import { Chat } from './chat'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useChats } from '@/hooks'
import { NEW_CHAT } from '@/lib/constants'

export const ChatList = () => {
  const chats = useChats()
  return (
    <>
      <h1 className="font-bold text-center py-4">Speak Now</h1>
      <ScrollArea className="flex-1">
        <div className="space-y-1 px-4">
          <Chat
            key={NEW_CHAT.id}
            chat={NEW_CHAT}
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
