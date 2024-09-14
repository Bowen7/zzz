import { userLightningVisibleAtom, userTextVisibleAtom } from '@/lib/atom'
import { useAtomValue } from 'jotai'
import { AudioMessage } from './audio-message'
import { HelpMessage } from './help-message'

type Props = {
  content: string
  blob: Blob
  suggestion: string
}

export const UserMessage = ({ content, blob, suggestion }: Props) => {
  const defaultLightningVisible = useAtomValue(userLightningVisibleAtom)
  const defaultTextVisible = useAtomValue(userTextVisibleAtom)
  return (
    <div className="flex flex-col items-end pl-8 space-y-1">
      <AudioMessage blob={blob} />
      <HelpMessage
        role="user"
        content={content}
        suggestion={suggestion}
        defaultLightningVisible={defaultLightningVisible}
        defaultTextVisible={defaultTextVisible}
      />
    </div>
  )
}
