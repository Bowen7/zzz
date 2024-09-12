import { Button } from '@/components/ui/button'
import { useAudioRecorder } from '@lobehub/tts/react'
import { Microphone as MicIcon, MicrophoneSlash as MicSlashIcon } from '@phosphor-icons/react'

type Props = {
  onSubmit: (blob: Blob) => void
}

export const Mic = ({ onSubmit }: Props) => {
  const { isRecording, start, stop } = useAudioRecorder((blob: Blob) => {
    onSubmit(blob)
  })

  const onRecord = async () => {
    if (isRecording) {
      stop()
    } else {
      start()
    }
  }
  return (
    <div className="h-24 flex items-center justify-center border-t">
      <div className="inline-block relative">
        {isRecording && (
          <span className="z-[-1] animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        )}
        <Button
          className="rounded-full w-12 h-12"
          variant="outline"
          size="icon"
          onClick={onRecord}
        >
          {isRecording ? <MicIcon size={24} /> : <MicSlashIcon size={24} />}
        </Button>
      </div>
    </div>
  )
}
