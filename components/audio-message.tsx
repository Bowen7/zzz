import { readIDAtom } from '@/lib/atom'
import { useAtom } from 'jotai'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AudioVisualizer } from 'react-audio-visualize'
import { useAudioPlayer } from 'react-use-audio-player'

type Props = {
  autoplay?: boolean
  blob: Blob
}
export const AudioMessage = ({ autoplay = false, blob }: Props) => {
  const [readID, setReadID] = useAtom(readIDAtom)
  const frameRef = useRef<number>()
  const [pos, setPos] = useState(0)
  const url = useMemo(() => URL.createObjectURL(blob), [blob])
  const { isLoading, isReady, load, play, playing, getPosition, pause } = useAudioPlayer()

  useEffect(() => {
    if (!isLoading && !isReady) {
      console.log(123)
      load(url, {
        format: 'mp3',
        onplay: () => {
          setReadID(-1)
        },
        onend: () => {
          setPos(0)
        },
        autoplay,
        html5: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
      })
    }
  }, [load, url, isLoading, isReady, readID, autoplay, setReadID])

  useEffect(() => {
    const animate = () => {
      if (playing) {
        setPos(getPosition())
        frameRef.current = requestAnimationFrame(animate)
      }
    }

    animate()

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [getPosition, playing])

  const onClick = () => {
    if (playing) {
      pause()
    } else {
      play()
    }
  }

  return (
    <div onClick={onClick} className="rounded-lg px-3 py-1 text-sm bg-muted cursor-pointer">
      <AudioVisualizer
        blob={blob}
        width={150}
        height={32}
        barWidth={3}
        currentTime={pos}
        gap={2}
        barPlayedColor="#09090b"
        barColor="#a1a1aa"
      />
    </div>
  )
}
