import { ArrowClockwise as ReloadIcon } from '@phosphor-icons/react'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { AudioMessage } from './audio-message'
import { HelpMessage } from './help-message'
import { assistantTextVisibleAtom } from '@/lib/atom'

type Props = {
  content: string
  audio: ArrayBuffer | null
  id: number
}
export const AssistantMessage = ({ content, audio, id }: Props) => {
  const defaultTextVisible = useAtomValue(assistantTextVisibleAtom)

  const blob = useMemo(() => audio ? new Blob([audio], { type: 'audio/mp3' }) : null, [audio])

  return (
    <div className="flex flex-col items-start pl-4 space-y-1">
      {blob
        ? <AudioMessage role="assistant" blob={blob} id={id} />
        : <div className="rounded-lg px-3 py-2 bg-muted"><ReloadIcon className="w-4 h-4 animate-spin" /></div>}
      <HelpMessage
        role="assistant"
        content={content}
        suggestion=""
        defaultLightningVisible={false}
        defaultTextVisible={defaultTextVisible}
      />
    </div>
  )
}
