import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { AudioVisualizer } from 'react-audio-visualize'
import { useAudio } from '@/hooks'

type Props = {
  id: number
  role: 'user' | 'assistant'
  autoplay?: boolean
  blob: Blob
}
const devicePixelRatio = window.devicePixelRatio || 1
export const AudioMessage = ({ id, role, blob }: Props) => {
  const frameRef = useRef<number>()
  const [pos, setPos] = useState(0)
  const { audioRef, play, pause, isPlaying, isCurrent } = useAudio(`${id}-${role}`, blob)

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
      className={clsx('rounded-lg px-3 py-1 text-sm cursor-pointer', role === 'user' ? 'bg-blue-500 text-white' : 'bg-muted')}
    >
      <AudioVisualizer
        blob={blob}
        width={150 * devicePixelRatio}
        height={32 * devicePixelRatio}
        style={{
          width: '150px',
          height: '32px',
        }}
        barWidth={3}
        currentTime={pos}
        gap={2}
        barPlayedColor={role === 'user' ? '#fff' : '#09090b'}
        barColor={role === 'user' ? '#bfdbfe' : '#a1a1aa'}
      />
    </div>
  )
}
