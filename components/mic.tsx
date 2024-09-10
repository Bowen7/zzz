import { Button } from '@/components/ui/button'
import { useAudioRecorder } from '@lobehub/tts/react'
import { useEffect } from 'react'

type Props = {
  onSubmit: (url: string, blob: Blob) => void
}

export const Mic = ({ onSubmit }: Props) => {
  const { isRecording, start, stop, url, blob } = useAudioRecorder()

  useEffect(() => {
    if (url && blob) {
      onSubmit(url, blob)
    }
  }, [url, blob, onSubmit])

  const onRecord = async () => {
    if (isRecording) {
      stop()
    } else {
      start()
    }
  }
  return (
    <div>
      <Button onClick={onRecord}>{isRecording ? 'Stop' : 'Record'}</Button>
    </div>
  )
}
