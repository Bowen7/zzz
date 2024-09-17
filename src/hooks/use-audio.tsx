import { useCallback, useEffect, useRef, useState } from 'react'
import { useLatest } from './use-latest'

type Options = {
  autoPlay?: boolean
  onPlay?: () => void
  onEnded?: () => void
}
export const useAudio = (src: string, options: Options) => {
  const audioRef = useRef<HTMLAudioElement>(null!)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const onEndedRef = useLatest(options.onEnded)
  const onPlayRef = useLatest(options.onPlay)

  useEffect(() => {
    if (options.autoPlay && !isLoading) {
      audioRef.current.play()
    }
  }, [options.autoPlay, isLoading])

  const play = useCallback(() => {
    audioRef.current.play()
  }, [])

  const pause = useCallback(() => {
    audioRef.current.pause()
  }, [])

  const onPlay = useCallback(() => {
    onPlayRef.current?.()
    setIsPlaying(true)
  }, [onPlayRef])

  const onEnded = useCallback(() => {
    onEndedRef.current?.()
    setIsPlaying(false)
  }, [onEndedRef])

  const onPause = useCallback(() => {
    setIsPlaying(false)
  }, [])

  return {
    audio: (
      <audio
        className="hidden"
        ref={audioRef}
        onCanPlayThrough={() => setIsLoading(false)}
        onEnded={onEnded}
        onPlay={onPlay}
        onPause={onPause}
      >
        <source src={src} type="audio/mp3" />
      </audio>
    ),
    play,
    pause,
    isLoading,
    audioRef,
    isPlaying,
  }
}
