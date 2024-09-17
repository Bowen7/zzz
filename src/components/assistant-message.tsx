import { Play as PlayIcon, ArrowClockwise as ReloadIcon } from '@phosphor-icons/react'
import { useAtom, useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { AudioMessage } from './audio-message'
import { HelpMessage } from './help-message'
import { assistantTextVisibleAtom, readIDAtom } from '@/lib/atom'
import { useTTS } from '@/hooks'

type Props = {
  content: string
  audio: ArrayBuffer | null
  id: number
}
export const AssistantMessage = ({ content, audio, id }: Props) => {
  const defaultTextVisible = useAtomValue(assistantTextVisibleAtom)
  const [readID, setReadID] = useAtom(readIDAtom)
  const tts = useTTS()

  const blob = useMemo(() => audio ? new Blob([audio], { type: 'audio/mp3' }) : null, [audio])

  const onLoadTTS = () => {
    setReadID(id)
    tts(id, content)
  }
  return (
    <div className="flex flex-col items-start pl-4 space-y-1">
      {blob
        ? <AudioMessage role="assistant" blob={blob} autoplay={readID === id} />
        : readID === id
          ? <div className="rounded-lg px-3 py-2 bg-muted"><ReloadIcon className="w-4 h-4 animate-spin" /></div>
          : (
              <div className="rounded-lg px-3 py-2 bg-muted cursor-pointer" onClick={onLoadTTS}>
                <PlayIcon className="w-4 h-4" />
              </div>
            )}
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
