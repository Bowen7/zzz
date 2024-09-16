import { ScrollArea } from '@/components/ui/scroll-area'
import { useConversations } from '@/hooks'
import { Fragment, useEffect, useRef } from 'react'
import { AssistantMessage } from './assistant-message'
import { UserMessage } from './user-message'

export const ConversationScrollArea = () => {
  const conversations = useConversations()
  const viewportRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTo({
        top: viewportRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [conversations])
  return (
    <ScrollArea className="flex-1" viewportRef={viewportRef}>
      <div className="p-4 space-y-4">
        {conversations.map((conversation) => {
          const {
            id,
            userContent,
            assistantContent,
            userBlob,
            assistantBlob,
            suggestion,
          } = conversation
          return (
            <Fragment key={id}>
              <UserMessage
                content={userContent}
                blob={userBlob}
                suggestion={suggestion}
              />
              <AssistantMessage
                id={id}
                content={assistantContent}
                blob={assistantBlob}
              />
            </Fragment>
          )
        })}
      </div>
    </ScrollArea>
  )
}
