import { useAtomValue } from 'jotai'
import { useCallback } from 'react'
import { useAddConversation } from './conversation'
import { useTTS } from './use-tts'
import { TRY_ID, usePlay } from './use-audio'
import { responseSchema } from '@/lib/schema'
import { db } from '@/lib/db'
import { selectedAtom } from '@/lib/atom'

export const useSubmit = () => {
  const selected = useAtomValue(selectedAtom)
  const addConversation = useAddConversation(selected)
  const tts = useTTS()
  const play = usePlay()
  return useCallback(async (blob: Blob) => {
    play(TRY_ID, blob)
    const formData = new FormData()
    formData.append('input', blob, 'audio.mp3')
    const conversations = await db.conversations.where('chat').equals(selected).sortBy('id') ?? []
    for (const conversation of conversations) {
      formData.append('messages', JSON.stringify({
        role: 'user',
        content: conversation.userContent,
      }))
      formData.append('messages', JSON.stringify({
        role: 'assistant',
        content: conversation.assistantContent,
      }))
    }
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: formData,
    })
    const data = await response.json()
    const parsed = responseSchema.safeParse(data)
    if (parsed.success) {
      if (!parsed.data.ok) {
        return
      }
      const { content: text, peer } = parsed.data
      const { content, suggestion } = peer
      const userAudio = await blob.arrayBuffer()
      const id = await addConversation({
        userContent: text,
        userAudio,
        suggestion,
        assistantContent: content,
        assistantAudio: null,
      })
      await tts(id, content)
    }
  }, [addConversation, selected, tts, play])
}
