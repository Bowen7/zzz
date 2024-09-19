import { Microphone as MicIcon, Square as SquareIcon, X as XIcon } from '@phosphor-icons/react'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { useAudioRecorder } from 'react-audio-voice-recorder'
import { useLatest, useSubmit } from '@/hooks'
import { Button } from '@/components/ui/button'

export const Mic = () => {
  const onSubmit = useSubmit()
  const isWaitingToStart = useState(false)
  const isWaitingToStop = useState(false)
  const onSubmitRef = useLatest(onSubmit)
  const submittedBlobRef = useRef<Blob | null>(null)

  const {
    startRecording,
    stopRecording,
    recordingBlob,
    isRecording,
  } = useAudioRecorder()

  useEffect(() => {
    if (recordingBlob && recordingBlob !== submittedBlobRef.current) {
      onSubmitRef.current(recordingBlob)
      submittedBlobRef.current = recordingBlob
    }
  }, [recordingBlob, onSubmitRef])

  return (
    <div className="h-24 flex items-center justify-center">
      <div className="inline-block relative">
        {!isRecording && (
          <Button
            className="rounded-full w-10 h-10"
            variant="outline"
            size="icon"
            onClick={startRecording}
          >
            <MicIcon className="w-5 h-5" />
          </Button>
        )}
        {isRecording && (
          <div className="bg-muted w-48 rounded-full flex justify-between">
            <Button
              className="rounded-full w-10 h-10"
              variant="destructive"
              size="icon"
              onClick={stopRecording}
            >
              <XIcon className="w-5 h-5" weight="bold" />
            </Button>
            <Button
              className="rounded-full w-10 h-10"
              variant="destructive"
              size="icon"
              onClick={stopRecording}
            >
              <SquareIcon weight="bold" className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
