import { ScrollArea } from '@/components/ui/scroll-area'
import { useChatMessages } from '@/hooks'
import { useEffect, useRef } from 'react'
import { AssistantMessage } from './assistant-message'
import { UserMessage } from './user-message'

export const MessageScrollArea = () => {
  const messages = useChatMessages()
  const viewportRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTo({
        top: viewportRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages])
  return (
    <ScrollArea className="flex-1" viewportRef={viewportRef}>
      <div className="p-4 space-y-4">
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
                    suggestion={message.suggestion}
                  />
                )
              : (
                  <AssistantMessage
                    key={id}
                    id={id}
                    content={content}
                    blob={blob}
                  />
                )
          )
        })}
      </div>
    </ScrollArea>
  )
}
