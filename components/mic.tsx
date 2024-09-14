import { Button } from '@/components/ui/button'
import { useLatest, useSubmit } from '@/lib/hooks'
import { useAudioRecorder } from '@lobehub/tts/react'
import { Microphone as MicIcon, MicrophoneSlash as MicSlashIcon } from '@phosphor-icons/react'
import { GradientBackground } from './gradient-background'

export const Mic = () => {
  const onSubmit = useSubmit()
  const onSubmitRef = useLatest(onSubmit)
  const { isRecording, start, stop } = useAudioRecorder((blob: Blob) => {
    onSubmitRef.current(blob)
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
        {isRecording
          ? (
              <GradientBackground className="rounded-full bg-white dark:bg-zinc-900">
                <Button
                  className="rounded-full w-12 h-12 bg-transparent overflow-hidden"
                  variant="outline"
                  size="icon"
                  onClick={onRecord}
                >
                  <MicIcon size={24} />
                </Button>
              </GradientBackground>
            )
          : (
              <Button
                className="rounded-full w-12 h-12 bg-transparent overflow-hidden"
                variant="outline"
                size="icon"
                onClick={onRecord}
              >
                <MicSlashIcon size={24} />
              </Button>
            )}
      </div>
    </div>
  )
}
