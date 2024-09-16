import { useAudio } from '@/hooks'
import { readIDAtom } from '@/lib/atom'
import clsx from 'clsx'
import { useSetAtom } from 'jotai'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AudioVisualizer } from 'react-audio-visualize'

type Props = {
  role: 'user' | 'assistant'
  autoplay?: boolean
  blob: Blob
}
export const AudioMessage = ({ role, autoplay = false, blob }: Props) => {
  const setReadID = useSetAtom(readIDAtom)
  const frameRef = useRef<number>()
  const [pos, setPos] = useState(0)
  const url = useMemo(() => URL.createObjectURL(blob), [blob])
  const { audio, play, pause, audioRef, isPlaying } = useAudio(url, {
    autoPlay: autoplay,
    onPlay: () => {
      setReadID(-1)
    },
    onEnded: () => {
      setPos(0)
    },
  })

  useEffect(() => {
    const animate = () => {
      if (isPlaying) {
        setPos(audioRef.current.currentTime)
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
      {audio}
      <AudioVisualizer
        blob={blob}
        width={150}
        height={32}
        barWidth={3}
        currentTime={pos}
        gap={2}
        barPlayedColor={role === 'user' ? '#fff' : '#09090b'}
        barColor={role === 'user' ? '#bfdbfe' : '#a1a1aa'}
      />
    </div>
  )
}
