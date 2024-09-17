import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { AudioMessage } from './audio-message'
import { HelpMessage } from './help-message'
import { userLightningVisibleAtom, userTextVisibleAtom } from '@/lib/atom'

type Props = {
  content: string
  audio: ArrayBuffer
  suggestion: string
}

export const UserMessage = ({ content, audio, suggestion }: Props) => {
  const defaultLightningVisible = useAtomValue(userLightningVisibleAtom)
  const defaultTextVisible = useAtomValue(userTextVisibleAtom)
  const blob = useMemo(() => new Blob([audio], { type: 'audio/mp3' }), [audio])
  return (
    <div className="flex flex-col items-end pr-4 space-y-1">
      <AudioMessage role="user" blob={blob} />
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
