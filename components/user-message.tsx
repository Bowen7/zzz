import { AudioPlayer, useAudioPlayer } from '@lobehub/tts/react'
import { useEffect, useMemo } from 'react'
import { AudioVisualizer } from 'react-audio-visualize'

type Props = {
  content: string
  blob: Blob
  ok: boolean
  suggestion: string
}

export const UserMessage = ({ content, blob, ok, suggestion }: Props) => {
  const url = useMemo(() => URL.createObjectURL(blob), [blob])
  const { isLoading, ...audio } = useAudioPlayer({ src: url })
  console.log(audio)
  return (
    <div>
      <p>{content}</p>
      <AudioPlayer audio={audio} autoplay isLoading={isLoading} />
      <AudioVisualizer
        blob={blob}
        width={500}
        height={75}
        barWidth={1}
        gap={0}
        barColor="#f76565"
      />
    </div>
  )
}
