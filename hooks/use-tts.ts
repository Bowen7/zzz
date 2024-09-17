import { db } from '@/lib/db'
import { EdgeSpeechTTS } from '@lobehub/tts'
import { useCallback } from 'react'

export const useTTS = () =>
  useCallback(async (id: number, text: string) => {
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
  }, [])
