import { ScrollArea } from '@/components/ui/scroll-area'
import { selectedAtom } from '@/lib/atom'
import { useChat } from '@/lib/hooks'
import { useAtomValue } from 'jotai'
import { UserMessage } from './user-message'

export const MessageScrollArea = () => {
  const selected = useAtomValue(selectedAtom)
  const chat = useChat(selected)
  const messages = chat?.messages ?? []
  return (
    <ScrollArea className="flex-1">
      <div className="p-4">
        {messages.map(({
          id,
          role,
          content,
          blob,
          isValid,
        }) => (
          role === 'user'
            ? (
                <UserMessage
                  key={id}
                  content={content}
                  blob={blob}
                  isValid={isValid}
                />
              )
            : (
                <div key={id}>
                  <div>{content}</div>
                </div>
              )
        ))}
      </div>
    </ScrollArea>
  )
}
