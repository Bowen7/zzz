import { Button } from '@/components/ui/button'
import { AudioPlayer, useEdgeSpeech } from '@lobehub/tts/react'

type Props = {
  content: string
}

export const Message = ({ content }: Props) => {
  const { isGlobalLoading, start, audio } = useEdgeSpeech(content, {
    options: {
      voice: 'en-IN-NeerjaNeural',
    },
  })
  console.log(audio.ref)
  return (
    <div>
      {content}
      <Button onClick={start}>Start</Button>
      <AudioPlayer audio={audio} isLoading={isGlobalLoading} autoplay />
    </div>
  )
}
