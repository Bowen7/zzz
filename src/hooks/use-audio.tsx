import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

export const AudioReactContext = createContext<{
  currentId: string
  isLoading: boolean
  isPlaying: boolean
  audioRef: React.RefObject<HTMLAudioElement>
  play: (id: string, blob?: Blob) => void
  pause: () => void
}>({ currentId: '', isLoading: true, isPlaying: false, audioRef: { current: null }, play: () => {}, pause: () => {} })

export const useAudioProvider = () => {
  const [currentId, setCurrentId] = useState('')
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const sourceRef = useRef<HTMLSourceElement>(null)

  useEffect(() => {
    if (!isLoading) {
      audioRef.current?.play()
      setIsPlaying(true)
    }
  }, [isLoading])

  const play = useCallback((id?: string, blob?: Blob) => {
    if (id && id !== currentId) {
      setIsLoading(true)
      setCurrentId(id!)
      const url = URL.createObjectURL(blob)
      sourceRef.current?.setAttribute('src', url)
      audioRef.current?.load()
    } else {
      if (!isLoading) {
        audioRef.current?.play()
        setIsPlaying(true)
      }
    }
  }, [currentId, isLoading])

  const pause = useCallback(() => {
    audioRef.current?.pause()
  }, [])

  const onPause = useCallback(() => {
    setIsPlaying(false)
  }, [])

  const onCanPlayThrough = useCallback(() => {
    setIsLoading(false)
  }, [])

  return {
    audio: (
      <audio
        className="hidden"
        ref={audioRef}
        onCanPlayThrough={onCanPlayThrough}
        onPause={onPause}
      >
        <source ref={sourceRef} type="audio/mp3" />
      </audio>
    ),
    currentId,
    play,
    pause,
    isLoading,
    audioRef,
    isPlaying,
  }
}

export const useAudio = (id: string, blob: Blob) => {
  const { currentId, isLoading, isPlaying, audioRef, play, pause } = useContext(AudioReactContext)
  const onPlay = useCallback(() => {
    play(id, blob)
  }, [play, id, blob])
  const onPause = useCallback(() => {
    if (id === currentId) {
      pause()
    }
  }, [pause, currentId, id])
  const isCurrent = id === currentId
  return { isLoading, isCurrent, isPlaying: isPlaying && isCurrent, audioRef, play: onPlay, pause: onPause }
}

export const usePlay = () => {
  const { play } = useContext(AudioReactContext)
  return play
}
