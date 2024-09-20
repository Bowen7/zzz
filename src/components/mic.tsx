import { Microphone as MicIcon, Square as SquareIcon, X as XIcon } from '@phosphor-icons/react'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { useAudioRecorder } from 'react-audio-voice-recorder'
import { LiveAudioVisualizer } from 'react-audio-visualize'
import { useCanvasSize, useLatest, useSubmit } from '@/hooks'
import { Button } from '@/components/ui/button'

export const Mic = () => {
  const onSubmit = useSubmit()

  const [isWaitingToStart, setIsWaitingToStart] = useState(false)
  const [isWaitingToStop, setIsWaitingToStop] = useState(false)

  const submittedBlobRef = useRef<Blob | null>(null)
  const isCancelledRef = useRef(false)

  const canvasProps = useCanvasSize(96, 24)

  const onSubmitRef = useLatest(onSubmit)

  const {
    startRecording,
    stopRecording,
    recordingBlob,
    isRecording,
    mediaRecorder,
  } = useAudioRecorder()

  useEffect(() => {
    if (recordingBlob && recordingBlob !== submittedBlobRef.current && !isCancelledRef.current) {
      onSubmitRef.current(recordingBlob)
      submittedBlobRef.current = recordingBlob
    }
  }, [recordingBlob, onSubmitRef, isCancelledRef])

  useEffect(() => {
    if (isRecording) {
      setIsWaitingToStart(false)
    } else {
      setIsWaitingToStop(false)
    }
  }, [isRecording])

  const onStart = () => {
    setIsWaitingToStart(true)
    startRecording()
  }

  const onStop = () => {
    isCancelledRef.current = false
    setIsWaitingToStop(true)
    stopRecording()
  }

  const onCancel = () => {
    isCancelledRef.current = true
    setIsWaitingToStop(true)
    stopRecording()
  }

  return (
    <div className="h-24 flex items-center justify-center">
      <div className="inline-block relative">
        {!isRecording && (
          <Button
            className="rounded-full w-10 h-10"
            size="icon"
            disabled={isWaitingToStart}
            onClick={onStart}
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
              disabled={isWaitingToStop}
              onClick={onCancel}
            >
              <XIcon className="w-5 h-5" weight="bold" />
            </Button>

            {mediaRecorder && (
              <LiveAudioVisualizer
                mediaRecorder={mediaRecorder}
                {...canvasProps}
              />
            )}
            <Button
              className="rounded-full w-10 h-10"
              size="icon"
              disabled={isWaitingToStop}
              onClick={onStop}
            >
              <SquareIcon weight="bold" className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
