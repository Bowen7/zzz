import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { AudioVisualizer } from 'react-audio-visualize'
import { Pause as PauseIcon, Play as PlayIcon } from '@phosphor-icons/react'
import { useAudio, useCanvasSize } from '@/hooks'

type Props = {
  id: number
  role: 'user' | 'assistant'
  autoplay?: boolean
  blob: Blob
}
export const AudioMessage = ({ id, role, blob }: Props) => {
  const frameRef = useRef<number>()
  const [pos, setPos] = useState(0)
  const { audioRef, play, pause, isPlaying, isCurrent } = useAudio(`${id}-${role}`, blob)

  const canvasProps = useCanvasSize(150, 32)

  useEffect(() => {
    const animate = () => {
      if (isPlaying) {
        setPos(audioRef.current?.currentTime ?? 0)
        frameRef.current = requestAnimationFrame(animate)
      }
    }

    animate()

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [isPlaying, audioRef])

  useEffect(() => {
    if (!isCurrent) {
      setPos(0)
    }
  }, [isCurrent])

  const onClick = () => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }

  return (
    <div
      onClick={onClick}
      className={clsx('rounded-lg px-3 py-1 text-sm cursor-pointer flex space-x-2 items-center', role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}
    >
      {isPlaying ? <PauseIcon size={16} weight="bold" /> : <PlayIcon size={16} weight="bold" />}
      <AudioVisualizer
        blob={blob}
        {...canvasProps}
        barWidth={3}
        currentTime={pos}
        gap={2}
        barPlayedColor={role === 'user' ? '#fff' : '#09090b'}
        barColor={role === 'user' ? '#a1a1aa' : '#a1a1aa'}
      />
    </div>
  )
}
