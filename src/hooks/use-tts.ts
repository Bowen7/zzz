import { EdgeSpeechTTS } from '@lobehub/tts'
import { useCallback } from 'react'
import { usePlay } from './use-audio'
import { db } from '@/lib/db'

export const useTTS = () => {
  const play = usePlay()
  return useCallback(async (id: number, text: string) => {
    const tts = new EdgeSpeechTTS()
    const response = await tts.create({
      input: text,
      options: {
        voice: 'en-IN-NeerjaNeural',
      },
    })
    const blob = await response.blob()
    const audio = await blob.arrayBuffer()
    await db.conversations.update(id, { assistantAudio: audio })
    play(`${id}-assistant`, blob)
  }, [play])
}
