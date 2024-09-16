import { readIDAtom, selectedAtom } from '@/lib/atom'
import { db } from '@/lib/db'
import { responseSchema } from '@/lib/schema'
import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback } from 'react'
import { useAddConversation } from './conversation'
import { useTTS } from './use-tts'

export const useSubmit = () => {
  const selected = useAtomValue(selectedAtom)
  const setReadID = useSetAtom(readIDAtom)
  const addConversation = useAddConversation(selected)
  const tts = useTTS()
  return useCallback(async (blob: Blob) => {
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
    const response = await fetch('/api', {
      method: 'POST',
      body: formData,
    })
    const data = await response.json()
    const parsed = responseSchema.safeParse(data)
    if (parsed.success) {
      const { peer, text } = parsed.data
      const { content, suggestion } = peer
      const id = await addConversation({
        userContent: text,
        userBlob: blob,
        suggestion,
        assistantContent: content,
        assistantBlob: null,
      })
      setReadID(id)
      await tts(id, content)
    }
  }, [addConversation, selected, tts, setReadID])
}
