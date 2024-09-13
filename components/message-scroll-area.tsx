import { ScrollArea } from '@/components/ui/scroll-area'
import { selectedAtom } from '@/lib/atom'
import { useChatMessages } from '@/lib/hooks'
import { useAtomValue } from 'jotai'
import { UserMessage } from './user-message'

export const MessageScrollArea = () => {
  const selected = useAtomValue(selectedAtom)
  const messages = useChatMessages(selected)
  return (
    <ScrollArea className="flex-1">
      <div className="p-4">
        {messages.map((message) => {
          const {
            id,
            role,
            content,
            blob,
          } = message
          return (
            role === 'user'
              ? (
                  <UserMessage
                    key={id}
                    content={content}
                    blob={blob}
                    ok={message.ok}
                    suggestion={message.suggestion}
                  />
                )
              : (
                  <div key={id}>
                    <div>{content}</div>
                  </div>
                )
          )
        })}
      </div>
    </ScrollArea>
  )
}
