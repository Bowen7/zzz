import { Button } from '@/components/ui/button'
import { AudioPlayer, AudioVisualizer, useAudioPlayer, useEdgeSpeech } from '@lobehub/tts/react'
import type { Message } from '@/lib/share'

type Props = {
  message: Message
}

const barStyle = {
  borderRadius: 8,
  count: 13,
  gap: 4,
  maxHeight: 144,
  minHeight: 48,
  width: 16,
}

const UserMessage = ({ content, url }: { content: string, url: string }) => {
  const { ref, isLoading, ...audio } = useAudioPlayer({ src: url })
  console.log(isLoading, audio)
  return (
    <div>
      {content}
      <AudioVisualizer audioRef={ref} barStyle={barStyle} isLoading={isLoading} />
    </div>
  )
}

const AssistantMessage = ({ content }: { content: string }) => {
  return <div>{content}</div>
}

export const MessageItem = ({ message }: Props) => {
  const { role } = message
  return role === 'user'
    ? <UserMessage content={message.content} url={message.url} />
    : <AssistantMessage content={message.content} />
  // const { isGlobalLoading, start, audio } = useEdgeSpeech(content, {
  //   options: {
  //     voice: 'en-IN-NeerjaNeural',
  //   },
  // })
  // console.log(audio.ref)
  // return (
  //   <div>
  //     {content}
  //     <Button onClick={start}>Start</Button>
  //     <AudioPlayer audio={audio} isLoading={isGlobalLoading} autoplay />
  //   </div>
  // )
}
