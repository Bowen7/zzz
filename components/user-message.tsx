import { AudioPlayer, useAudioPlayer } from '@lobehub/tts/react'
import { useEffect, useMemo } from 'react'
import { AudioVisualizer } from 'react-audio-visualize'

type Props = {
  content: string
  blob: Blob
  isValid: boolean
}

export const UserMessage = ({ content, blob, isValid }: Props) => {
  const url = useMemo(() => URL.createObjectURL(blob), [blob])
  const { isLoading, ...audio } = useAudioPlayer({ src: url })
  useEffect(() => {
    if (!isLoading) {
      audio.play()
    }
  }, [isLoading])
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
