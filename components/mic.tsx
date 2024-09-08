import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { Recorder } from 'vmsg'

type Props = {
  onSubmit: (blob: Blob) => void
}

export const Mic = ({ onSubmit }: Props) => {
  const [recorder, setRecorder] = useState<Recorder | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const disabled = recorder === null || isLoading

  useEffect(() => {
    setRecorder(new Recorder({
      wasmURL: 'https://unpkg.com/vmsg@0.3.0/vmsg.wasm',
    }))
  }, [])

  const onRecord = async () => {
    if (isRecording) {
      const blob = await recorder!.stopRecording()
      setIsRecording(false)
      onSubmit(blob)
    } else {
      try {
        setIsLoading(true)
        await recorder!.initAudio()
        await recorder!.initWorker()
        recorder!.startRecording()
        setIsRecording(true)
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    }
  }
  return (
    <div>
      <Button disabled={disabled} onClick={onRecord}>{isRecording ? 'Stop' : 'Record'}</Button>
    </div>
  )
}
