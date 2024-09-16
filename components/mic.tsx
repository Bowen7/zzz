import { Button } from '@/components/ui/button'
import { useLatest, useSubmit } from '@/hooks'
import { useAudioRecorder } from '@lobehub/tts/react'
import { Microphone as MicIcon, MicrophoneSlash as MicSlashIcon } from '@phosphor-icons/react'
import clsx from 'clsx'

const shapeClassName = 'w-8 h-8 rounded-full absolute inset-0 margin-auto blur'
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
        <Button
          className="rounded-full w-12 h-12 bg-transparent overflow-hidden relative"
          variant="outline"
          size="icon"
          onClick={onRecord}
        >
          {isRecording && (
            <>
              <div className={clsx(shapeClassName, '-translate-x-3 animate-gradient-shape-1 bg-[#5500ff]')}></div>
              <div className={clsx(shapeClassName, '-translate-x-3 translate-y-3 animate-gradient-shape-2 bg-[#00d5ff]')}></div>
              <div className={clsx(shapeClassName, 'translate-x-3 translate-y-3 animate-gradient-shape-3 bg-[#ffe600]')}></div>
              <div className={clsx(shapeClassName, 'translate-x-3 animate-gradient-shape-4 bg-[#0080ff]')}></div>
            </>
          )}
          {isRecording
            ? (
                <MicIcon size={24} className="relative z-10 text-white" />
              )
            : (
                <MicSlashIcon size={24} />
              )}
        </Button>
      </div>
    </div>
  )
}
